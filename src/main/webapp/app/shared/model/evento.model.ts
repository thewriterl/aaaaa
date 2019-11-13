import { Moment } from 'moment';

export interface IEvento {
  id?: number;
  nomeDoEvento?: string;
  descricao?: string;
  dataCadastro?: Moment;
  dataDoEvento?: Moment;
  endereco?: string;
  thumbnailContentType?: string;
  thumbnail?: any;
}

export class Evento implements IEvento {
  constructor(
    public id?: number,
    public nomeDoEvento?: string,
    public descricao?: string,
    public dataCadastro?: Moment,
    public dataDoEvento?: Moment,
    public endereco?: string,
    public thumbnailContentType?: string,
    public thumbnail?: any
  ) {}
}
