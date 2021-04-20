import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferPage } from './pages/refer.page';
 
const routes: Routes = [{
    path: '',
    component: ReferPage,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReferRoutingModule { }

export const routedComponents = [
    ReferPage
];
