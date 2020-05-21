import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRouting } from './layout.routing';
import { LayoutComponent } from './containers/layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRouting,
    FlexLayoutModule
  ]
})
export class LayoutModule { }
