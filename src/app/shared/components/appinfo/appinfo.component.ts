import { Component } from '@angular/core';
import { SettingService } from 'src/app/core/services/setting.service';
import { Constant } from '../../models/constant.model';

@Component({
  selector: 'app-appinfo',
  templateUrl: `./appinfo.component.html`,
  styleUrls: ['./appinfo.component.scss'],
})
export class AppinfoComponent{
  playstoreLink: string = "http://google.com";
  appstoreLink: string = "http://google.com";

  constructor(private settingService: SettingService) {
    this.settingService.settingsUpdate$.subscribe(_ => this.onUpdateSettings());
    this.onUpdateSettings();
  }
  
  onUpdateSettings() {
    this.playstoreLink = this.settingService.getByKey(Constant.SETTINGS.PLAYSTORE_LINK);
    this.appstoreLink = this.settingService.getByKey(Constant.SETTINGS.APPSTORE_LINK);
  }
}
