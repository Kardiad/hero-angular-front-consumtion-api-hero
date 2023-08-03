import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/heroes/interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './hero-card.component.html',
  styles: [
  ]
})
export class HeroCardComponent implements OnInit{
  @Input() hero! : Hero;
  
  ngOnInit(): void {
    if(!this.hero){
      throw new Error('Hero is required');
    }
  }
}
