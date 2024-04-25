import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() filtersApplied = new EventEmitter<any>();

  searchText: any = '';
  selectedStatus: any = '';


  applyFilters() {
    console.log('Button clicked!');
    const filters = {
      searchText: this.searchText,
      status: this.selectedStatus
    };
    this.filtersApplied.emit(filters);
  }
}
