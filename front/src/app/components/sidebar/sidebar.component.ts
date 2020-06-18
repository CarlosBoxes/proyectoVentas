import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public identity;
  public token;
  public role;

  constructor(
    private _UserService: UserService,
    private _Router: Router,
  ) { 
    this.identity = this._UserService.getIdentity();
    this.identity = this._UserService.getToken();
  }

  ngOnInit(): void {
    this.role = this.identity.role;
    console.log(this.role);
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.identity = null;
    this.token = null;

    this._Router.navigate(['']);
  }

}
