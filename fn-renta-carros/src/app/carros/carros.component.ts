import { Component, OnInit } from '@angular/core';
import { Carro } from '../interfaces/carro';
import { CARROS } from './mock-carros';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit {

  carrosList = CARROS;

  constructor() { }

  ngOnInit(): void {
  }

  buildArr(theArr: Carro[]): Carro[][]{

    var arrOfarr = [];
    for(var i = 0; i < theArr.length ; i+=4) {
        var row = [];

        for(var x = 0; x < 4; x++) {
          var value = theArr[i + x];
            if (!value) {
                break;
            }
            row.push(value);
        }
        arrOfarr.push(row);
    }
     return arrOfarr;
}

}
