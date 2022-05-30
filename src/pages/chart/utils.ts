import * as d3 from 'd3';
import { Bin, timeMinutes } from 'd3';
import {
  ChartDimensions, Data, PieMap,
} from '../../types/components';

export const populateHistogram = (
  csvData: Data[],
  dimensions: ChartDimensions,
  // eslint-disable-next-line no-unused-vars
  xAccessorHistogram: (d: Data) => number,
  // eslint-disable-next-line no-unused-vars
  yAccessorHistogram: (d: Data) => number,
) => {
  const X0 = d3.map(csvData, xAccessorHistogram);
  const Y0 = d3.map(csvData, yAccessorHistogram);
  const I = d3.range(X0.length);
  const datetimextent = d3.extent(csvData, xAccessorHistogram) as [number, number];
  const thresholds = timeMinutes(
    new Date(datetimextent[0] as number),
    new Date(datetimextent[1] as number),
  );

  // .thresholds(thresholds).value((i) => X0[i])(I)
  const bin = d3.bin()
    .domain(datetimextent as [number, number])
    .thresholds(thresholds)
    .value((i) => X0[i])(I) as Bin<number, number>[];

  const xMin = bin[0].x0 as number;
  const xMax = bin[bin.length - 1].x1 as number;

  const xscale = d3.scaleTime()
    .domain([xMin, xMax])
    .range([0, dimensions.width - (dimensions.margin.left + dimensions.margin.right)]);

  const Y = Array.from(bin, (v) => d3.sum(v, (i) => Y0[i]));

  const yMax = d3.max(Y);

  const yscale = d3.scaleLinear()
    .domain([0, Number(yMax)])
    .range([(dimensions.height - (dimensions.margin.top + dimensions.margin.top)), 0])
    .nice();

  return {
    data: bin, Y, xscale, yscale, datetimextent, thresholds,
  };
};

export const populateDonutChart = (
  csvData: Data[],
  width: number,
  height: number,
  // eslint-disable-next-line no-unused-vars
  valueeAccessorDonutChart: (d: Data) => number,
  // eslint-disable-next-line no-unused-vars
  labelAccessorDonutChart: (d: Data) => number,
) => {
  let allTimeTotal = 0;
  const pieMapArr: PieMap[] = [];
  const datetimextent = d3.extent(csvData, labelAccessorDonutChart) as [number, number];
  const thresholds = timeMinutes(
    new Date(datetimextent[0] as number),
    new Date(datetimextent[1] as number),
  );
  const xScale = d3.scaleTime()
    .domain(d3.extent(csvData, labelAccessorDonutChart) as [number, number])
    .range([0, width]);

  const domain = xScale.domain();
  const bin = d3.bin()
    .domain([Number(domain[0]), Number(domain[1])])
    .value(labelAccessorDonutChart)
    .thresholds(thresholds);

  const data = bin(csvData).filter((d) => d.length > 1);

  data.forEach((d) => {
    const pieMap: PieMap = { label: 0, minute: 0 };
    const minute = Math.floor(Number(d.x0)).toString();
    // eslint-disable-next-line max-len
    const occurences = d.reduce((total: number, obj) => Number(obj.label) + total, 0);
    pieMap.label = occurences;
    pieMap.minute = Number(minute);
    pieMapArr.push(pieMap);
    allTimeTotal += occurences;
  });

  const colors = ['#976393', '#685489', '#43457f', '#ff9b83'];

  const colorScale = d3.scaleOrdinal(pieMapArr.map((d) => d.minute), colors);
  const arc = d3.arc().innerRadius(0.5 * (height / 2)).outerRadius(0.85 * (height / 2));
  const pie = d3.pie().value((d) => d.label);
  const labelArcs = d3.arc().innerRadius(0.95 * (height / 2)).outerRadius(0.95 * (height / 2));
  const arcs = pie(pieMapArr);

  return {
    arc, arcs, colorScale, labelArcs, allTimeTotal,
  };
};
