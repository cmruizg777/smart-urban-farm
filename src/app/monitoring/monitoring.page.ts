import { Component, OnInit, ViewChild } from '@angular/core';
import { RealtimeService } from '../services/realtime/realtime.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.page.html',
  styleUrls: ['./monitoring.page.scss'],
})
export class MonitoringPage implements OnInit {

  @ViewChild('Chart') barChart;
  tab = 'luminosidad';

  history = {
    temperatura : {
      nivel1: []
    },
    humedadr: {
      nivel1: []
      
    },
    humedads:  {
      nivel1: []
    
    },
    luminosidad:  {
      nivel1: []
    
    },
  };

  bars: any;
  colorArray: any;

  constructor(
    private realtime: RealtimeService
  ) {}
  ionViewDidEnter() {
    setTimeout(() => {
      this.createBarChart();
      this.getData();
      //this.appendData(null);
    }, 0);
  }
  appendData(newData, counter = 0){
    /*
    setTimeout(() => {
      if (this.bars.data.datasets[0].data.length===10){
        this.bars.data.labels.shift();
        this.bars.data.datasets[0].data.shift();
      }
      const label = this.getTimeString();
      this.bars.data.labels.push(label);
      const data = Math.sin(2*Math.PI*Number(0.125)*(counter));
      this.bars.data.datasets[0].data.push(data);
      this.bars.update();
      counter++;
      this.appendData(counter);
    },250);
    */
    const label = this.getTimeString();
    this.bars.data.labels.push(label);
    //const data = Math.sin(2*Math.PI*Number(0.125)*(counter));
    const data = newData;
   switch(this.tab){
    case 'luminosidad':
      if (this.history.luminosidad.nivel1.length===10){
        this.bars.data.labels.shift();
        this.history.luminosidad.nivel1.shift();
        
      }
      this.history.luminosidad.nivel1.push(data.nivel1);
    
      this.bars.data.datasets[0].data = this.history.luminosidad.nivel1.slice();
      
      break;
      case 'humedads':
        if (this.history.humedads.nivel1.length===10){
          this.bars.data.labels.shift();
          this.history.humedads.nivel1.shift();
         
        }
        this.history.humedads.nivel1.push(data.nivel1);
        this.bars.data.datasets[0].data = this.history.humedads.nivel1.slice();
        
        break;
      case 'humedadr':
        if (this.history.humedads.nivel1.length===10){
          this.bars.data.labels.shift();
          this.history.humedadr.nivel1.shift();
          
        }
        this.history.humedadr.nivel1.push(data.nivel1);
        
        this.bars.data.datasets[0].data = this.history.humedadr.nivel1.slice();
        
        break;
      case 'temperatura':
        if (this.history.temperatura.nivel1.length===10){
          this.bars.data.labels.shift();
          this.history.temperatura.nivel1.shift();
          
        }
        this.history.temperatura.nivel1.push(data.nivel1);
       
        this.bars.data.datasets[0].data = this.history.temperatura.nivel1.slice();
      
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
            data: this.history.luminosidad.nivel1,
            //backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            //borderWidth: 1
          },
          
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
    this.realtime.getLevelData(this.tab).subscribe((data: any) => {
      console.log(data);
      this.appendData(data);
    });
  }
  changeTab(tab: string){
    this.tab = tab;
    this.getData();
  }
}
