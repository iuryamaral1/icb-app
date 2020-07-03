import { Component, OnInit } from '@angular/core';
import { AbstractService } from '../services/abstract.service';
import { Router } from '@angular/router';
import { BoletimService } from '../services/boletim-service.service';

@Component({
  selector: 'app-boletim-eletronico',
  templateUrl: './boletim-eletronico.component.html',
  styleUrls: ['./boletim-eletronico.component.css']
})
export class BoletimEletronicoComponent extends AbstractService {

  boletim: any;

  constructor(private router: Router,
              public boletimService: BoletimService) {
    super('/boletins');
    this.getLastEntity()
        .then(res => {
         const boletins = res;
         boletins.forEach(element => {
           this.boletim = element.val();
         });
        })
        .catch(err => console.log(err));
  }

  redirectTo(path: string): void {
    this.boletimService.shareMessageBetweenSiblingComponents(this.boletim);
    this.router.navigateByUrl(`/home/${path}`);
  }
}
