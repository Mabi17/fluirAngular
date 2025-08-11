import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { ResumenComponent } from './modulos/resumen/resumen.component';
import { RegistrateComponent } from './modulos/registrate/registrate.component';
import { InicioFluirComponent } from './modulos/inicio-fluir/inicio-fluir.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { ProductosComponent } from './modulos/productos/productos.component';
import { SuccessComponent } from './modulos/success/success.component';
import { CancelComponent } from './modulos/cancel/cancel.component';
import { ComentariosComponent } from './modulos/comentarios/comentarios.component';
import { ConfiguracionComponent } from './modulos/configuracion/configuracion.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ComentariosAdminComponent } from './admin/comentarios/comentarios.component';
import { PlanesComponent } from './admin/planes/planes.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app/inicio', component: ResumenComponent, canActivate: [authGuard] },
  { path: 'registrate', component: RegistrateComponent },
  {
    path: 'app',
    component: AppLayoutComponent, 
    children: [
      { path: 'index', component: InicioFluirComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'cancel', component: CancelComponent },
      { path: 'comentarios', component: ComentariosComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
    ],
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'usuarios', component: UsuariosComponent},
      {path: 'comentarios', component: ComentariosAdminComponent},
      {path: 'planes', component: PlanesComponent}

    ],
    data: { roles: ['Admin'],  },
    canActivate: [roleGuard]
  }
];


