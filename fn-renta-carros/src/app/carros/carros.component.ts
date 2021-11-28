import { Component, OnInit } from '@angular/core';
import { Carro } from '../interfaces/carro';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit {

  carro: Carro = {
    id: 1,
    modelo: "2021",
    marca: "Chevrolet",
    calificacion: 4.3,
    precio: 10000
  };

  constructor() { }

  ngOnInit(): void {
  }

}
