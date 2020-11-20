import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.css']
})
export class CardBoxComponent {

  @Input('color') color: string;
  @Input('title') title: string = 'Sem titulo';
  @Input('icon') icon: string;
  @Input('url') url: string;

  putColor = true;

  constructor(private router: Router) { }

  onClick() {
    this.router.navigateByUrl(`${this.url}`);
  }
}
