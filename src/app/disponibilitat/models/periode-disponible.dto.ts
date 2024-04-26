export interface PeriodeDisponible {
  id: string;
  data_ini: Date;
  data_fi: Date;
  motiu: string;
  num_dies: number;
  user: string;
}
export class PeriodeDisponible implements PeriodeDisponible {
  constructor(
    public id: string,
    public data_ini: Date,
    public data_fi: Date,
    public motiu: string,
    public num_dies: number,
    public user: string
  ) {
    this.id = id;
    this.data_ini = data_ini;
    this.data_fi = data_fi;
    this.motiu = motiu;
    this.num_dies = num_dies;
    this.user = user;
  }
}
