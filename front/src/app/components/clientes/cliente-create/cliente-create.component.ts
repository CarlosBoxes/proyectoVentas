import { Component, OnInit } from '@angular/core';
import { Cliente } from "../../../models/cliente";

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  
  public cliente;

  constructor(
    
  ) {
    this.cliente = new Cliente('','','','',0);
   }

  ngOnInit(): void {
  }

}
