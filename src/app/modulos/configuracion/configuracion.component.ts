import { Component, inject, OnInit } from '@angular/core';
import { AuthService, UserDetailDto } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-configuracion',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatSnackBarModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent implements OnInit{
  userService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  user?: UserDetailDto;
  editableUser!: Partial<UserDetailDto>;
  editMode = false;
  
  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getDetail().subscribe({
      next: data => {
        this.user = data;
        this.editableUser = { ...data }; 
      },
      error: err => console.error('Error cargando usuario', err)
    });
  }

  editProfile(): void {
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editableUser = { ...this.user! }; 
  }

  saveChanges() { 
  if (!this.editableUser.email || !this.editableUser.fullName || !this.editableUser.phoneNumber || !this.editableUser.password || !this.editableUser.passwordConfirmed) {
    this.matSnackBar.open('Por favor completa todos los campos obligatorios', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
    });
    return;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(this.editableUser.phoneNumber)) {
    this.matSnackBar.open('El teléfono debe tener solo números y máximo 10 dígitos', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
    });
    return;
  }

  const authData = localStorage.getItem('user');
  const parsed = authData ? JSON.parse(authData) : '';

  const payload = {
    userId: parsed.idUsuario,
    email: this.editableUser.email ?? '',
    fullName: this.editableUser.fullName ?? '',
    phoneNumber: this.editableUser.phoneNumber ?? '',
    phoneNumberConfirmed: this.editableUser.phoneNumber ?? '',
    password: this.editableUser.password ?? undefined,
    passwordConfirmed: this.editableUser.passwordConfirmed ?? undefined
  };

  this.userService.editUser(payload).subscribe({
    next: (res) => {
      window.location.reload(); 
      this.matSnackBar.open(res.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
    },
    error: (err) => {
      console.error('Error al actualizar', err);
    }
  });
}


}
