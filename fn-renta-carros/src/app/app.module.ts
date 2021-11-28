import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarroComponent } from './carro/carro.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { CarrodetailComponent } from './carrodetail/carrodetail.component';

@NgModule({
  declarations: [
    AppComponent,
    CarroComponent,
    PurchaseComponent,
    HomeComponent,
    AboutComponent,
    CarrodetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
