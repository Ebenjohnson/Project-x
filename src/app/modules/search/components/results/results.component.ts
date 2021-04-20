import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from 'src/app/shared/models/restaurant.model';
import { SettingService } from 'src/app/core/services/setting.service';

@Component({
    selector: 'search-results',
    templateUrl: `./results.component.html`,
    styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
    @Input() restaurants: Array<Restaurant> = [];
    @Input() noResult: boolean;
    @Input() loading: boolean;
    currency: string;
    
    constructor(private settingService: SettingService) {
    }
    
    ngOnInit() {
        this.currency = this.settingService.getCurrency();
    }
}