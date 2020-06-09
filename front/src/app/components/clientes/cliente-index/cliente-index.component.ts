import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.css']
})
export class ClienteIndexComponent implements OnInit {

    public clientes;
    public p: number = 1;



  constructor(
    private _ClienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this._ClienteService.get_clientes().subscribe(
      response => {
        this.clientes = response.clientes;
        console.log(this.clientes);
      }, error => {

      }
    );
  }

  eliminar (id){
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      text: "No podra revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Cliente Eliminado!',
          'Se elimino el correctamente',
          'success'
        )

        this._ClienteService.delete_cliente(id).subscribe(
          response => {
            this._ClienteService.get_clientes().subscribe(
              response => {
                this.clientes = response.clientes;
              }, error => {

              }
            );
          }, error => {

          }
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se cancelo la solicitud :)',
          'error'
        )
      }
    })
  }

}
