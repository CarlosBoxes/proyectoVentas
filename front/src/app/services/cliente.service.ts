import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  
  get_clientes():Observable<any> {
    let headers = new HttpHeaders ().set('Content-Type','application/json');

    return this._http.get(this.url+'clientes/',{headers: headers});
  }
}
