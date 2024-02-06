import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css'],
})
export class DateFilterComponent {
  @Output() filterApplied = new EventEmitter<{
    startDate: string;
    endDate: string;
  }>();
  startDate!: string;
  endDate!: string;

  aplicarFiltre() {
    this.filterApplied.emit({
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }
}
