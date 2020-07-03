import { Month } from './month.model';

export class Year {

    value: number;
    months: Month[] = [];

    constructor(value: number) {
        this.value = value;
     }

}
