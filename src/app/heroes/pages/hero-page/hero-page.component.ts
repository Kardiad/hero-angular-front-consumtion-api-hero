import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { enviroments } from 'src/enviroments/enviroments';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public hero? : Hero;

  constructor(
    private route : ActivatedRoute,
    private service : HeroService,
    private router : Router){}

  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap ((id) => this.service.get(enviroments.heroById+id['id']))
    ).subscribe( hero =>{
      if(!hero) return this.router.navigate(['/hero/list']);
      this.hero = hero.data?.pop();
      console.log(this.hero);
      return;
    });
  }

  goBack(){
    this.router.navigateByUrl("/hero/list")
  }

}
