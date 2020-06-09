import { Component, OnInit } from '@angular/core';
import { Cliente } from "../../../models/cliente";
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  
  public cliente;
  public success_message = '';

  constructor(
    private _ClienteService: ClienteService,
  ) {
    this.cliente = new Cliente('','','','',0);
   }

  ngOnInit(): void {
  }

  success_alert(){
    this.success_message = '';
  }
  onSubmit(clienteForm){
    if(clienteForm.valid){
      this._ClienteService.registrar_cliente({
        nombres: clienteForm.value.nombres,
        dni: clienteForm.value.dni,
        correo: clienteForm.value.correo
      }).subscribe(
        response => {
          this.success_message = 'Cliente creado correctamente.';
          this.cliente = new Cliente('','','','',0)
        }, error => {

        }
      );
    }
  }

}
