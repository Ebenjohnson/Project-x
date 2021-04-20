import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportPage } from './pages/support.page';
 
const routes: Routes = [{
    path: '',
    component: SupportPage,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SupportRoutingModule { }

export const routedComponents = [
    SupportPage
];
