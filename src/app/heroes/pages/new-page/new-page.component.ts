import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from 'src/app/services/hero.service';
import { enviroments } from 'src/enviroments/enviroments';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public id:number = 0;
  
  private file? : File;

  public form = new FormGroup({
    id : new FormControl<number>(0),
    nombre: new FormControl<string>("", {nonNullable:true}),
    codigo: new FormControl<string>("", {nonNullable : true}),
    aparicion: new FormControl<string>("", {nonNullable:true}),
    alterego: new FormControl<string>("", {nonNullable:true}),
    img : new FormControl<string>("", {nonNullable:true}),
    editorial: new FormControl<string>("", {nonNullable:true})
  }
  );
  public hero? : Hero ;
  public edit : boolean = true;

  constructor(
    private service : HeroService,
    private routes : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.routes.params
      .pipe(
        switchMap((id)=>{
          if(!id['id']){
            this.edit = false;
            return [];
          } 
          this.id = id['id'];
          return this.service.get(enviroments.heroById+id['id'])})
      )
      .subscribe((hero)=>{
        if(hero) this.hero = hero.data!.pop();
      })
  }

  private currentHero(): void{
    this.hero = this.form.value as Hero;
    this.hero.img = this.file!;
    this.hero.id = this.id;
  }

  onChange($event : HTMLInputElement){
    this.file = $event.files![0];
    this.currentHero();
  }

  onSubmit():void{
    this.currentHero();
    console.log({
      isvalid : this.form.valid,
      value: this.form.getRawValue(),
      hero : this.hero
    })
    if(this.id === 0 && this.form.valid){
      //TODO make the file properly adecuated to back-end
      this.service.post(enviroments.heroAnadir, this.hero!)
        .subscribe();
        return;
    }
    if(this.form.valid){
      this.service.patch(`${enviroments.heroEditar}${this.id}`, this.hero!)
        .subscribe();
    }
  }

  

  

}
