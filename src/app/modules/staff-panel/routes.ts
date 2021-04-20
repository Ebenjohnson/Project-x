import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StaffPanelPage } from "./pages/staff-panel.page";

const routes: Routes = [
  {
    path: "",
    component: StaffPanelPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffPanelRoutingModule {}

export const routedComponents = [StaffPanelPage];
