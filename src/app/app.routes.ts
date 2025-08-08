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

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app/inicio', component: ResumenComponent },
  { path: 'registrate', component: RegistrateComponent },
  {
    path: 'app',
    component: AppLayoutComponent, // Layout privado
    children: [
      { path: 'index', component: InicioFluirComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'cancel', component: CancelComponent },
      { path: 'comentarios', component: ComentariosComponent },
      //{ path: 'configuracion', component: ConfiguracionComponent },
    ],
  },
];


