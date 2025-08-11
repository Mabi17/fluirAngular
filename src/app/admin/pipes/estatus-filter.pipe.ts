import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatusFilter'
})
export class EstatusFilterPipe implements PipeTransform {

  transform(value: any[], estatus: number | string): any[] {
    if (estatus === null || estatus === undefined || estatus === '') return value;
    const estatusNum = Number(estatus);
    return value.filter(item => item.estatus === estatusNum);
  }


}
