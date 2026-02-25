import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RecetaService } from '../../services/receta.service';
import { Receta } from '../../models/receta.model';

@Component({
  selector: 'app-receta-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './receta-detail.component.html',
  styleUrls: ['./receta-detail.component.css']
})
export class RecetaDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recetaService = inject(RecetaService);

  receta: Receta | null = null;
  cargando = false;
  error: string | null = null;
  mostrarError = false;
  mostrarConfirmarEliminar = false;

  constructor() { }

  ngOnInit(): void {
    this.cargarReceta();
    this.recetaService.cargando$.subscribe(value => {
      this.cargando = value;
    });
    this.recetaService.error$.subscribe(value => {
      this.error = value;
      this.mostrarError = !!value;
    });
  }

  cargarReceta(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID de receta no proporcionado';
      this.mostrarError = true;
      return;
    }

    this.recetaService.obtenerRecetaPorId(id).subscribe({
      next: (receta) => {
        this.receta = receta;
      },
      error: (err) => {
        console.error('Error al cargar receta:', err);
      }
    });
  }

  abrirConfirmarEliminar(): void {
    this.mostrarConfirmarEliminar = true;
  }

  cancelarEliminar(): void {
    this.mostrarConfirmarEliminar = false;
  }

  volverAtras(): void {
    window.history.back();
  }

  eliminarReceta(): void {
    if (!this.receta?._id) return;

    this.recetaService.eliminarReceta(this.receta._id).subscribe({
      next: () => {
        this.router.navigate(['/recetas']);
      },
      error: (err) => {
        console.error('Error al eliminar receta:', err);
      }
    });
  }
}
