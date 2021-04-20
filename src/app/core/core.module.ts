import { NgModule, Optional, SkipSelf } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { AuthClient } from './network/auth.client';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
    imports: [
    ],
    declarations: [],
    providers: [AuthClient, JwtHelperService],
    exports: []
})
export class CoreModule { 
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
