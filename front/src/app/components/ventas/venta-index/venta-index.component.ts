import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-venta-index',
  templateUrl: './venta-index.component.html',
  styleUrls: ['./venta-index.component.css']
})
export class VentaIndexComponent implements OnInit {

  public identity;
  public ventas;

  constructor(
    private _UserService: UserService,
    private _Route: Router,
    private _VentaService: VentasService,
  ) { 
    this.identity = this._UserService.getIdentity();
  }

  ngOnInit(): void {
    if (this.identity){
      //USUARIO LOGGEADO
      this._VentaService.get_ventas().subscribe(
        response => {
          this.ventas = response.ventas;
          console.log(this.ventas);
        },error=> {

        }
      );
    }else{
      this._Route.navigate(['']);
    }
  }

}
