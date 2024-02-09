export interface PeriodeFestius {
  _id: string;
  data_ini: Date;
  motiu: string;
  fix: number;
}
export class PeriodeFestius implements PeriodeFestius {
  constructor(
    public id: string,
    public data_ini: Date,
    public motiu: string,
    public fix: number
  ) {
    this._id = id;
    this.data_ini = data_ini;
    this.motiu = motiu;
    this.fix = fix;
  }
}
