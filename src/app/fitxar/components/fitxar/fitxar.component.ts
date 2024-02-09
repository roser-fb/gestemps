import { Component, OnDestroy } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { ApiResponse } from "src/app/shared/models/api-response.dto";
import { PeriodeTreball } from "../../models/periode-treball.dto";
import { FitxarService } from "../../services/fitxar.service";
import { TempsStoreService } from "../../services/temps-store.service";
@Component({
  selector: "app-fitxar",
  templateUrl: "./fitxar.component.html",
  styleUrls: ["./fitxar.component.css"],
})
export class FitxarComponent implements OnDestroy {
  temps = 0;
  isRunning = false;
  isPaused = false;
  cronometroSubscription: Subscription | undefined;

  public fitxa: PeriodeTreball;
  public today = new Date();
  public apiRes: ApiResponse;

  constructor(
    private fitxarService: FitxarService,
    private tmpsStoreService: TempsStoreService
  ) {
    this.fitxa = new PeriodeTreball("", "", "", 0, "");
    this.apiRes = new ApiResponse(false, false, "");
  }
  ngOnInit() {
    this.isRunning = this.tmpsStoreService.isTempRunning();
    this.isPaused = this.tmpsStoreService.isTempPaused();
    const temps = this.tmpsStoreService.getTmps();
    const data_inici_storage = this.tmpsStoreService.getTimeInit();
    this.fitxa.data_ini = data_inici_storage + "";
    if (this.isRunning) {
      if (temps) {
        this.temps = parseInt(temps) + this.calculaTemps(data_inici_storage);
      }
      this.cronometroSubscription = interval(1000).subscribe(() => {
        this.temps++;
      });
    }
    if (this.isPaused) {
      if (temps) {
        this.temps = parseInt(temps);
      }
    }
  }
  iniciarCronometre() {
    const data_aux = new Date().getTime() + 3600000;
    const data_ini = new Date(data_aux).toISOString();
    if (!this.isRunning) {
      this.isRunning = true;
      this.isPaused = false;
      this.fitxa.data_ini = data_ini.slice(0, 19).replace("T", " ");
      this.cronometroSubscription = interval(1000).subscribe(() => {
        this.temps++;
      });
      this.storeTempsInit();
    }
  }

  pausarCronometre() {
    if (this.isRunning) {
      this.isPaused = true;
      this.isRunning = false;
      this.fitxa.temps = this.temps;
      if (this.cronometroSubscription) {
        this.cronometroSubscription.unsubscribe();
      }
      this.storeTempsPause();
    }
  }

  finalitzarCronometre() {
    const data_aux = new Date().getTime() + 3600000;
    const data_fi = new Date(data_aux).toISOString();
    this.isRunning = false;
    this.isPaused = false;
    this.fitxa.data_fi = data_fi.slice(0, 19).replace("T", " ");
    this.fitxa.temps = this.temps;
    this.fitxarService.create(this.fitxa).subscribe((res) => {
      if (res.status == "ok") {
        this.apiRes.alertOK = true;
        setTimeout(() => {
          this.apiRes.alertOK = false;
        }, 1000);
      }
    });

    if (this.cronometroSubscription) {
      this.cronometroSubscription.unsubscribe();
      this.temps = 0;
    }
    this.storeTempsFin();
    location.reload();
  }

  ngOnDestroy() {
    this.finalitzarCronometre();
  }
  calculaTemps(data_inici_storage: string | null): number {
    const data_aux = new Date().getTime();
    let temps_ini = 0;
    let temps_aux = 0;
    if (data_inici_storage) {
      temps_ini = new Date(data_inici_storage).getTime();
    }
    temps_aux = parseInt(((data_aux - temps_ini) / 1000).toFixed(0));
    return temps_aux;
  }
  storeTempsInit() {
    this.tmpsStoreService.setRunningToken("true");
    this.tmpsStoreService.setTimeInit(this.fitxa.data_ini);
    this.tmpsStoreService.setTmps(this.temps);
    this.tmpsStoreService.setPausedToken("false");
  }
  storeTempsPause() {
    this.tmpsStoreService.setRunningToken("false");
    this.tmpsStoreService.setTmps(this.temps);
    this.tmpsStoreService.setPausedToken("true");
  }
  storeTempsFin() {
    this.tmpsStoreService.deleteRunningToken();
    this.tmpsStoreService.deletePausedToken();
    this.tmpsStoreService.deleteTimeInit();
    this.tmpsStoreService.deleteTmps();
  }
}
