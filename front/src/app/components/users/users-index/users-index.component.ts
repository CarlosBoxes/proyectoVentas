import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent implements OnInit {

  
  public usuarios;
  public p: number = 1;
  public identity;

  constructor(
    private _UsersService: UserService,
    private _Route: Router,
  ) { 
    this.identity = _UsersService.getIdentity();
  }

  ngOnInit(): void {
  if(this.identity.role=='ADMIN'){
  this._UsersService.get_usuarios().subscribe(
    response => {
      this.usuarios = response.usuarios;
    }, error => {

    }
  );
  }else{
    this._Route.navigate(['ventas']);
  }
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
          'Usuario Eliminado!',
          'Se elimino el correctamente',
          'success'
        )

        this._UsersService.delete_usuarios(id).subscribe(
          response => {
            this._UsersService.get_usuarios().subscribe(
              response => {
                this.usuarios = response.usuarios;
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
