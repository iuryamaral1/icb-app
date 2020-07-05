import { Output, EventEmitter } from '@angular/core';
import { Calendar } from './calendar.model';
import { Component } from '@angular/core';
import { Day } from './day.model';
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
        if (this.calendar.currentMonth === 0) {
            this.calendar.currentMonth = 11;
            this.calendar.currentYear = this.calendar.currentYear - 1;
        } else {
            this.calendar.currentMonth = this.calendar.currentMonth - 1;
        }
        this.calendar = new Calendar(this.calendar.currentMonth, this.calendar.currentYear);
        this.previousMonthClickEvent.emit();
    }

    onNextMonthClick(): void {
        if (this.calendar.currentMonth === 11) {
            this.calendar.currentMonth = 0;
            this.calendar.currentYear = this.calendar.currentYear + 1;
        } else {
            this.calendar.currentMonth = this.calendar.currentMonth + 1;
        }
        this.calendar = new Calendar(this.calendar.currentMonth, this.calendar.currentYear);
        this.nextMonthClickEvent.emit();
    }

    onDayClick(day: Day): void {
        if (day.isClickable) {
            console.log('Mostrar eventos do dia: ' + day.value + ' do mês ' + (this.calendar.currentMonth + 1));
        }
    }

    isToday(day: Day): boolean {
        const dayValue = day.value;
        const month = this.calendar.currentMonth;
        const year = this.calendar.currentYear;

        const dateToCompare = new Date(year, month, dayValue);
        return moment().format('MM-DD-YYYY') === moment(dateToCompare).format('MM-DD-YYYY');
    }
}
