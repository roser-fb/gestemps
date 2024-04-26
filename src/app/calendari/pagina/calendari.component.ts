import { Component, signal } from "@angular/core";
import { Observable } from "rxjs";
import { CalendariService } from "src/app/calendari/services/calendari.service";

import { CalendarOptions, EventInput } from "@fullcalendar/core";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrapPlugin from "@fullcalendar/bootstrap5";
import listPlugin from "@fullcalendar/list";

@Component({
  selector: "app-calendari",
  templateUrl: "./calendari.component.html",
  styleUrls: ["./calendari.component.css"],
})
export class CalendariComponent {
  public llista_events$: Observable<EventInput[]> = new Observable<
    EventInput[]
  >();
  constructor(private eventsService: CalendariService) {}
  calendarVisible = signal(true);
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      multiMonthPlugin,
      listPlugin,
      bootstrapPlugin,
    ],
    headerToolbar: {
      left: "today",
      center: "title",
      right: "prevYear,nextYear",
    },
    buttonText: {
      today: "HUI",
      prevYear: "<",
      nextYear: ">",
    },
    //navLinks: false,
    themeSystem: "standard",
    initialView: "multiMonthYear",
    initialEvents: [],
    weekends: true,
    selectable: true,
    locale: "ca",
    firstDay: 1,
  };

  ngOnInit() {
    this.llista_events$ = this.eventsService.getPeriodeVacances();
    this.llista_events$.subscribe((events) => {
      events.forEach((event) => {
        event.allDay = true;

        event.textColor = "#000";
        let titol = event.title;
        let user = event["user"];
        if (titol?.includes("Vacances") || titol?.includes("LD")) {
          event.color = "#80cfa8";
        } else if (titol?.includes("GUARDIA")) {
          event.color = "#f4c93d";
        } else if (titol?.includes("65c35a5159d33117334282ae")) {
          event.title = "Roser";
          event.color = "#f4c93d";
        } else if (titol?.includes("662b9aec35d178a02c38bbff")) {
          event.title = "Clara";
          event.color = "#f4c93d";
        } else if (titol?.includes("662b9b1235d178a02c38bc05")) {
          event.title = "Irene";
          event.color = "#f4c93d";
        } else {
          event.color = "#efa7a7";
          event.display = "background";
        }
      });
      this.calendarOptions.events = events;
    });
  }
}
