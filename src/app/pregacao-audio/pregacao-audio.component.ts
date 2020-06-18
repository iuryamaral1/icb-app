import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Pregacao } from './pregacao.model';

@Component({
  selector: 'app-pregacao-audio',
  templateUrl: './pregacao-audio.component.html',
  styleUrls: ['./pregacao-audio.component.css']
})
export class PregacaoAudioComponent {

  pregacoes = new Array<Pregacao>();
  storage: any;

  constructor() {
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

}
