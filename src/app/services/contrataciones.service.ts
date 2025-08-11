import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contratacion } from '../interfaces/contrataciones';

@Injectable({
  providedIn: 'root'
})
export class ContratacionesService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getContrataciones(): Observable<Contratacion[]> {
    return this.http.get<Contratacion[]>(`${this.apiUrl}Contrataciones`);
  }

}
