import { StaffPanelPage } from "./modules/staff-panel/pages/staff-panel.page";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthGuardService } from "./core/guards/auth-guard.service";

const routes: Routes = [
  // {
  //   path: "faq",
  //   loadChildren: () => import("./modules/faq/module").then((m) => m.FaqModule),
  // },
  // {
  //   path: "about",
  //   loadChildren: () =>
  //     import("./modules/about/module").then((m) => m.AboutModule),
  // },
  // {
  //   path: "privacy",
  //   loadChildren: () =>
  //     import("./modules/privacy/module").then((m) => m.PrivacyModule),
  // },
  // {
  //   path: "terms",
  //   loadChildren: () =>
  //     import("./modules/terms/module").then((m) => m.TermsModule),
  // },
  // {
  //   path: "search",
  //   loadChildren: () =>
  //     import("./modules/search/module").then((m) => m.SearchModule),
  // },
  // {
  //   path: "profile/:id",
  //   loadChildren: () =>
  //     import("./modules/profile/module").then((m) => m.ProfileModule),
  // },
  // {
  //   path: "checkout",
  //   loadChildren: () =>
  //     import("./modules/checkout/module").then((m) => m.CheckoutModule),
  //   canActivate: [AuthGuardService],
  // },
  {
    path: "signin",
    loadChildren: () =>
      import("./modules/signin/module").then((m) => m.SigninModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./modules/staff-panel/module").then((m) => m.StaffPanelModule),
  },
  // {
  //   path: "cart",
  //   loadChildren: () =>
  //     import("./modules/cartempty/module").then((m) => m.CartemptyModule),
  // },
  // {
  //   path: "orders",
  //   loadChildren: () =>
  //     import("./modules/orders/module").then((m) => m.OrderModule),
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: "offers",
  //   loadChildren: () =>
  //     import("./modules/offers/module").then((m) => m.OffersModule),
  // },
  // {
  //   path: "support",
  //   loadChildren: () =>
  //     import("./modules/support/module").then((m) => m.SupportModule),
  // },
  // {
  //   path: "refer",
  //   loadChildren: () =>
  //     import("./modules/refer/module").then((m) => m.ReferModule),
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: "favourite",
  //   loadChildren: () =>
  //     import("./modules/favourite/module").then((m) => m.FavouriteModule),
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: "userprofile",
  //   loadChildren: () =>
  //     import("./modules/userprofile/module").then((m) => m.UserprofileModule),
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: "orderinfo/:id",
  //   loadChildren: () =>
  //     import("./modules/orderinfo/module").then((m) => m.OrderinfoModule),
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: "",
  //   loadChildren: () =>
  //     import("./modules/home/module").then((m) => m.HomeModule),
  //   canActivate: [AuthGuardService],
  // },
  { path: "home", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
