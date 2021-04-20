import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartemptyPage } from './pages/cartempty.page';
 
const routes: Routes = [{
    path: '',
    component: CartemptyPage,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CartemptyRoutingModule { }

export const routedComponents = [
    CartemptyPage
];
