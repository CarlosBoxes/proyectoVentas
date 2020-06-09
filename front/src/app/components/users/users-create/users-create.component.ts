import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/user'

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {

  public usuario;
  public success_message = '';

  constructor(
    private _UsuarioService: UserService,
  ) { 
    this.usuario = new User('','','','','');
  }

  ngOnInit(): void {
  }

  success_alert(){
    this.success_message = '';
  }

  onSubmit(usuarioForm){
    if(usuarioForm.valid){
      this._UsuarioService.registrar_usuario({
        nombres: usuarioForm.value.nombres,
        apellidos: usuarioForm.value.apellidos,
        email: usuarioForm.value.email,
        password: usuarioForm.value.password,
        role: usuarioForm.value.role
      }).subscribe(
        response => {
          this.success_message = 'Usuario creado correctamente.';
          this.usuario = new User('','','','','');
        }, error => {

        }
      );
    }
  }

}
