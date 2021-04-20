import { Component, OnInit } from '@angular/core';
import { SettingService } from './core/services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cookfu-web';

  constructor(public settingService: SettingService) {
  }

  ngOnInit(): void {
    this.settingService.set();
  }
}
