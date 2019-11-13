export interface IIngresso {
  id?: number;
  codigoReferencia?: string;
}

export class Ingresso implements IIngresso {
  constructor(public id?: number, public codigoReferencia?: string) {}
}
