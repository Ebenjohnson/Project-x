import { Component } from '@angular/core';
import { SettingService } from 'src/app/core/services/setting.service';
import { Setting } from '../../models/setting.model';
import { Constant } from '../../models/constant.model';

@Component({
  selector: 'app-footer',
  templateUrl: `./footer.component.html`,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent{
  supportEmail: string = "";
  supportPhone: string = "";
  supportAddress: string = "";
  websiteHeading: string = "";

  constructor(private settingService: SettingService) {
    this.settingService.settingsUpdate$.subscribe(_ => this.onUpdateSettings());
    this.onUpdateSettings();
  }
  
  onUpdateSettings() {
    this.supportEmail = this.settingService.getByKey(Constant.SETTINGS.SUPPORT_EMAIL);
    this.supportPhone = this.settingService.getByKey(Constant.SETTINGS.SUPPORT_PHONE);
    this.supportAddress = this.settingService.getByKey(Constant.SETTINGS.SUPPORT_ADDRESS);
    this.websiteHeading = this.settingService.getByKey(Constant.SETTINGS.WEBSITE_HEADING);
  }
}
