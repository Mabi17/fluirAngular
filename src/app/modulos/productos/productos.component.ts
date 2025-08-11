import { Component, inject, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CotizacionService } from '../../services/cotizacion.service';

@Component({
  selector: 'app-productos',
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productoService = inject(ProductoService);
  stripeService=inject(CotizacionService);
  productos: Producto[] = [];
  producto: Producto | null = null;

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
      }
    });
  }

  iniciarPago(p:Producto) {
    this.stripeService.crearSesionPago(p);
  }

  ngOnInit(): void {
      const authData = localStorage.getItem('user');
      if(authData) {
        const parsed = JSON.parse(authData);
        if (!parsed.producto || parsed.producto === '') {
          this.cargarProductos();
        } else {
          this.productoService.getProductoUsuario().subscribe({
        next: (producto) => {
          parsed.producto = producto;
          localStorage.setItem('user', JSON.stringify(parsed));
          this.producto = producto;
        },
        error: (error) => {
          console.error('Error al obtener producto:', error);
        }
      });
    }
      }
    }
}
