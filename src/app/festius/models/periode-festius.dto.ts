export interface PeriodeFestius {
  id:number;
  data_ini: Date;
  motiu: string;
  fix:number;
}
export class PeriodeFestius implements PeriodeFestius {
  constructor(
    public id: number,
    public data_ini: Date,
    public motiu: string,
    public fix:number
  ) {
    this.id=id;
    this.data_ini=data_ini;
    this.motiu=motiu;
    this.fix=fix;
  }
}
