import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-versiculo',
  templateUrl: './versiculo.component.html',
  styleUrls: ['./versiculo.component.css']
})
export class VersiculoComponent {

  @Input() verse: any;

  isSelected: boolean;

  constructor() { }

  onSelect(): void {
    this.isSelected = !this.isSelected;
  }
}
