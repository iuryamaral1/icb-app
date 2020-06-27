import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'JANEIRO';
      case 1:
        return 'FEVEREIRO';
      case 2:
        return 'MARÇO';
      case 3:
        return 'ABRIL';
      case 4:
        return 'MAIO';
      case 5:
        return 'JUNHO';
      case 6:
        return 'JULHO';
      case 7:
        return 'AGOSTO';
      case 8:
        return 'SETEMBRO';
      case 9:
        return 'OUTUBRO';
      case 10:
        return 'NOVEMBRO';
      case 11:
        return 'DEZEMBRO';
    }
  }

}
