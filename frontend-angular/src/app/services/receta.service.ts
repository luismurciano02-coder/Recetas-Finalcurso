import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Receta, RecetaResponse, RecetasListResponse, RecetaPayload, MessageResponse } from '../models/receta.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private apiUrl = `${environment.apiUrl}/recetas`;
  public cargando$ = new BehaviorSubject<boolean>(false);
  public error$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) { }

  private handleError(error: any, fallbackMessage: string) {
    const mensaje = error?.error?.status || fallbackMessage;
    this.error$.next(mensaje);
    return throwError(() => error);
  }

  private startRequest() {
    this.cargando$.next(true);
    this.error$.next(null);
  }

  // GET /
  obtenerRecetas(): Observable<Receta[]> {
    this.startRequest();

    return this.http.get<RecetasListResponse>(`${this.apiUrl}/`).pipe(
      map((response) => response.status || []),
      catchError((error) => this.handleError(error, 'Error al obtener recetas')),
      finalize(() => this.cargando$.next(false))
    );
  }

  // GET /categorias
  obtenerCategorias(): Observable<string[]> {
    this.startRequest();

    return this.http.get<{ status: string[] }>(`${this.apiUrl}/categorias`).pipe(
      map((response) => response.status || []),
      catchError((error) => this.handleError(error, 'Error al obtener categorías')),
      finalize(() => this.cargando$.next(false))
    );
  }

  // GET /receta/:id
  obtenerRecetaPorId(id: string): Observable<Receta> {
    this.startRequest();

    return this.http.get<RecetaResponse>(`${this.apiUrl}/receta/${id}`).pipe(
      map((response) => response.status),
      catchError((error) => this.handleError(error, 'Error al obtener la receta')),
      finalize(() => this.cargando$.next(false))
    );
  }

  // POST /anadir
  crearReceta(receta: RecetaPayload): Observable<string> {
    this.startRequest();

    return this.http.post<MessageResponse>(`${this.apiUrl}/anadir`, receta).pipe(
      map((response) => response.status),
      catchError((error) => this.handleError(error, 'Error al crear la receta')),
      finalize(() => this.cargando$.next(false))
    );
  }

  // PUT /actualizar/:id
  actualizarReceta(id: string, receta: RecetaPayload): Observable<string> {
    this.startRequest();

    return this.http.put<MessageResponse>(`${this.apiUrl}/actualizar/${id}`, receta).pipe(
      map((response) => response.status),
      catchError((error) => this.handleError(error, 'Error al actualizar la receta')),
      finalize(() => this.cargando$.next(false))
    );
  }

  // DELETE /:id
  eliminarReceta(id: string): Observable<string> {
    this.startRequest();

    return this.http.delete<MessageResponse>(`${this.apiUrl}/${id}`).pipe(
      map((response) => response.status),
      catchError((error) => this.handleError(error, 'Error al eliminar la receta')),
      finalize(() => this.cargando$.next(false))
    );
  }
}
