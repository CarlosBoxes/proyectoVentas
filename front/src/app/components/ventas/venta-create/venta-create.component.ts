import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { VentasService } from 'src/app/services/ventas.service';
import { DetalleVenta } from "../../../models/detalleVenta";


@Component({
  selector: 'app-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css']
})
export class VentaCreateComponent implements OnInit {

  public identity;
  public clientes : any;
  public venta : any = {
    idcliente : '',
  };
  public productos;
  public producto : any = {
    stock : '--|--',
  }
  public total = 0;

  public data_detalle : Array<any> = [];
  public detalle : any = {
    idproducto : ''
  };
  public error_message;

  constructor(
    private _UserService: UserService,
    private _Router: Router,
    private _ClientesService: ClienteService,
    private _ProductosService: ProductoService,
    private _VentaService: VentasService,
  ) {
    this.identity = this._UserService.getIdentity();
   }

  ngOnInit(): void {
    if (this.identity){
      this._ProductosService.get_productos('').subscribe(
        response => {
          this.productos = response.productos;
        },error =>{
  
        }
      );

      this._ClientesService.get_clientes().subscribe(
        response => {
          this.clientes = response.clientes;
        },error =>{
  
        }
      );
    }else{
      this._Router.navigate(['']);
    }
  }

  get_data_producto(id){
    this._ProductosService.get_producto(id).subscribe(
      response=> {
        this.producto = response.producto;
      },errror => {

      }
    );
  }

  close_alert(){
    this.error_message = '';
  }



  onSubmit(ventaForm){
    if(ventaForm.valid){
      if(ventaForm.value.idcliente!=''){
        let data = {
          idcliente: ventaForm.value.idcliente,
          iduser: this.identity._id,
          detalles: this.data_detalle
        }

        this._VentaService.save_data(data).subscribe(
          response=>{
            this._Router.navigate(['ventas']);
          }, error=> {
            console.log('Error');
          }
        );

      }else{
        console.log('Error');
      }
    }else{
      console.log('Error');
    }
  }

  save_detalle(detalleForm){
    if(detalleForm.valid){
      if(detalleForm.value.cantidad<=this.producto.stock){
        this.data_detalle.push({
          idproducto: detalleForm.value.idproducto,
          cantidad: detalleForm.value.cantidad,
          producto: this.producto.titulo,
          precio_venta: this.producto.precio_venta
        });

        this.detalle = new DetalleVenta('','',null);

        this.producto.stock = '--|--',

        this.total = this.total + (parseInt(this.producto.precio_venta)* parseInt(detalleForm.value.cantidad));

        
      }else{
          this.error_message = 'No existe el suficiente stock para la venta';
      }
    }else{
      console.log('Error');
    }
  }

  eliminar(idx,precio_venta,cantidad){
    this.data_detalle.splice(idx,1);
    this.total=this.total-(parseInt(precio_venta)*parseInt(cantidad));
  }

}
