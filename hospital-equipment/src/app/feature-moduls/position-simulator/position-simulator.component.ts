import { Component, OnInit } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-position-simulator',
  templateUrl: './position-simulator.component.html',
  styleUrls: ['./position-simulator.component.css'],
})
export class PositionSimulatorComponent implements OnInit {
  private socket$: WebSocketSubject<any>;
  private socketUrl = 'ws://localhost:8081/mywebsockets';
  locations: Location[] = [];

  constructor() {
    this.socket$ = new WebSocketSubject({ url: this.socketUrl });
  }

  stompClient = Stomp.client('ws://localhost:8081/mywebsockets');

  ngOnInit(): void {
    //this.stompClient.onConnect()
    // this.stompClient.activate();
    // this.stompClient.subscribe('/location-updates', (res) => {
    //   console.log(res);
    // });

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/location-updates', (res) => {
        console.log(res.body);
      });
    });
  }

  public connect(): void {
    this.socket$.next({
      /* your message data */
    });
  }
}
