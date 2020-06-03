import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { ProductoCreateComponent } from './components/productos/producto-create/producto-create.component';
import { ProductoEditComponent } from './components/productos/producto-edit/producto-edit.component';
import { ClienteIndexComponent } from './components/clientes/cliente-index/cliente-index.component';
import { ClienteCreateComponent } from './components/clientes/cliente-create/cliente-create.component';

const appRoute: Routes = [
    {path: '', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'productos', component: ProductoIndexComponent},
    {path: 'productos/registrar',component: ProductoCreateComponent},
    {path: 'productos/editar/:id', component: ProductoEditComponent},
    {path: 'clientes', component: ClienteIndexComponent},
    {path: 'cliente/registrar', component: ClienteCreateComponent},

]

export const appRoutingProviders: any[] = []

export const routing: ModuleWithProviders = RouterModule.forRoot (appRoute);