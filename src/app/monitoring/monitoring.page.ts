/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit, ViewChild } from '@angular/core';
import { RealtimeService } from '../services/realtime/realtime.service';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.page.html',
  styleUrls: ['./monitoring.page.scss'],
})
export class MonitoringPage implements OnInit {

  @ViewChild('Chart') barChart;
  tab = 'nivel';

  history = {
    nivel : {
      nivel1: [],
      labels: []
    },
    temp: {
      nivel1: [],
      labels: []
    },
    tds:  {
      nivel1: [],
      labels: []
    },
    ph:  {
      nivel1: [],
      labels: []
    },
  };
  currentValue1 = 0;
  currentState1 = "";
  bars: any;
  colorArray: any;
  firebaseSubscription: Subscription;
  constructor(
    private realtime: RealtimeService
  ) {}
  ionViewDidEnter() {
    setTimeout(() => {
      this.createBarChart();
      this.getData();
      this.getCurrentState();
      //this.appendData(null);
    }, 0);
  }
  appendData(newData, counter = 0){
    const label = this.getTimeString();
    this.bars.data.labels.push(label);
    //const data = Math.sin(2*Math.PI*Number(0.125)*(counter));
    const data = newData;
    this.currentValue1 = data;
   switch(this.tab){
    case 'nivel':
      if (this.history.nivel.nivel1.length===10){
        this.history.nivel.labels.shift();
        this.history.nivel.nivel1.shift();
      }
      this.history.nivel.nivel1.push(data);
      this.history.nivel.labels.push(label);
      this.bars.data.labels = this.history.nivel.labels.slice();
      this.bars.data.datasets[0].data = this.history.nivel.nivel1.slice();
      break;
    case 'ph':
        if (this.history.ph.nivel1.length===10){
          this.history.ph.labels.shift();
          this.history.ph.nivel1.shift();
        }
        this.history.ph.nivel1.push(data);
        this.history.ph.labels.push(label);
        this.bars.data.labels = this.history.ph.labels.slice();
        this.bars.data.datasets[0].data = this.history.ph.nivel1.slice();
        break;
      case 'tds':
        if (this.history.tds.nivel1.length===10){
          this.history.tds.labels.shift();
          this.history.tds.nivel1.shift();
        }
        this.history.tds.nivel1.push(data);
        this.history.tds.labels.push(label);
        this.bars.data.labels = this.history.tds.labels.slice();
        this.bars.data.datasets[0].data = this.history.tds.nivel1.slice();
        break;
      case 'temp':
        if (this.history.temp.nivel1.length===10){
          this.history.temp.labels.shift();
          this.history.temp.nivel1.shift();
        }
        this.history.temp.nivel1.push(data);
        this.history.temp.labels.push(label);
        this.bars.data.labels = this.history.temp.labels.slice();
        this.bars.data.datasets[0].data = this.history.temp.nivel1.slice();
        break;
   }
    this.bars.update();
  }
  getTimeString(){
    const date = new Date();
    return `${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
  }
  createBarChart(){

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Nivel1',
            data: this.history.nivel.nivel1,
            //backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            //borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  ngOnInit(){
    //this.getData();
    //this.appendData();
  }
  async getData(){
    let path = ''+this.tab.trim();
    this.firebaseSubscription = this.realtime.getLevelData(path).subscribe((data: any) => {
      console.log(data, this.tab);
      this.appendData(data);
    });
  }
  async getCurrentState(){
    let path = 'estado';
    this.firebaseSubscription = this.realtime.getLevelData(path).subscribe((data: any) => {
      this.currentState1 = data[0];
    });
  }
  changeTab(tab: string){
    this.tab = tab;
    this.firebaseSubscription.unsubscribe();
    this.getData();
    this.getCurrentState();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.firebaseSubscription.unsubscribe();
  }
}
