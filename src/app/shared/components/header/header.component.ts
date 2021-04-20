import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from '../../models/cart.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: `./header.component.html`,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  isLoggedIn = false;
  loginText = "Login";
  cart: Cart;
  
  constructor(public authenticationService: AuthenticationService, private cartService: CartService,
    private router: Router){
      authenticationService.loggedIn$.subscribe(
        loggedIn => {
          this.setLoggedIn();
        });
        cartService.getCart$().subscribe(_ => this.cart = _);
      }
      
      
      ngOnInit(): void {
        this.setLoggedIn();
      }
      
      logout($event) {
        $event.preventDefault();
        this.authenticationService.logout();
        this.isLoggedIn = false;
        this.loginText = "Login";
      }
      
      goToCart() {
        if(this.cart.restaurant) {
          this.router.navigate(["/profile/" + this.cart.restaurant.id]);
          return;
        }
        this.router.navigate(["/cart/"]);
      }
      
      isRouteActive(route: string) {
        let routes = ['offers', 'support', 'cart'];
        let currentUrl;
        for (let i = 0; i < routes.length; i++) {
          if(this.router.url.includes(routes[i])) {
            currentUrl = routes[i];
            break;
          }
        }
        if(currentUrl) {
          if(currentUrl == route) {
            return true;
          } else {
            return false;
          }
        }
        return routes.indexOf(route) < 0;
      }
      
      private setLoggedIn() {
        this.isLoggedIn = this.authenticationService.isLoggedIn();
        let currentUser = this.authenticationService.getCurrentUser();
        if(currentUser) {
          this.loginText = currentUser.name;
        }
      }
      
    }
    