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

  eliminar (id){}

}
