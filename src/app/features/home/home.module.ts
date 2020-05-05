import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRouting } from './home.routing';
import { HomeComponent } from './containers/home/home.component';
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRouting,
    FlexLayoutModule
  ]
})
export class HomeModule { }
