import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(enlace : string | undefined | File): string {
    if(typeof enlace === "string"){
      return enlace;
    }
    if(typeof enlace === "object" && enlace!=null){
      return URL.createObjectURL(enlace);
    }
    return 'assets/no-image.png';
  }

}
