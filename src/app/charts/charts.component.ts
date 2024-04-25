import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements AfterViewInit {

  @ViewChild('myChart') myChart!: ElementRef;
  @Input() pendingTasks!: any[];
  @Input() completedTasks!: any[];
  @Input() cancelledTasks!: any[];
  constructor(){
    Chart.register(...registerables);
   }

 

   ngAfterViewInit(): void {
    console.log('Pending Tasks:', this.pendingTasks);
    console.log('Completed Tasks:', this.completedTasks);
    console.log('Cancelled Tasks:', this.cancelledTasks);
    this.renderChart();
  }

  renderChart(){
    const ctx = this.myChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Pending', 'Completed', 'Cancelled'],
        datasets: [{
          data: [
            this.pendingTasks.length,
            this.completedTasks.length,
            this.cancelledTasks.length
          ],
          backgroundColor: [
            'orange',
            'green',
            'red'
          ]
        }]
      },
      options: {
        responsive: true
      }
    });
 }
}
