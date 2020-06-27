import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pregacao } from '../pregacao-audio/pregacao.model';
import * as firebase from 'firebase';
import { AbstractStorageService } from './abstract-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PregacaoService extends AbstractStorageService {

  private pregacaoMessage = new BehaviorSubject<Pregacao>(new Pregacao());
  currentPregacaoMessage = this.pregacaoMessage.asObservable();

  constructor() { super(); }

  compartilharPregacao(pregacao: Pregacao) {
    this.pregacaoMessage.next(pregacao);
  }
}
