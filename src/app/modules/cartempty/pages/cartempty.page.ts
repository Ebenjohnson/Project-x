import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { UserClient } from 'src/app/core/network/user.clien';
 

export class CartMenuItem {
  constructor(public menuItem, public quantity){}
}

declare var $ : any;

@Component({
  selector: 'cartempty-page',
  templateUrl: `./cartempty.page.html`, 
  styleUrls: ['./cartempty.page.scss'], 
 
})
export class CartemptyPage {  

  constructor(private router: Router) {

  }

  goToHome() {
    this.router.navigate(['/']);
  }

}
