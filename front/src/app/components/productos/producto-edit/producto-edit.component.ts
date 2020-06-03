import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

import { Producto } from "../../../models/producto";
import { GLOBAL } from 'src/app/services/GLOBAL';

interface HtmlInputEvent extends Event {
  target : HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {

  public producto;
  public id;

  public file:File;
  public imgSelect : String | ArrayBuffer;
  public categorias;
  public success_message;
  public error_message;
  public url;

  constructor(
    private _route : ActivatedRoute,
    private _productoService :  ProductoService,
  ) {
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this._productoService.get_producto(this.id).subscribe(
        response=>{
          this.producto = response.producto;

          this._productoService.get_categorias().subscribe(
            response => {
              this.categorias = response.categorias;
            }, error => {
      
            }
          )
          console.log(this.producto);
        }, error => {
        }
      )
    })

  }

  //ACA PA BAJO BORRAR

  success_alert ()
  {
    this.success_message =""
  }

  error_alert ()
  {
    this.error_message =""
  }
  
  onSubmit(productoForm){
    if (productoForm.valid)
    { 
          this._productoService.update_producto({
            _id: this.id,
            titulo: productoForm.value.titulo,
            descripcion: productoForm.value.descripcion,
            imagen: this.file,
            idCategoria: productoForm.value.idCategoria,
            precio_compra: productoForm.value.precio_compra,
            precio_venta: productoForm.value.precio_venta,
            puntos: productoForm.value.puntos,
            img_name: this.producto.imagen,}
          ).subscribe(
            response => {
              console.log(response);
              this.success_message = 'El producto se actualizo correctamente';
            },error => {
              this.error_message = 'Complete correctamente el formulario';
            }
          );
    }else{
      this.error_message = 'Complete correctamente el formulario';
    }
  }

  imgSelected(event : HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => this.imgSelect = reader.result;

      reader.readAsDataURL (this.file);
    }
  }

}
