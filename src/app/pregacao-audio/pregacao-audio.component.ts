import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Pregacao } from './pregacao.model';
import { PregacaoService } from '../services/pregacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregacao-audio',
  templateUrl: './pregacao-audio.component.html',
  styleUrls: ['./pregacao-audio.component.css']
})
export class PregacaoAudioComponent {

  pregacoes = new Array<Pregacao>();
  storage: any;
  showLoader: boolean;

  constructor(private pregacaoService: PregacaoService,
              public router: Router) {
    this.displayLoader();
    const storage = firebase.storage();
    const storageRef = storage.ref();
    storageRef.listAll().then(res => {
      res.items.forEach(item => {
        let pregacao = new Pregacao();
        item.getDownloadURL().then(res => {
          pregacao.title = item.name.endsWith('.mp3') ? item.name.split('.mp3')[0] : item.name;
          pregacao.url = res;
          this.pregacoes.push(pregacao);
        });
      });
      this.displayLoader();
    });
  }

  displayLoader(): void {
    this.showLoader = !this.showLoader;
  }

  hearMessage(pregacao): void {
    this.pregacaoService.compartilharPregacao(pregacao);
    this.router.navigateByUrl('/home/reproduzir-audio');
  }
}
