import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/shared/models/coupon.model';
import { SettingService } from 'src/app/core/services/setting.service';
import { Constant } from 'src/app/shared/models/constant.model';

@Component({
  selector: 'support-page',
  templateUrl: `./support.page.html`, 
  styleUrls: ['./support.page.scss'], 
 
})
export class SupportPage implements OnInit {
  loading = true;
  supportEmail: string;
  supportPhone: string;

  constructor(private router: Router, private settingService: SettingService) {
    this.settingService.settingsUpdate$.subscribe(_ => this.onUpdateSettings());
    this.onUpdateSettings();
  }

  ngOnInit() {
  }

  onUpdateSettings() {
    this.supportEmail = this.settingService.getByKey(Constant.SETTINGS.SUPPORT_EMAIL);
    this.supportPhone = this.settingService.getByKey(Constant.SETTINGS.SUPPORT_PHONE);
  }
}
