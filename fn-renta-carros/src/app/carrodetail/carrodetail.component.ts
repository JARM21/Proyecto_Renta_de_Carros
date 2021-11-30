import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CARROS } from '../carros/mock-carros';

import { Carro } from '../interfaces/carro';

@Component({
  selector: 'app-carrodetail',
  templateUrl: './carrodetail.component.html',
  styleUrls: ['./carrodetail.component.css']
})
export class CarrodetailComponent implements OnInit {
  private routeSub?: Subscription;
  carro? : Carro;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.carro = CARROS.find(e => e.id === Number(params["id"]));
    })
  }
}
