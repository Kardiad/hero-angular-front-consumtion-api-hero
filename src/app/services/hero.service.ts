import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../heroes/interfaces/hero.interface';
import { enviroments } from 'src/enviroments/enviroments';
import { Respuesta } from '../heroes/interfaces/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private url:string = enviroments.url_api;
  private headers! : HttpHeaders;

  constructor(private http : HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.set('Content-type', 'multipart/form-data');
   }

  public get(endpoint :string):Observable<Respuesta> {
    return this.http.get<Respuesta>(`${this.url}${endpoint}`);
  }

  public post(endpoint :string, params : Hero):Observable<Respuesta>{
    if(!params) throw Error("Hero is required")
    return this.http.post<Respuesta>(`${this.url}${endpoint}`, params, {
      headers : this.headers
    });
  }
  
  public patch(endpoint :string, params:Hero):Observable<Respuesta>{
    if(!params.id) throw Error("Hero is required"); 
    return this.http.patch<Respuesta>(`${this.url}${endpoint}`, params,{
      headers: this.headers
    });
  }

  public delete(endpoint : string, params:Hero):Observable<boolean>{

    return this.http.delete(`${this.url}${endpoint}`)
      .pipe(
        catchError(err => of(false)),
        map(res => true)
      );
  }


}
