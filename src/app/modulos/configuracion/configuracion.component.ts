import { Component, inject, OnInit } from '@angular/core';
import { AuthService, UserDetailDto } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent implements OnInit{
  userService = inject(AuthService);
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

  saveChanges(): void {
    this.userService.updateUserDetail(this.editableUser).subscribe({
      next: updatedUser => {
        this.user = updatedUser;
        this.editMode = false;
      },
      error: err => console.error('Error actualizando usuario', err)
    });
  }
}
