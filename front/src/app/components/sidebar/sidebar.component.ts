import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public identity;

  constructor(
    private _UserService: UserService,
  ) { 
    this.identity = this._UserService.getIdentity();
    console.log(this.identity);
  }

  ngOnInit(): void {
  }

}
