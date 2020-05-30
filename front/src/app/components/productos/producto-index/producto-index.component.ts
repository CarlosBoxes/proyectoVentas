import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {
  public productos;
  public url;
  public filtro;
  public categorias;
  public titulo_cat;
  public descripcion_cat;


  constructor(
    private _productoServie: ProductoService
  ) {
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this._productoServie.get_productos('').subscribe(
      response => {
        this.productos = response.productos;
      },error =>{

      }
    );
    this._productoServie.get_categorias().subscribe (
      response=> {
        this.categorias = response.categorias;
      },error => {

      }
    );
  }

  search(searchForm){
    this._productoServie.get_productos(searchForm.value.filtro).subscribe(
      response => {
        this.productos = response.productos;
      },error =>{

      }
    )
  }

  save_cat(categoriaForm){
    if(categoriaForm.valid)
    {
      this._productoServie.insert_categoria({
        titulo: categoriaForm.value.titulo_cat,
        descripcion: categoriaForm.value.descripcion_cat,
      }).subscribe(
        response => {
          this._productoServie.get_categorias().subscribe(
            response => {
              this.categorias = response.categorias;              
             $('#modal-save-categoria').modal('hide');
            }, error => {

            }
          );
        }, error => {

        }
      );
    }

  }

}
