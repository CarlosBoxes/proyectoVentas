import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  public id;
  public cliente: any = {};
  public success_message = '';

  constructor(
    private _route: ActivatedRoute,
    private _ClienteService: ClienteService,
  ) { 

  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._ClienteService.get_cliente(this.id).subscribe(
          response=>{
            this.cliente = response.cliente;
          },error => {

          }
        );
      }
    );
  }

  success_alert(){
    this.success_message = '';
  }

  onSubmit(clienteForm){
    if(clienteForm.valid){
      this._ClienteService.editar_cliente({
        _id: this.id,
        nombres: clienteForm.value.nombres,
        dni: clienteForm.value.dni,
        correo: clienteForm.value.correo
      }).subscribe(
        reponse=> {
          this.success_message ='Cliente actualizado Correctamente';
        }, error => {

        }
      );
    }
  }

}
