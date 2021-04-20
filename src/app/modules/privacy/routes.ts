import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyPage } from './pages/privacy.page';
 
const routes: Routes = [{
    path: '',
    component: PrivacyPage,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivacyRoutingModule { }

export const routedComponents = [
    PrivacyPage
];
