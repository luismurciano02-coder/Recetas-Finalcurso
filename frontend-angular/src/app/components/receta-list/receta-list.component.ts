import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RecetaService } from '../../services/receta.service';
import { Receta } from '../../models/receta.model';

@Component({
  selector: 'app-receta-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './receta-list.component.html',
  styleUrls: ['./receta-list.component.css']
})
export class RecetaListComponent implements OnInit {
  recetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];
  recetasPaginadas: Receta[] = [];
  cargando = false;
  error: string | null = null;
  mostrarError = false;
  exito: string | null = null;

  paginaActual = 1;
  totalPaginas = 1;
  limite = 6;

  busqueda = '';
  categoriaFiltro = '';

  categorias: string[] = [];

  constructor(private recetaService: RecetaService) { }

  ngOnInit(): void {
    this.cargarDatos();
    this.recetaService.cargando$.subscribe(value => {
      this.cargando = value;
    });
    this.recetaService.error$.subscribe(value => {
      this.error = value;
      this.mostrarError = !!value;
    });
  }

  cargarDatos(): void {
    forkJoin([
      this.recetaService.obtenerRecetas(),
      this.recetaService.obtenerCategorias(),
    ]).subscribe({
      next: ([recetas, categorias]) => {
        this.recetas = recetas;
        this.categorias = categorias;
        this.aplicarFiltros();
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
      }
    });
  }

  aplicarFiltros(): void {
    this.exito = null;
    const texto = this.busqueda.trim().toLowerCase();
    this.paginaActual = 1;

    this.recetasFiltradas = this.recetas.filter((receta) => {
      const coincideBusqueda = !texto
        || receta.nombre.toLowerCase().includes(texto)
        || receta.descripcion.toLowerCase().includes(texto);

      const coincideCategoria = !this.categoriaFiltro
        || receta.categorias.includes(this.categoriaFiltro);

      return coincideBusqueda && coincideCategoria;
    });

    this.calcularPaginacion();
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.categoriaFiltro = '';
    this.aplicarFiltros();
  }

  calcularPaginacion(): void {
    this.totalPaginas = Math.max(1, Math.ceil(this.recetasFiltradas.length / this.limite));

    if (this.paginaActual > this.totalPaginas) {
      this.paginaActual = this.totalPaginas;
    }

    const inicio = (this.paginaActual - 1) * this.limite;
    const fin = inicio + this.limite;
    this.recetasPaginadas = this.recetasFiltradas.slice(inicio, fin);
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.calcularPaginacion();
      window.scrollTo(0, 0);
    }
  }

  eliminarReceta(id?: string): void {
    if (!id) return;
    if (!window.confirm('¿Seguro que deseas eliminar esta receta?')) return;

    this.recetaService.eliminarReceta(id).subscribe({
      next: () => {
        this.exito = 'Receta eliminada correctamente';
        this.recetas = this.recetas.filter((r) => r._id !== id);
        this.aplicarFiltros();
      },
      error: (err) => {
        console.error('Error al eliminar receta:', err);
      }
    });
  }
}
