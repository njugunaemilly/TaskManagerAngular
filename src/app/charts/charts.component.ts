import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements AfterViewInit {
  @ViewChildren('chartCanvas') chartCanvases!: QueryList<ElementRef>;
  @Input() pendingTasks!: any[];
  @Input() completedTasks!: any[];
  @Input() cancelledTasks!: any[];
  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    if (this.chartCanvases && this.chartCanvases.length > 0) {
      this.renderChart('pie', this.chartCanvases.toArray()[0], 'pieChart');
      this.renderChart('bar', this.chartCanvases.toArray()[1], 'barChart');
    } else {
      console.error('No chart canvases found.');
    }
  }

  renderChart(type: any, canvas: ElementRef, id: any) {
    if (!canvas) {
      console.error('Canvas element is not available.');
      return;
    }
    const ctx = canvas.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: type,
      data: {
        labels: ['Pending', 'Completed', 'Cancelled'],
        datasets: [
          {
            data: [
              this.pendingTasks.length,
              this.completedTasks.length,
              this.cancelledTasks.length,
            ],
            backgroundColor: ['blue', 'green', 'red'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
