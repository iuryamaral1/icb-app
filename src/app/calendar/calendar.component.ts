import { Output, EventEmitter } from "@angular/core";
import { Calendar } from "./calendar.model";
import { Component } from '@angular/core';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
  })
export class CalendarComponent {

    @Output() previousMonthClickEvent = new EventEmitter();
    @Output() nextMonthClickEvent = new EventEmitter();

    calendar: Calendar = new Calendar();

    constructor() { }

    onPreviousMonthClick(): void {
        this.previousMonthClickEvent.emit();
    }

    onNextMonthClickEvent(): void {
        this.nextMonthClickEvent.emit();
    }
}
