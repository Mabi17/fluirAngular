import { Component, inject } from '@angular/core';
import { AuthService, UserDetailDto } from '../../services/auth.service';
import { UserDetail } from '../../interfaces/user-detail';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  authService = inject(AuthService);
  usuarios: UserDetail[] = [];
  editModalOpen: boolean = false;
  selectedUsuario: UserDetailDto = {id: '', fullName: '', email: '', phoneNumber: '', phoneNumberConfirmed: 'false', password: '', passwordConfirmed: ''};


  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.authService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error loading usuarios:', error);
      }
    });
  }

  editarUsuario(usuario: UserDetailDto) {
    this.selectedUsuario = { ...usuario };
    this.editModalOpen = true;
  }

  eliminarUsuario(id: string) {
    this.authService.deleteUser(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
        this.loadUsuarios(); 
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }

  updateUsuario() {
    if (!this.selectedUsuario.email || !this.selectedUsuario.fullName) {
      return;
    }
    
    const dtoToSend = {
    userId: this.selectedUsuario.id,  
    email: this.selectedUsuario.email ?? '',
    fullName: this.selectedUsuario.fullName ?? '',
    phoneNumber: this.selectedUsuario.phoneNumber ?? '',
    phoneNumberConfirmed: this.selectedUsuario.phoneNumberConfirmed ?? '',
    password: undefined,
    passwordConfirmed: undefined};
    
    console.log('Updating user with payload:', dtoToSend);
    
    this.authService.editUser(dtoToSend).subscribe({
      next: () => {
        this.loadUsuarios();
        this.closeEditModal();
      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
  }

  closeEditModal() {
    this.editModalOpen = false;
    this.selectedUsuario = { id: '', fullName: '', email: '', phoneNumber: '', phoneNumberConfirmed: 'false', password: '', passwordConfirmed: '' };
  }

  openCreateModal() {
    //TODO 
  }

}
