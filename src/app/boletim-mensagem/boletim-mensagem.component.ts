import { Component, OnInit } from '@angular/core';
import { BoletimService } from '../services/boletim-service.service';

@Component({
  selector: 'app-boletim-mensagem',
  templateUrl: './boletim-mensagem.component.html',
  styleUrls: ['./boletim-mensagem.component.css']
})
export class BoletimMensagemComponent implements OnInit {

  boletim: any;

  constructor(public boletimService: BoletimService) { }

  ngOnInit() {
    this.boletimService.currentBoletim
        .subscribe(boletim => this.boletim = boletim);
  }

  shareMessageViaWhatsapp(): void {
    let message = this.boletim.title_message + '\n';
    message = message.concat(this.boletim.message + '\n\n');
    message = message.concat('Autor: Pr. Joaquim Amaral' + '\n');

    window.open('https://api.whatsapp.com/send?text=' + message);
  }
}
