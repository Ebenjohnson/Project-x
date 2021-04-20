import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouritePage } from './pages/favourite.page';
 
const routes: Routes = [{
    path: '',
    component: FavouritePage,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FavouriteRoutingModule { }

export const routedComponents = [
    FavouritePage
];
