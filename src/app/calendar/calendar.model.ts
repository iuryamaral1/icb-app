import { Year } from './year.model';
import * as moment from 'moment';
import { Day } from './day.model';

export class Calendar {

    today: number = moment().day();
    currentMonth: number;
    currentYear: number;
    weekDays: string[] = [];
    year: Year[] = [];
    daysInMonth: number;
    startWeekDay: number;
    daysList: Day[] = new Array<Day>();

    constructor(currentMonth?: number, currentYear?: number) {
        if (currentMonth == null) {
            currentMonth = moment().month();
        }
        if (currentYear == null) {
            currentYear = moment().year();
        }

        this.currentMonth = currentMonth;
        this.currentYear = currentYear;

        this.weekDays = moment.localeData('pt').weekdaysShort();
        this.daysInMonth = moment(this.currentYear + '' + (this.currentMonth + 1), 'YYYYMM').daysInMonth();
        this.startWeekDay = moment(this.currentYear + '' + (this.currentMonth + 1), 'YYYYMM').startOf('month').isoWeekday();
        this.sortDaysList();
    }

    sortDaysList(): void {
        this.pushDaysLastMonth();

        for (let i = 1; i <= this.daysInMonth; i++) {
            const newDay = new Day(i, true);
            this.daysList.push(newDay);
        }
    }

    pushDaysLastMonth(): void {
        const lastMonth = moment(this.currentYear + '' + (this.currentMonth + 1), 'YYYYMM').subtract(1, 'months');
        const ammountDaysLastMonth = lastMonth.daysInMonth();
        let dayWeekOfLastDayMonth = lastMonth.endOf('month').isoWeekday();
        let listToPush: Day[] = new Array<Day>();

        if (dayWeekOfLastDayMonth === 7) {
            dayWeekOfLastDayMonth = 0;
        }

        const start = ammountDaysLastMonth - dayWeekOfLastDayMonth;
        if (dayWeekOfLastDayMonth < 6) {
            for (let i = ammountDaysLastMonth; i >= (start); i--) {
                const newDay = new Day(i, false);
                listToPush.push(newDay);
            }
        }

        listToPush = listToPush.reverse();
        this.daysList = [...listToPush];
    }

    onPreviousClickMonth(): void {

    }

    onNextMonthClick(): void {

    }

    
}
