import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  enviarCotizacion(data: any) {
    return this.http.post(`${this.apiUrl}Contacto`, data);
  }
}
