import { Year } from './year.model';
import * as moment from 'moment';
import { Day } from './day.model';

export class Calendar {

    currentMonth: number;
    weekDays: string[] = [];
    year: Year[] = [];
    daysInMonth: number;
    startWeekDay: number;
    daysList: Day[] = new Array<Day>();

    constructor(currentMonth?: number) {
        if (!currentMonth) {
            currentMonth = moment().month();
        }
        this.currentMonth = currentMonth;
        this.weekDays = moment.localeData('pt').weekdaysShort();
        this.daysInMonth = moment(this.currentMonth + 1, 'MM').daysInMonth();
        this.startWeekDay = moment(this.currentMonth + 1, 'MM').startOf('month').isoWeekday();
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
        const lastMonth = moment(this.currentMonth + 1, 'MM').subtract(1, 'months');
        const ammountDaysLastMonth = lastMonth.daysInMonth();
        const dayWeekOfLastDayMonth = lastMonth.endOf('month').isoWeekday();

        const listToPush: Day[] = new Array<Day>();
        for (let i = ammountDaysLastMonth; i >= (ammountDaysLastMonth - dayWeekOfLastDayMonth); i--) {
            const newDay = new Day(i, false);
            listToPush.push(newDay);
        }

        this.daysList = [...listToPush];
    }

    onPreviousClickMonth(): void {
        
    }

    onNextMonthClick(): void {
        
    }

    
}
