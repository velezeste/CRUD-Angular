import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultFilter = [];
    for(const category of value){
      if(category.categoria.indexOf(arg) > -1){
         resultFilter.push(category);
      };
    };
    return resultFilter;
  }  

}
