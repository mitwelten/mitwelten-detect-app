import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { DataService } from 'src/app/shared/data.service';
import { SpeciesDatum } from 'src/app/shared/species-datum';

interface SpeciesLabel {
  value: string;
  label_de: string;
  label_en: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  options?: EChartsOption;
  updateOptions?: EChartsOption;
  detailOptions?: EChartsOption;
  species: SpeciesDatum[] = [];
  chartInstance: any;

  initOpts = {
    height: 350
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSpecies().subscribe((species: SpeciesDatum[]) => {

      this.species = species;

      const x: SpeciesLabel[] = [];
      const y: number[] = [];

      species.forEach(s => {
        x.push({value:s.species, label_de: s.label_de, label_en: s.label_en});
        y.push(s.count);
      });

      this.options = {
        title: {
          text: 'Species'
        },
        color: '#673ab7',
        notMerge: true,
        legend: {
          show: false
        },
        tooltip: {},
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          },
        },
        dataZoom: [
          { type: 'inside', start: 0, end: 10 },
          { start: 0 }
        ],
        xAxis: {
          z: 5,
          data: x,
          silent: false,
          type: 'category',
          splitLine: {
            show: false,
          },
          axisTick: {
            alignWithLabel: true,
          },
          boundaryGap: true,
          axisLabel: {
            rotate: 90,
            inside: true,
            color: 'black',
            textBorderColor: 'white',
            textBorderWidth: 2,
            formatter: (value, index) => x[index+this.chartInstance.getOption().dataZoom[0].startValue].label_de
          },
        },
        yAxis: {
          name: 'Observations'
        },
        series: [
          {
            name: 'species',
            type: 'bar',
            data: y,
            animationDelay: (idx: number) => idx * 10,
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx: number) => idx * 5,
      };
    });
  }

  setInstance(event: any) {
    this.chartInstance = event;
  }

  showDetail(event: any) {
    this.dataService.getSpeciesDetail(event.name).subscribe((species: SpeciesDatum[]) => {

      const x: number[] = [];
      const y: Array<[number, number]> = [];

      species.forEach(s => {
        const ts = +(new Date(s.date));
        x.push(ts);
        y.push([ts, s.count]);
      });

      this.detailOptions = {
        title: {
          text: `${this.species[event.dataIndex].label_de} (${this.species[event.dataIndex].species})`,
        },
        color: '#673ab7',
        notMerge: true,
        legend: {
          data: ['species'],
          align: 'left',
          show: false
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => {
            const datum = params[0].value
            const date = new Date(datum[0]);
            return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' : ' + datum[1];
          },
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          { type: 'inside', start: 0 },
          { start: 0 }
        ],
        xAxis: {
          data: x,
          type: 'time',
        },
        yAxis: {
          name: 'Observations / Day'
        },
        series: [
          {
            name: 'count',
            type: 'bar',
            data: y,
            animationDelay: (idx: number) => idx * 10,
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx: number) => idx * 5,
      };
    });
  }

}
