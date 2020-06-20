import { Component, OnInit } from '@angular/core';
import { Pregacao } from '../pregacao-audio/pregacao.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {

  dayName: string;
  day: number;
  month: string;
  year: number;
  pregacoes: Array<Pregacao> = new Array<Pregacao>();

  constructor() { 
    this.dayName = this.getDayName(new Date().getDay());
    this.day = new Date().getUTCDate();
    this.month = this.getMonthName(new Date().getMonth());
    this.year = new Date().getFullYear();

    const storage = firebase.storage();
    const storageRef = storage.ref();
    storageRef.listAll().then(res => {
      res.items.forEach(item => {
        let pregacao = new Pregacao();
        item.getDownloadURL().then(res => {
          pregacao.title = item.name;
          pregacao.url = res;
          this.pregacoes.push(pregacao);
        });
      });
    });
  }

  getDayName(value: number): string {
    switch (value) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Segunda-feira';
      case 2:
        return 'Terça-feira';
      case 3:
        return 'Quarta-feira';
      case 4:
        return 'Quinta-feira';
      case 5:
        return 'Sexta-feira';
      case 6:
        return 'Sábado';
    }
  }

  getMonthName(value: number): string {
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
