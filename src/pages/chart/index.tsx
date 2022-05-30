/* eslint-disable react/no-unstable-nested-components */
import * as d3 from 'd3';
import { useState, useEffect } from 'react';
import Text from '../../components/text';
import Header from '../../components/header';
import Page from '../../components/page';
import Container from '../../components/container';
import BarChart from '../../components/barchart';
import {
  DonutInfo, ChartDimensions, Data, HistogramInfo,
} from '../../types/components';
import { populateHistogram, populateDonutChart } from './utils';
import DonutChart from '../../components/donutchart';
import { formatChartData } from '../../helpers';

function Chart() {
  const [
    histogramInfo, setHistogramInfo,
  ] = useState<HistogramInfo>({
    x: null, y: null, Y: [], data: [], thresholds: [],
  });
  const [donutInfo, setDonutInfo] = useState<DonutInfo>({
    arc: null, arcs: [], labelArcs: null, colorScale: null, allTimeTotal: 0,
  });

  const dimensions: ChartDimensions = {
    width: 600,
    height: 600,
    margin: {
      top: 30, left: 30, right: 30, bottom: 30,
    },
  };

  const yAccessorHistogram = (d: Data) => Number(d.label);
  const xAccessorHistogram = (d: Data) => Number(d.eventTime);

  const valueeAccessorPieChart = (d: Data) => Number(d.label);
  const labelAccessorPieChart = (d: Data) => Number(d.eventTime);

  useEffect(() => {
    d3.csv('./labels.csv').then((d) => {
      // populate histogram with data
      const formattedData = d.map(formatChartData) as Data[];
      const {
        Y, data, xscale, yscale, thresholds,
      } = populateHistogram(formattedData, dimensions, xAccessorHistogram, yAccessorHistogram);
      setHistogramInfo({
        x: xscale, y: yscale, data: data.filter((dt) => dt.length > 1), Y, thresholds,
      });

      // populate piechart with data
      const {
        arc, arcs, labelArcs, colorScale, allTimeTotal,
      } = populateDonutChart(
        formattedData,
        dimensions.width,
        dimensions.height,
        valueeAccessorPieChart,
        labelAccessorPieChart,
      );
      setDonutInfo({
        arc, arcs, labelArcs, colorScale, allTimeTotal,
      });
    });
  }, []);

  return (
    <Page>
      <Header />
      <Container fullWidth inline justifyContent="space-between" paddingTop="40px">
        <Container justifyContent="center" textAlign="center">
          {(histogramInfo.data.length > 1) && (
            <>
              <BarChart
                thresholds={histogramInfo.thresholds}
                y={histogramInfo.Y}
                dimensions={dimensions}
                data={histogramInfo.data}
                xScale={histogramInfo.x}
                yScale={histogramInfo.y}
                xAccessor={xAccessorHistogram}
                yAccessor={yAccessorHistogram}
              />
              <Text text="Histogram of values by minutes" />
              <Text light size="sm" variant="tertiary" text="Y Axis - frequency of label occurence" />
              <Text light size="sm" variant="tertiary" text="X Axis - Time in minutes" />
            </>
          )}
        </Container>
        <Container justifyContent="center" textAlign="center">
          {(donutInfo.arcs.length > 1) && (
            <>
              <DonutChart
                dimensions={dimensions}
                arc={donutInfo.arc}
                arcs={donutInfo.arcs}
                labelArcs={donutInfo.labelArcs}
                colorScale={donutInfo.colorScale}
                allTimeTotal={donutInfo.allTimeTotal}
              />
              <Text text="DonutChart of values" />
              <Text light size="sm" variant="tertiary" text="Cummulative occurence of label frequency in time (mins)" />
            </>
          )}
        </Container>
      </Container>
    </Page>
  );
}

export default Chart;
