export interface Guardia {
  id: string;
  data: Date;
  n_hores: number;
  festiu: number;
  motiu: number;
  user: string;
}
export class Guardia implements Guardia {
  constructor(
    public id: string,
    public data: Date,
    public n_hores: number,
    public festiu: number,
    public motiu: number,
    public user: string
  ) {
    this.id = id;
    this.data = data;
    this.n_hores = n_hores;
    this.festiu = festiu;
    this.motiu = motiu;
    this.user = user;
  }
}
export interface ResumGuardies {
  mes: string;
  lab_dies: number;
  lab_hores: number;
  fest_dies: number;
  fest_hores: number;
  preu: number;
}
export class ResumGuardies {
  constructor(
    public mes: string,
    public lab_dies: number,
    public lab_hores: number,
    public fest_dies: number,
    public fest_hores: number,
    public preu: number
  ) {
    this.mes = mes;
    this.lab_dies = lab_dies;
    this.lab_hores = lab_hores;
    this.fest_dies = fest_dies;
    this.fest_hores = fest_hores;
    this.preu = preu;
  }
}
