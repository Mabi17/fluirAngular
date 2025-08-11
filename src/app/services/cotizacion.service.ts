import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Producto } from '../interfaces/producto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  apiUrl: string = environment.apiUrl;
  router = inject(Router);

  constructor(private http: HttpClient) {}

  enviarCotizacion(data: any) {
    return this.http.post(`${this.apiUrl}Contacto`, data);
  }

  crearSesionPago(p:Producto): void {
    const authData = localStorage.getItem('user');
    const parsed = authData ? JSON.parse(authData): '';
    console.log("parsed.IdUsuario: " + parsed.idUsuario);
    const body = {
      id: p.id,
      nombre: p.nombre,
      costo: p.costo,
      descripcion: p.descripcion,
      idUsuario: parsed.idUsuario
    }

    this.http.post<any>(`${this.apiUrl}Stripe/create-checkout-session`, body)
      .subscribe({
        next: (res) => {
          if (res.url) {
            window.location.href = res.url; 
          } else {
            console.error('No se recibió la URL de sesión de Stripe');
          }
        },
        error: (err) => {
          console.error('Error al crear la sesión de Stripe:', err);
        }
      });
  }
}
