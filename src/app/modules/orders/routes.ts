import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersPage } from './pages/orders.page';

const routes: Routes = [{
    path: '',
    component: OrdersPage,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrdersRoutingModule { }

export const routedComponents = [
    OrdersPage
];
