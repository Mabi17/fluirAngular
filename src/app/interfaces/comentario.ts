import { UserDetailDto } from '../services/auth.service';
export interface Comentario {
  id?: number;
  usuarioId: string;
  texto: string;
  fecha?: string;
  usuarioNombre?: String;
}
