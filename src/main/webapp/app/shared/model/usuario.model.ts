import { Moment } from 'moment';

export interface IUsuario {
  id?: number;
  nome?: string;
  dataNascimento?: Moment;
  cpf?: string;
  rg?: string;
}

export class Usuario implements IUsuario {
  constructor(public id?: number, public nome?: string, public dataNascimento?: Moment, public cpf?: string, public rg?: string) {}
}
