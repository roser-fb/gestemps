import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { EventInput } from "@fullcalendar/core";
import { DateInput } from "fullcalendar";
import { UserStoreService } from "src/app/user/services/user-store.service";

@Injectable({
  providedIn: "root",
})
export class CalendariService {
  private user: string | null;
  constructor(
    private userStoreService: UserStoreService,
    private http: HttpClient
  ) {
    this.user = userStoreService.getUserId();
  }
  getPeriodeVacances(): Observable<EventInput[]> {
    return this.http.get<EventInput[]>("/api/calendari/" + this.user).pipe(
      map((data: EventInput[]) => {
        const esdevenimentsModificats: EventInput[] = [];
        let esdv_next: EventInput = {};
        let esdv_last: EventInput = {};

        const currentYear: number = new Date().getFullYear();
        for (const esdv of data) {
          if (esdv.id) {
            esdv_next.id = currentYear + 1 + esdv.id;
            esdv_next.title = esdv.title;

            esdv_last.id = currentYear - 1 + esdv.id;
            esdv_last.title = esdv.title;
          }

          let data_start: string | undefined =
            esdv.start?.toLocaleString("en-US");
          let data_end: string | undefined = esdv.end?.toLocaleString("en-US");

          let start_date_current: Date;
          let end_date_current: Date;

          let start_date_next: Date;
          let end_date_next: Date;

          let start_date_last: Date;
          let end_date_last: Date;

          if (data_start && data_end) {
            start_date_current = new Date(data_start);
            start_date_next = new Date(data_start);
            start_date_last = new Date(data_start);
          
            end_date_current = new Date(data_end);
            end_date_next = new Date(data_end);
            end_date_last = new Date(data_end);

            if (start_date_current.getFullYear() == 2020) {
              start_date_current.setFullYear(currentYear);
              start_date_next.setFullYear(currentYear + 1);
              start_date_last.setFullYear(currentYear - 1);

              esdv.start =
                start_date_current.toISOString();
              esdv_next.start =
                start_date_next.toISOString();
              esdv_last.start =
                start_date_last.toISOString();

              end_date_current.setFullYear(currentYear);
              end_date_next.setFullYear(currentYear + 1);
              end_date_last.setFullYear(currentYear - 1);

              esdv.end =
                end_date_current.toISOString();
              esdv_next.end =
                end_date_next.toISOString();
              esdv_last.end =
                end_date_last.toISOString();

              esdevenimentsModificats.push(esdv_next);
              esdevenimentsModificats.push(esdv_last);
            }
            esdv_next = {};
            esdv_last = {};
          }
          esdevenimentsModificats.push(esdv);
        }
        console.log(esdevenimentsModificats);
        return esdevenimentsModificats;
      })
    );
  }
}
