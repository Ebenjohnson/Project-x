import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPage } from './pages/about.page';
 
const routes: Routes = [{
    path: '',
    component: AboutPage,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AboutRoutingModule { }

export const routedComponents = [
    AboutPage
];
