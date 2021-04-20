import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/shared/models/user.model';
import { Address } from 'src/app/shared/models/address.model';
import { UserClient } from 'src/app/core/network/user.clien';

@Component({
  selector: 'userprofile-page',
  templateUrl: `./userprofile.page.html`, 
  styleUrls: ['./userprofile.page.scss'], 
 
})
export class UserprofilePage implements OnInit {
  user: User;
  addresses: Array<Address> = [];
  address: Address = new Address();

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userClient: UserClient) {
    this.authenticationService.loggedOut$.subscribe(_ => this.router.navigate(['signin'], { queryParams: { returnUrl: this.router.url }}));
  }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();

    // get address list
    this.userClient.addressList().subscribe(_ => {this.addresses = _});
  }

  getAddress($event: Address) {
    this.updateAddressList($event);
  }
  
  setAddress(address: Address) {
    if(address == null) {
      this.address = new Address();
    } else {
      console.log(address);
      this.address = address;
    }
  }

  private updateAddressList(address: Address) {
    let isUpdated = false;
    for (let i = 0; i < this.addresses.length; i++) {
      if(address.id == this.addresses[i].id) {
        this.addresses[i] = address;
        isUpdated = true;
        break;
      }
    }
    
    if(!isUpdated) {
      this.addresses.push(address);
    }
  }
}
