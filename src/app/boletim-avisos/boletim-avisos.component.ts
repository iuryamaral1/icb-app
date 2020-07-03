import { Component } from '@angular/core';
import { BoletimService } from '../services/boletim-service.service';

@Component({
  selector: 'app-boletim-avisos',
  templateUrl: './boletim-avisos.component.html',
  styleUrls: ['./boletim-avisos.component.css']
})
export class BoletimAvisosComponent {

  boletim: any;

  constructor(public boletimService: BoletimService) {
    this.boletimService.currentBoletim.subscribe(res => {
      this.boletim = res;
    });
  }


}
