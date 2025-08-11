import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { Comentario } from '../interfaces/comentario';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}Productos`);
  }

  getProductoUsuario(): Observable<Producto> {
    const authData = localStorage.getItem('user');
    const parsed = authData ? JSON.parse(authData) : '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${parsed.token}`
    });

    return this.http.get<Producto>(`${this.apiUrl}UsuarioProducto/producto-usuario?idUsuario=${parsed.idUsuario}`, { headers });
  }

  postProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}Productos`, producto);
  }

  putProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}Productos/${producto.id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}Productos/${id}`);
  }

  //! Comentarios ////////////////////////

  postComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.apiUrl}Comentario`, comentario);
  }

  getComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}Comentario`);
  }

  enviarComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.apiUrl}Comentario`, comentario);
  }

  eliminarComentario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}Comentario/${id}`);
  }

}
