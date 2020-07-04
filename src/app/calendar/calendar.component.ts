import { Output, EventEmitter } from "@angular/core";
import { Calendar } from "./calendar.model";
import { Component } from '@angular/core';
import { Day } from "./day.model";
import * as moment from 'moment';

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
        this.calendar = new Calendar(this.calendar.currentMonth - 1);
        this.previousMonthClickEvent.emit();
    }

    onNextMonthClick(): void {
        this.calendar = new Calendar(this.calendar.currentMonth + 1);
        this.nextMonthClickEvent.emit();
    }

    onDayClick(day: Day): void {
        if (day.isClickable) {
            console.log('Mostrar eventos do dia: ' + day.value + ' do mês ' + (this.calendar.currentMonth + 1));
        }
    }
}
