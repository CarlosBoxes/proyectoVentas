import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent implements OnInit {

  
  public usuarios;
  public p: number = 1;

  constructor(
    private _UsersService: UserService,
  ) { }

  ngOnInit(): void {
    this._UsersService.get_usuarios().subscribe(
      response => {
        this.usuarios = response.usuarios;
        console.log(this.usuarios);
      }, error => {

      }
    );
  }

  eliminar (id){

  }

}
