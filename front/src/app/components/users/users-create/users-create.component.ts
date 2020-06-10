import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {

  public usuario;
  public success_message = '';
  public identity;

  constructor(
    private _UsuarioService: UserService,
    private _Route: Router,
  ) { 
    this.usuario = new User('','','','','');
    this.identity = this._UsuarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity.role != 'ADMIN'){
      this._Route.navigate(['dashboard']);
    }
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
