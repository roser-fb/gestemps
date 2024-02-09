export interface PeriodeVacances {
  _id: string;
  data_ini: Date;
  data_fi: Date;
  motiu: string;
  num_dies: number;
  user: string;
}
export class PeriodeVacances implements PeriodeVacances {
  constructor(
    public id: string,
    public data_ini: Date,
    public data_fi: Date,
    public motiu: string,
    public num_dies: number,
    public user: string
  ) {
    this._id = id;
    this.data_ini = data_ini;
    this.data_fi = data_fi;
    this.motiu = motiu;
    this.num_dies = num_dies;
    this.user = user;
  }
}
export interface ResumVacances {
  num_disf_vacances: number;
  num_disf_ld: number;
  num_sol_vacances: number;
  num_sol_ld: number;
}
export class ResumVacances implements ResumVacances {
  constructor(
    public num_disf_vacances: number,
    public num_disf_ld: number,
    public num_sol_vacances: number,
    public num_sol_ld: number
  ) {}
}
