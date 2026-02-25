export interface Receta {
  _id?: string;
  nombre: string;
  descripcion: string;
  ingredientes: string;
  instrucciones: string;
  categorias: string[];
  valoracion: {
    puntuacion: number;
    votos: number;
  };
}

export interface RecetaResponse {
  status: Receta;
}

export interface RecetasListResponse {
  status: Receta[];
}

export interface ApiError {
  status?: string;
  errors?: Record<string, string>;
}

export interface RecetaPayload {
  nombre: string;
  descripcion: string;
  ingredientes: string;
  instrucciones: string;
  categorias: string[];
  valoracion: {
    puntuacion: number;
    votos: number;
  };
}

export interface MessageResponse {
  status: string;
}
