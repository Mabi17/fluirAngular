import { CanActivateFn } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const matSnackBar = inject(MatSnackBar);

  if (inject(AuthService).isLoggedIn()){
    return true;
  }

  matSnackBar.open('Debes iniciar sesión para acceder a esta página', 'Cerrar', {
    duration: 3000,
    panelClass: ['error-snackbar'],
  });
  return false;
};
