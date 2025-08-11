import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Comentario } from '../../interfaces/comentario';

@Component({
  selector: 'app-comentarios',
  imports: [CommonModule],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})

export class ComentariosAdminComponent {
  comentarioService = inject(ProductoService);
  comentarios: Comentario[] = [];
  filtroUsuario: string = '';
  
  ngOnInit(){
    this.cargarComentarios();
  }

  eliminarComentario(id: any) {
    this.comentarioService.eliminarComentario(id).subscribe(() => {
      this.comentarios = this.comentarios.filter(c => c.id !== id);
    });
  }

  cargarComentarios() {
    this.comentarioService.getComentarios().subscribe(data => {
      this.comentarios = data;
    });
  }



}
