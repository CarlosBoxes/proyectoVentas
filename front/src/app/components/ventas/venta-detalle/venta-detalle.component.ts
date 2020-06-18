import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css']
})
export class VentaDetalleComponent implements OnInit {

  public id;
  public identity;
  public venta: any={
    idcliente: '',
    iduser: ''
  };
  public detalles_venta;

  constructor(
    private _VentaService: VentasService,
    private _UsuarioService: UserService,
    private _Router: Router,
    private _route: ActivatedRoute,
  ) {
    this.identity = this._UsuarioService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity){
      this._route.params.subscribe(params=>{
        this.id = params['id'];
        this._VentaService.get_venta(this.id).subscribe(
          response=> {
            this.venta = response.data.venta;
            this.detalles_venta = response.data.detalles;
            console.log(this.venta);
            console.log(this.detalles_venta);
          },error=>{

          }
        );
      });
    }else{
      this._Router.navigate(['']);
    }
  }

}
