import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform( total: string ): string {

    const splitTotal = total.split(',').length;

    return  ( splitTotal === 1 )
            ? `${ total }`
            : ( splitTotal === 2 ) ? `${ total } K` : `${ total } M`;
  }

}
