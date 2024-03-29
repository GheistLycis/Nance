import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import MonthDTO from '@DTOs/month';
import { Subject, map } from 'rxjs';
import { TagChartData } from '@interfaces/TagChartData';
import { RoundPipe } from '@pipes/round/round.pipe';
import { AnalyticsService } from '@services/analytics/analytics.service';
import { Palette } from '@enums/Palette';
import HexToRgba from '@classes/HexToRgba';


@Component({
  selector: 'app-tags-chart',
  templateUrl: './tags-chart.component.html',
  styleUrls: ['./tags-chart.component.scss'],
  providers: [RoundPipe]
})
export class TagsChartComponent {
  @Input() set months(months: MonthDTO[] | null) {
    if(months?.length) this.getData(months.map(({ id }) => id))
  }
  options: ChartConfiguration<'bar'>['options'] = {
    aspectRatio: 1.3,
    indexAxis: 'y',
    color: Palette.tertiary,
    scales: {
      x: {
        ticks: {
          color: Palette.tertiary,
          font: {
            family: 'Overpass',
          },
        },
        title: {
          display: true,
          text: 'R$',
          color: Palette.tertiary,
          font: {
            family: 'Overpass',
          },
        }
      },
      y: {
        ticks: {
          color: Palette.tertiary,
          font: {
            family: 'Overpass',
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Ranking de Tags',
        color: Palette.tertiary,
        font: {
          size: 20,
          family: 'Overpass',
        },
      },
      legend: {
        labels: {
          boxHeight: 0,
          boxWidth: 0,
          font: {
            family: 'Overpass',
          },
        },
      },
      datalabels: {
        color: Palette.tertiary,
        font: {
          size: 12,
          weight: 700,
          family: 'Overpass',
        },
        formatter: (value): string => value ? this.roundPipe.transform(value, 2) : null,
      },
      tooltip: {
        callbacks: {
          label: ({ dataset, raw }) => dataset.label + ': R$ ' + this.roundPipe.transform(raw as number, 2),
        },
        titleFont: {
          family: 'Overpass',
        },
        bodyFont: {
          family: 'Overpass',
        }
      },
    },
  }
  data$ = new Subject<TagChartData>()
  plugins = [DataLabelsPlugin]

  constructor(
    private analyticsService: AnalyticsService,
    private roundPipe: RoundPipe,
  ) { }

  getData(months: MonthDTO['id'][]): void {
    this.analyticsService.tagChart(months).pipe(
      map(({ data }) => {
        const { tags, datasets } = data
        
        return {
          labels: tags.map(({ name }) => name),
          datasets: datasets.map(({ data, label }) => ({
              data,
              label,
              backgroundColor: tags.map(({ color }) => HexToRgba.convert(color, 0.5)),
              borderColor: tags.map(({ color }) => color)
            }))
        }
      })
    ).subscribe(data => this.data$.next(data))
  }
}
