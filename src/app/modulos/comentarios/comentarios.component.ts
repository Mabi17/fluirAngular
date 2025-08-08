import { Component, inject } from '@angular/core';
import { Comentario } from '../../interfaces/comentario';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comentarios',
  imports: [FormsModule, CommonModule],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {
  comentarioService = inject(ProductoService);
comentarios: Comentario[] = [];
nuevoComentario: Comentario = { usuarioId: '', texto: '' };

ngOnInit() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  this.nuevoComentario.usuarioId = user.idUsuario;

  this.recargarComentarios();
}

enviarComentario(): void {
    if (!this.nuevoComentario.texto.trim()) return;

    this.comentarioService.enviarComentario(this.nuevoComentario).subscribe(() => {
      this.nuevoComentario.texto = '';
      this.recargarComentarios();
    });
  }

recargarComentarios(){
  this.comentarioService.getComentarios().subscribe(data => {
    this.comentarios = data;
  });
}

}
