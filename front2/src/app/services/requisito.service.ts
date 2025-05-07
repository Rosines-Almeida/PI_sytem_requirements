import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Requisito {
  id?: number;
  titulo: string;
  projeto: string;
  tipo: string;
  descricao: string;
  dataEntrega: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {
  private baseUrl = 'http://localhost:3000/requisitos';

  constructor(private http: HttpClient) {}

  getRequisitos(): Observable<Requisito[]> {
    return this.http.get<Requisito[]>(this.baseUrl);
  }

  getRequisito(id: number): Observable<Requisito> {
    return this.http.get<Requisito>(`${this.baseUrl}/${id}`);
  }

  criarRequisito(requisito: Requisito): Observable<Requisito> {
    return this.http.post<Requisito>(this.baseUrl, requisito);
  }
}
