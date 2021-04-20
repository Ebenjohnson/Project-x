import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryClient } from 'src/app/core/network/category.client';
import { Category } from 'src/app/shared/models/category.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
    selector: 'home-categories',
    templateUrl: `./categories.component.html`,
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
    categories: Array<Category> = [];

    carouselOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 4
            }
        },
        nav: true
    };

    constructor(private categoryClient: CategoryClient, private localStorageService: LocalStorageService) {
        this.localStorageService.locationUpdate$.subscribe(_ => this.fetchCategories());
    }
    
    ngOnInit() {
        this.fetchCategories();
    }
    
    fetchCategories() {
        this.categoryClient.list().subscribe(res => {
            this.categories = res.data;
        }, err => {
            console.log(err);
        });
    }
}