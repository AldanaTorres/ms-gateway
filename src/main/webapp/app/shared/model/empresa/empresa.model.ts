import { ICliente } from 'app/shared/model/empresa/cliente.model';

export interface IEmpresa {
  id?: number;
  nombre?: string;
  direccion?: string;
  cUIT?: number;
  telefono?: number;
  clientes?: ICliente[];
}

export const defaultValue: Readonly<IEmpresa> = {};
