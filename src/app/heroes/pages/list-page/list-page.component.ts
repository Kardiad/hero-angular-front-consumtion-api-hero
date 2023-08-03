import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../../services/hero.service';
import { enviroments } from 'src/enviroments/enviroments';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public heroes:Hero[] = [];

  constructor(private service: HeroService){}
  
  ngOnInit(): void {
    this.service.get(enviroments.heroLista).subscribe( (heroes) =>{ 
      this.heroes = heroes.data!;
    });
  }



}
