import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'versionName'
})
export class VersionNamePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'acf':
        return 'Almeida Corrigida Fiel';
      case 'apee':
        return 'APEE';
      case 'bbe':
        return 'Bible in Basic English';
      case 'kjv':
        return 'King James Version';
      case 'nvi':
        return 'Nova Versão Internacional';
      case 'ra':
        return 'RA';
      case 'rvr':
        return 'La Biblia Reina-Valera';
    }
  }

}
