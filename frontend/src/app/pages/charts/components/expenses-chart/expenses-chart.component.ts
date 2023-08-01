import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import MonthDTO from 'src/app/shared/DTOs/month';
import { Subject, map } from 'rxjs';
import ExpenseChartData from 'src/app/shared/interfaces/ExpenseChartData';
import { AnalyticsService } from 'src/app/shared/services/analytics/analytics.service';
import { Palette } from 'src/app/shared/enums/Palette';

const SAMPLE_DATA: ChartData<'scatter'> = {
  labels: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
  ],
  datasets: [
    {
      data: [3, 0, 4, 5],
      label: 'Janeiro',
    },
    {
      data: [4, 4, 4, 0],
      label: 'Fevereiro',
    },
  ],
}

@Component({
  selector: 'app-expenses-chart',
  templateUrl: './expenses-chart.component.html',
  styleUrls: ['./expenses-chart.component.scss']
})
export class ExpensesChartComponent {
  @Input() set months(months: MonthDTO[] | null) {
    if(months?.length) this.getData(months.map(({ id }) => id))
  }
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective
  options: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    color: Palette.tertiary,
    scales: {
      x: {
        ticks: {
          callback: value => value, // impedes float decimal point
          stepSize: 1,
          color: Palette.tertiary,
        },
        title: {
          display: true,
          text: 'Dia',
          color: Palette.tertiary,
        }
      },
      y: {
        ticks: {
          stepSize: 1,
          color: Palette.tertiary,
        },
        title: {
          display: true,
          text: 'Registros',
          color: Palette.tertiary,
        }
      },
    },
    elements: {
      line: {
        tension: 0.25,
      },
      point: {
        radius: 4,
        hoverRadius: 7,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Gastos ao Longo do Mês',
        color: Palette.tertiary,
        font: {
          size: 20,
        },
      },
      datalabels: {
        color: 'black',
        font: {
          size: 16,
        },
        formatter: () => null,
      },
      tooltip: {
        callbacks: {
          title: ([ firstPoint ]) => 'Dia ' + firstPoint.label.padStart(2, '0'),
          label: ({ parsed }) => parsed.y + ' registro' + (parsed.y != 1 ? 's' : ''),
        },
      },
    },
  }
  data$ = new Subject<ExpenseChartData>()
  plugins = [DataLabelsPlugin]

  constructor(
    private analyticsService: AnalyticsService,
  ) {}

  getData(months: MonthDTO['id'][]): void {
    this.analyticsService.expenseChart(months).pipe(
      map(({ data }) => data)
    ).subscribe(data => this.data$.next(data))
  }
}
