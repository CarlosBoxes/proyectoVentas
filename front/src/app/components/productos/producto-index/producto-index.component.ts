import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';


@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {
  public productos;
  public url;
  public filtro;

  constructor(
    private _productoServie: ProductoService
  ) {
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this._productoServie.get_productos('').subscribe(
      response => {
        this.productos = response.productos;
        console.log(this.productos)
      },error =>{

      }
    )
  }

  search(searchForm){
    this._productoServie.get_productos(searchForm.value.filtro).subscribe(
      response => {
        this.productos = response.productos;
        console.log(this.productos)
      },error =>{

      }
    )
  }

}
