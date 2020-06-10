import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  public id;
  public usuario: any = {};
  public success_message = '';
  public password;
  public identity;


  constructor(
    private _route: ActivatedRoute,
    private _UsuarioService: UserService,
    private _Route: Router,
  ) {
    this.identity = this._UsuarioService.getIdentity();
   }

  ngOnInit(): void {
    if (this.identity.role=='ADMIN'){
      
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._UsuarioService.get_usuario(this.id).subscribe(
          response=>{
            this.usuario = response.usuario;
          },error => {

          }
        );
      }
    );
    }else{
      this._Route.navigate(['dashboard']);
    }
  }

  success_alert(){
    this.success_message = '';
  }

  onSubmit(usuarioForm){
    if(usuarioForm.valid){
      this._UsuarioService.editar_usuario({
        _id: this.id,
        nombres: usuarioForm.value.nombres,
        apellidos: usuarioForm.value.apellidos,
        email: usuarioForm.value.email,
        role: usuarioForm.value.role,
        password: usuarioForm.value.password
      }).subscribe(
        reponse=> {
          this.success_message ='Usuario actualizado Correctamente';
        }, error => {

        }
      );
    }
  }

}
