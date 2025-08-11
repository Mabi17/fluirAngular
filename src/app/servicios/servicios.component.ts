import { Component, inject } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Comentario } from '../interfaces/comentario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios',
  imports: [CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

  comentarioService = inject(ProductoService);
  comentarios: Comentario[] = [];

  ngOnInit() {
    this.recargarComentarios();
  }


  recargarComentarios() {
    this.comentarioService.getComentarios().subscribe(data => {
      this.comentarios = data;
    });
  }

}
