import { NgModule } from '@angular/core';

import { FormatNumberPipe } from '@shared/pipes/format-number/format-number.pipe';


@NgModule({
  declarations: [
    FormatNumberPipe
  ],
  exports: [
    FormatNumberPipe
  ]
})
export class PipesModule { }
