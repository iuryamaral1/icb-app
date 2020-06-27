import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BoletimService extends AbstractService {

  private boletim = new BehaviorSubject<any>(new Object());
  currentBoletim = this.boletim.asObservable();

  constructor() {
    super('/boletim');
  }

  shareMessageBetweenSiblingComponents(boletim: any) {
    this.boletim.next(boletim);
  }
}
