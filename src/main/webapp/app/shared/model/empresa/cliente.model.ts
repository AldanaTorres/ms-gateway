import { IEmpresa } from 'app/shared/model/empresa/empresa.model';

export interface ICliente {
  id?: number;
  nombre?: string;
  direccion?: string;
  cUIL?: number;
  telefono?: number;
  empresa?: IEmpresa;
}

export const defaultValue: Readonly<ICliente> = {};
