import { Component } from "@angular/core";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Observable } from "rxjs";
import { PeriodeDisponible } from "../../models/periode-disponible.dto";
import { DisponibleService } from "../../services/disponible.service";

@Component({
  selector: "app-resum-disp",
  templateUrl: "./resum-disp.component.html",
  styleUrls: ["./resum-disp.component.css"],
})
export class ResumDispComponent {
  faTrashCan = faTrashCan;
  public today = new Date();
  public llista_periodes$: Observable<PeriodeDisponible[]> = new Observable<
    PeriodeDisponible[]
  >();
  constructor(private periodeVacancesService: DisponibleService) {}

  ngOnInit() {
    this.llista_periodes$ =
      this.periodeVacancesService.getPeriodeDisponibleByYear(
        this.today.getFullYear()
      );
    this.periodeVacancesService.submitEvent.subscribe(() => {
      location.reload();
    });
  }
  esborra(id: string): void {
    this.periodeVacancesService.delete(id).subscribe((res) => {
      if (res.status == "ok") {
        location.reload();
      }
    });
  }
}
