import { Injectable } from '@angular/core';
import { Constant } from 'src/app/shared/models/constant.model';
import { LoginResponse } from '../network/auth.client';
import { Subject } from 'rxjs';
import { Setting } from 'src/app/shared/models/setting.model';
import { SettingClient } from '../network/setting.client';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class SettingService {
    private settingsUpdateSource = new Subject<Array<Setting>>();
    private settings: Array<Setting> = [];
    settingsUpdate$ = this.settingsUpdateSource.asObservable();

    constructor(private settingClient: SettingClient, private localStorageService: LocalStorageService) {

    }

    set() {
        let localSettings = this.localStorageService.getSettings();
        if(localSettings) {
            // before we get response from server, wwe show settings that we have in our local storage
            this.settings = localSettings;
            this.settingsUpdateSource.next(this.settings);
        }
        this.settingClient.list().subscribe(res => {
            this.settings = res;
            this.localStorageService.setSettings(this.settings);
            this.settingsUpdateSource.next(this.settings);
        });
    }

    get() {
        return this.settings;
    }

    getCurrency() {
        let currenyCode = this.getByKey(Constant.SETTINGS.CURRENCY.KEY);
        currenyCode = currenyCode ? currenyCode : Constant.SETTINGS.CURRENCY.DEFAULT;
        let currencySymbol = Constant.SETTINGS.CURRENCY.SYMBOLS[currenyCode.toUpperCase()];
        return currencySymbol ? currencySymbol : currenyCode.toUpperCase();
    }

    public getByKey(key: string): string {
        let value = null;
        for (let i = 0; i < this.settings.length; i++) {
            if(this.settings[i].key == key) {
                value = this.settings[i].value;
                break;
            }
        }
        return value;
    }
}