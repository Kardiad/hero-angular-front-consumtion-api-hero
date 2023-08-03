import { Component } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../../services/hero.service';
import { FormControl } from '@angular/forms';
import { enviroments } from 'src/enviroments/enviroments';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {
  search_param = new FormControl('');
  heroSugested : Hero[] = [];
  heroSelected? : Hero ;

  constructor(
    private service: HeroService) {
  }

  searchHero(): void{
    const value : string = this.search_param.value ?? "";
    this.service.get(enviroments.heroBAprox+value).subscribe(
      (heroes => this.heroSugested = heroes.data!)
    )
  }

  onSelectedOption($event : MatAutocompleteSelectedEvent):void{
    if(!$event.option.value) this.heroSelected = undefined;
    const hero : String = $event.option.value;
    this.service.get(enviroments.heroBAprox+hero).subscribe(
      (hero => this.heroSelected = hero.data!.pop())
    )
  }

}
