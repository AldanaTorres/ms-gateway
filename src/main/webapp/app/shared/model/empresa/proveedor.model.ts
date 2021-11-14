import { IEmpresa } from 'app/shared/model/empresa/empresa.model';

export interface IProveedor {
  id?: number;
  nombre?: string;
  direccion?: string;
  cuit?: number;
  telefono?: number;
  empresa?: IEmpresa;
}

export const defaultValue: Readonly<IProveedor> = {};
