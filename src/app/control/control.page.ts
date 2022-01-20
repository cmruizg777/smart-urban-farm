import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RealtimeService } from '../services/realtime/realtime.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {
  data = null;
  firebaseSubscription: Subscription;
  constructor(
    private realtime: RealtimeService
  ) {}
  ngOnInit() {
    this.getData();
  }
  getData(){
    this.firebaseSubscription = this.realtime.getLevelData('control/').subscribe((data: any) => {
      console.log(data);
      this.data = data;
    });
  }
  sendChange(){
    this.realtime.updateControlData(this.data);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.firebaseSubscription.unsubscribe();
  }

}
