import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url;
  public user;
  public token;
  public identity;


  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
    this.user = new User('','','','','');
  }

  login (user,getToken = null):Observable<any> {
    let json = user;

    if(getToken!=null){
      user.getToken = true;
    }
    let headers = new HttpHeaders ().set('Content-Type','application/json');

    return this._http.post(this.url+'login',json,{headers:headers});
  }

  getToken():Observable<any>{
    let token = localStorage.getItem('token');
    if(token){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  getIdentity():Observable<any>{
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  get_usuarios():Observable<any> {
    let headers = new HttpHeaders ().set('Content-Type','application/json');

    return this._http.get(this.url+'usuarios/',{headers: headers});
  }

  
  registrar_usuario(data):Observable<any> {
    let headers = new HttpHeaders ().set('Content-Type','application/json');


    return this._http.post(this.url+'registrar/',data,{headers: headers});
  }

  get_usuario(id):Observable<any> {
    let headers = new HttpHeaders ().set('Content-Type','application/json');

    return this._http.get(this.url+'usuario/'+id,{headers: headers});
  }

  editar_usuario(data): Observable<any> {
    let headers = new HttpHeaders ().set('Content-Type','application/json');
    
    return this._http.put(this.url+'usuario/editar/'+data._id,data,{headers: headers});
  }

  delete_usuarios(id): Observable<any> {
    let headers = new HttpHeaders ().set('Content-Type','application/json');

    return this._http.delete(this.url+'usuario/eliminar/'+id,{headers: headers});
  }

}

