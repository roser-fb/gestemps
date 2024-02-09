export interface PeriodeTreball {
  _id: string;
  data_ini: string;
  data_fi: string;
  temps: number;
  user: string;
}
export class PeriodeTreball implements PeriodeTreball {
  constructor(
    public id: string,
    public data_ini: string,
    public data_fi: string,
    public temps: number,
    public user: string
  ) {
    this._id = id;
    this.data_ini = data_ini;
    this.data_fi = data_fi;
    this.temps = temps;
    this.user = user;
  }
}
