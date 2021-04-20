import { Component, OnInit } from '@angular/core';
//import { UserClient } from 'src/app/core/network/user.clien';


export class CartMenuItem {
  constructor(public menuItem, public quantity){}
}

declare var $ : any;

@Component({
  selector: 'faq-page',
  templateUrl: `./faq.page.html`, 
  styleUrls: ['./faq.page.scss'], 
  
})
export class FaqPage {  
  
  currentExpand: string;
  
  
  
  reset(){
    this.currentExpand='';
  }
  
  faqExpandToggle(name) {
    this.currentExpand = name != this.currentExpand ? name : '';
  }
}
