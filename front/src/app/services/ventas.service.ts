import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  public url;

  constructor(
   private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  get_ventas():Observable<any> {
    let headers = new HttpHeaders ().set('Content-Type','application/json');

    return this._http.get(this.url+'ventas',{headers: headers});
  }

  save_data(data){
    let headers = new HttpHeaders ().set('Content-Type','application/json');

    return this._http.post(this.url+'venta/registrar',data,{headers: headers});
  }

  get_venta(id):Observable<any> {
    let headers = new HttpHeaders ().set('Content-Type','application/json');

    return this._http.get(this.url+'venta/datos/'+id,{headers: headers});
  }
}
