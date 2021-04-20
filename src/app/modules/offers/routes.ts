import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersPage } from './pages/offers.page';
 
const routes: Routes = [{
    path: '',
    component: OffersPage,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OffersRoutingModule { }

export const routedComponents = [
    OffersPage
];
