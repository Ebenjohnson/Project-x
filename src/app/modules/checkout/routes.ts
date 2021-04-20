import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutPage } from './pages/checkout.page';

const routes: Routes = [{
    path: '',
    component: CheckoutPage,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CheckoutRoutingModule { }

export const routedComponents = [
    CheckoutPage
];
