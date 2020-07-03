import { Year } from "./year.model";
import * as moment from 'moment';

export class Calendar {

    currentMonth: number;
    weekDays: string[] = [];
    year: Year[] = [];
    daysInMonth: number;
    startWeekDay: number;
    daysList: number[];

    constructor() {
        this.currentMonth = moment().month();
        this.weekDays = moment.localeData('pt').weekdaysShort();
        this.daysInMonth = moment().daysInMonth();
        this.startWeekDay = moment().startOf('month').isoWeekday();
        this.sortDaysList();
        console.log(moment().week());
    }

    sortDaysList(): void {
        let lastMonth = moment().subtract(1, 'months');
        let ammountDaysLastMonth = lastMonth.daysInMonth();
        let startWeekDayLastMonth = lastMonth.endOf('month').isoWeekday();

        for (let i = 1; i <= ammountDaysLastMonth; i++) {
            this.daysList.push();
        }
    }

    onPreviousClickMonth(): void {
        
    }

    onNextMonthClick(): void {
        
    }
}
