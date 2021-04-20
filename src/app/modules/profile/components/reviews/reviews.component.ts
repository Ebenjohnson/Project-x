import { Component, OnInit, Input } from '@angular/core';
import { RestaurantClient } from 'src/app/core/network/restaurant.client';
import { SettingService } from 'src/app/core/services/setting.service';
import { Review } from 'src/app/shared/models/review.model';
import { ReviewListResponse } from 'src/app/shared/models/review.list.response';

@Component({
    selector: 'profile-reviews',
    templateUrl: `./reviews.component.html`,
    styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
    @Input() restaurantId: number;
    reviewsResponse: ReviewListResponse = new ReviewListResponse();
    currency: string;
    
    constructor(private restaurantClient: RestaurantClient, private settingService: SettingService) {
    }
    
    ngOnInit() {
        this.fetchReviews();
    }
    
    fetchReviews() {
        this.restaurantClient.getReviews(this.restaurantId).subscribe(res => {
            this.reviewsResponse = res;
        }, err => {
            console.log(err);
        });
    }
}