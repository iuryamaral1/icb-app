import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Pregacao } from '../pregacao-audio/pregacao.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {

  @ViewChild('meditationText') meditationText: ElementRef<HTMLDivElement>;

  dayName: number;
  day: number;
  month: number;
  year: number;
  pregacoes: Array<Pregacao> = new Array<Pregacao>();

  constructor(public router: Router) {
    this.dayName = new Date().getDay();
    this.day = new Date().getUTCDate();
    this.month = new Date().getMonth();
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
  redirectTo(path: string): void {
    this.router.navigateByUrl(`${path}`);
  }
}
