import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestaurantFilter } from 'src/app/shared/models/restaurant.filter';

@Component({
    selector: 'search-sidebar',
    templateUrl: `./sidebar.component.html`,
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    @Input() search: string;
    @Output() changeFilter: EventEmitter<RestaurantFilter> = new EventEmitter();
    restaurantFilter: RestaurantFilter;
    
    constructor() {
        this.restaurantFilter = new RestaurantFilter(this.search, false, 'distance_sort');
    }
    
    ngOnInit() {
    }
    
    ngOnChanges(changes) {
        this.restaurantFilter.search = changes.search.currentValue;
    }
    
    invokeEvent() {
        this.changeFilter.emit(this.restaurantFilter);
    }

    onSearch() {
        this.invokeEvent();
    }

    onVegOnly($event) {
        this.restaurantFilter.vegOnly = $event.target.checked;
        this.invokeEvent();
    }

    onSortCostForTwoAsc($event) {
        this.restaurantFilter.sort = $event.target.checked ? "cost_for_two_sort_asc" : null;
        this.invokeEvent();
    }

    onSortCostForTwoDesc($event) {
        this.restaurantFilter.sort = $event.target.checked ? "cost_for_two_sort_desc" : null;
        this.invokeEvent();
    }

    onSortDistance($event) {
        this.restaurantFilter.sort = $event.target.checked ? "distance_sort" : null;
        this.invokeEvent();
    }
}