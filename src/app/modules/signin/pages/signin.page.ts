import { Component, OnInit } from '@angular/core';
import { AuthClient, LoginRequest } from 'src/app/core/network/auth.client';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterRequest } from 'src/app/shared/models/register.request.model';
import {COUNTRIES} from "./countries";
import { IpaddressClient } from 'src/app/core/network/ipaddress.client';
import { Constant } from 'src/app/shared/models/constant.model';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from '@firebase/app';
import '@firebase/auth';
import { environment } from '../../../../environments/environment';
import { timer, Subject } from 'rxjs';
import { ignoreElements, takeUntil, repeatWhen } from 'rxjs/operators';

declare var grecaptcha: any;
declare var $ : any;

export class RegisterError {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  message: string;
}

@Component({
  selector: 'signin-page',
  templateUrl: `./signin.page.html`,
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  private readonly LABEL_REGISTER = 'Register';
  private readonly LABEL_SENDING_OTP = 'Sending OTP';
  
  registerRequest: RegisterRequest = new RegisterRequest();
  registerError = new RegisterError();
  registerInProgress = false;
  registerButtonText = this.LABEL_REGISTER;
  loginRequest: LoginRequest = new LoginRequest();
  loginError = null;
  showRegister: boolean = false;
  returnUrl: string;
  countries = COUNTRIES;
  phoneRecaptchaVerifier: firebase.auth.RecaptchaVerifier;
  showOtpDialog: boolean = false;
  otpMobileNumber: string;
  otpCode: string;
  otpError: string;
  resetTime: number = 60;
  interval: any;
  timeLeft: any = this.resetTime;
  private otpConfirmationResult;
  private loginResponse;
  private readonly _stopTimer = new Subject<void>();
  private readonly _startTimer = new Subject<void>();
  
  constructor(
    private authClient: AuthClient, private authenticationService: AuthenticationService, 
    private router: Router, private route: ActivatedRoute,
    private ipAddressClient: IpaddressClient,
    private firebaseAuth: AngularFireAuth) {
    }
    
    ngOnInit() {
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      
      // detect user's countries using ip address
      this.ipAddressClient.getIpDetails().subscribe(
        _ => {
          this.registerRequest.countryPhoneCode = this.getPhoneCodeFromCountryCode(_.country_code);
        },
        err => this.registerRequest.countryPhoneCode = Constant.DEFAULT_PHONE_CODE
        );
        
        firebase.initializeApp(environment.firebase);
        
        // reCaptcha
        this.phoneRecaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone-sign-in-recaptcha', {
          'size': 'invisible',
          'callback': function(response) {
          },
          'expired-callback': function() {
          }
        });
      }
      
      login() {
        this.loginError =  null;
        this.loginRequest.role = 'customer';
        this.authClient.login(this.loginRequest).subscribe(res => {
          if(res.user.mobile_verified) {
            this.loginRequest = new LoginRequest();
            this.authenticationService.login(res);
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.phoneAuth(res.user.mobile_number, false);
          }
        }, 
        err => {
          this.loginError = 'Invalid credentials';
        });
      }
      
      register() {
        this.registerInProgress = true;
        this.registerError =  null;
        this.registerRequest.role = 'customer';
        this.authClient.register(this.registerRequest).subscribe(res => {
          this.registerButtonText = this.LABEL_SENDING_OTP;
          this.loginResponse = res;
          this.phoneAuth(this.registerRequest.countryPhoneCode + this.registerRequest.mobile_number, false);
        }, 
        err => {
          this.registerInProgress = false;
          this.registerError = new RegisterError();
          this.registerError.message = err?.error?.message ? err.error.message : "Unable to register";
          if(err?.error?.errors?.email) {
            this.registerError.email = err?.error?.errors?.email[0];
          }
          if(err?.error?.errors?.name) {
            this.registerError.name = err?.error?.errors?.name[0];
          }
          if(err?.error?.errors?.mobile_number) {
            this.registerError.mobileNumber = err?.error?.errors?.mobile_number[0];
          }
          if(err?.error?.errors?.password) {
            this.registerError.password = err?.error?.errors?.password[0];
          }
        });
      }
      
      phoneAuth(mobileNumber, isRetry) {
        this.otpMobileNumber = mobileNumber;

        // otp timer
        this.timeLeft = this.resetTime;
        this._startTimer.next();
        
        this.firebaseAuth.signInWithPhoneNumber(mobileNumber, this.phoneRecaptchaVerifier).then(confirmationResult => {
          if(!isRetry) this.openOtpDialog();
          
          this.registerButtonText = this.LABEL_REGISTER;
          this.registerInProgress = false;
          this.otpConfirmationResult = confirmationResult;
        }).catch(error => {
          this.registerButtonText = this.LABEL_REGISTER;
          this.registerInProgress = false;
          this.otpError= error?.message ? error.message : 'Unabled to send otp';
        });   
      }
      
      verifyOtp() {
        if(this.otpConfirmationResult && this.otpCode) {
          this.otpConfirmationResult.confirm(this.otpCode).then( result => {
            $('#otp_model').modal('hide');
            console.log(this.showRegister);

            if(!this.showRegister) {
              // if we are verifying mobile number of existing customer, mark his mobile as verified now
              this.authClient.verifyMobile(this.otpMobileNumber).subscribe(res => {
                this.loginRequest = new LoginRequest();
                this.authenticationService.login(res);
                this.router.navigateByUrl(this.returnUrl);
              });
            } else {
              this.registerRequest = new RegisterRequest(); // reset request object
              this.loginRequest = new LoginRequest(); // // reset request object
              this.authenticationService.login(this.loginResponse);
              this.router.navigateByUrl(this.returnUrl);
            }
          }).catch(function (error) {
            console.log(error);
            grecaptcha.reset('phone-sign-in-recaptcha');
          });
          
        }
      }
      
      resendOtp() {
        this.phoneAuth(this.otpMobileNumber, true);
      }
      
      oberserableTimer() {
        // timer for OTP resend
        const source = timer(0, 1000).pipe(
          takeUntil(this._stopTimer),
          repeatWhen(() => this._startTimer)
          );
          const x = source.subscribe(val => {
            this.timeLeft = this.resetTime - val;
            if(this.timeLeft == 0) {
              this._stopTimer.next();
            }
          });
        }
        
        
        openOtpDialog() {
          this.oberserableTimer();
          $('#otp_model').modal('show');
        }
        
        goToRegister() {
          this.showRegister = true;
        }
        
        goToLogin() {
          this.showRegister = false;
        }
        
        private getPhoneCodeFromCountryCode(countryCode) {
          for (let i = 0; i < this.countries.length; i++) {
            if(this.countries[i].code == countryCode) {
              return this.countries[i].dial_code;
            }
          }
          return Constant.DEFAULT_PHONE_CODE;
        }
      }
      