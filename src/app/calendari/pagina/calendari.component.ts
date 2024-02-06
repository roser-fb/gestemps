import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendariService } from 'src/app/calendari/services/calendari.service';

import { CalendarOptions, EventInput } from '@fullcalendar/core'; 
import multiMonthPlugin  from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap5';
import listPlugin from '@fullcalendar/list';


@Component({
  selector: 'app-calendari',
  templateUrl: './calendari.component.html',
  styleUrls: ['./calendari.component.css']
})
export class CalendariComponent {
  public llista_events$: Observable<EventInput[]> = new Observable<EventInput[]>();
  constructor(private eventsService: CalendariService) {
  }
  calendarVisible = signal(true);
  calendarOptions: CalendarOptions = {

      plugins: [
        interactionPlugin,
        dayGridPlugin,
        multiMonthPlugin,
        listPlugin, 
        bootstrapPlugin,
      ], headerToolbar: {
        left: 'today',
        center: 'title',
        right: 'prevYear,nextYear',
       
      },  buttonText:{
        today:'HUI',
        prevYear:'<',
        nextYear:'>'
      },
      //navLinks: false,
      themeSystem: 'standard',
      initialView: 'multiMonthYear',
      initialEvents: [],
      weekends: true,
      selectable: true,
      locale: 'ca',
      firstDay: 1,

     
  };
  
  ngOnInit(){
    this.llista_events$ = this.eventsService.getPeriodeVacances();
    this.llista_events$.subscribe(events =>{
      events.forEach((event)=>{  
        event.allDay=true;
        event.textColor='#fff';

        let titol = event.title;
        if(titol?.includes('Nadal')){
          event.textColor='#000';
          event.color='#EDD3F3';
        }else if(titol?.includes('Pascua')){
          event.color='#BD9CCD';
          event.textColor='#000';
        }else if(titol?.includes('Nac')){
          event.color='#5B3970';
        }else if(titol?.includes('Aut')){
          event.color='#DBBBE4';
          event.textColor='#000';
        }else if(titol?.includes('Loc')){
          event.color='#A17EB0';
        }else if(titol?.includes('GUARD')){
          event.color='#C2817C';
        }else{
          event.color='#EAB59E';
          event.textColor='#000';
        }
      });
      this.calendarOptions.events = events
    } );
  }
  
 
}
