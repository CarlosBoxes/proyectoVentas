import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './components/login/login.component';

import { routing } from "./app.routing";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductoCreateComponent } from './components/productos/producto-create/producto-create.component';
import { ProductoEditComponent } from './components/productos/producto-edit/producto-edit.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { ClienteIndexComponent } from './components/clientes/cliente-index/cliente-index.component';
import { ClienteCreateComponent } from './components/clientes/cliente-create/cliente-create.component';
import { ClienteEditComponent } from './components/clientes/cliente-edit/cliente-edit.component';
import { UsersIndexComponent } from './components/users/users-index/users-index.component';
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';
import { UsersCreateComponent } from './components/users/users-create/users-create.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductoIndexComponent,
    SidebarComponent,
    ProductoCreateComponent,
    ProductoEditComponent,
    ClienteIndexComponent,
    ClienteCreateComponent,
    ClienteEditComponent,
    UsersIndexComponent,
    UsersEditComponent,
    UsersCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    routing,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
