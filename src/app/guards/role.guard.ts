import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const roleGuard: CanActivateFn = (route, state) => {
  const roles = route.data['roles'] as string[];
  const authService = inject(AuthService);
  const matSnackBar = inject(MatSnackBar);
  const router = inject(Router);

  const userRoles = authService.getRoles();

  if(!authService.isLoggedIn()) {
    matSnackBar.open('Debes de estar loggeado para acceder a esta pagina.', 'Ok', {
      duration: 3000,
    });
    router.navigate(['/login']);
    return false;
  }

  if (roles.some(role => userRoles?.includes(role))) {
    return true;
  }
  router.navigate(['/app/index']);
  matSnackBar.open('No tienes permiso para ver esta pagina.', 'Ok', {
    duration: 3000,
  });
  return false;

};
