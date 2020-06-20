import { Component, OnInit } from '@angular/core';
import { PregacaoService } from '../services/pregacao.service';
import { Pregacao } from '../pregacao-audio/pregacao.model';

@Component({
  selector: 'app-pregacao-reproducao',
  templateUrl: './pregacao-reproducao.component.html',
  styleUrls: ['./pregacao-reproducao.component.css']
})
export class PregacaoReproducaoComponent implements OnInit {

  currentPregacao: Pregacao;

  constructor(private pregacaoService: PregacaoService) { }

  ngOnInit() {
    this.pregacaoService.currentPregacaoMessage
            .subscribe(pregacao => this.currentPregacao = pregacao);
  }
}
