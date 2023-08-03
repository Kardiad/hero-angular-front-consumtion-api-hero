import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/enviroments/enviroments';
import { Observable } from 'rxjs';
import { Usuario } from '../heroes/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url : string = enviroments.url_api;

  constructor(private http : HttpClient) { }

  public getUsuario(endpoint : string):Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}${endpoint}`);
  }
}
