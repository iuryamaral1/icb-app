import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pregacao } from '../pregacao-audio/pregacao.model';

@Injectable({
  providedIn: 'root'
})
export class PregacaoService {

  private pregacaoMessage = new BehaviorSubject<Pregacao>(new Pregacao());
  currentPregacaoMessage = this.pregacaoMessage.asObservable();

  constructor() { }

  compartilharPregacao(pregacao: Pregacao) {
    this.pregacaoMessage.next(pregacao);
  }

}
