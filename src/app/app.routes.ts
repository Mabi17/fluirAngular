import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { ResumenComponent } from './modulos/resumen/resumen.component';
import { RegistrateComponent } from './modulos/registrate/registrate.component';
import { InicioFluirComponent } from './modulos/inicio-fluir/inicio-fluir.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app/inicio', component: ResumenComponent },
  { path: 'registrate', component: RegistrateComponent },
  {
    path: 'app',
    component: AppLayoutComponent, // Layout privado
    children: [
      { path: 'index', component: InicioFluirComponent }
    //  { path: 'productos', component: ProductosComponent },
      //{ path: 'comentarios', component: ComentariosComponent },
      //{ path: 'configuracion', component: ConfiguracionComponent },
    ],
  },
];


