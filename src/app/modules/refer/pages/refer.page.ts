import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'refer-page',
  templateUrl: `./refer.page.html`, 
  styleUrls: ['./refer.page.scss'], 
 
})
export class ReferPage implements OnInit {
  referCode: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.loggedOut$.subscribe(_ => this.router.navigate(['signin'], { queryParams: { returnUrl: this.router.url }}));
  }

  ngOnInit() {
    this.setReferCode();
  }

  copyCode(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  private setReferCode() {
    let currentUser = this.authenticationService.getCurrentUser();
    if(currentUser) {
      this.referCode = currentUser.refer_code;
    }
  }
}
