import { useEffect, useRef } from 'react';
import {
  axisBottom, axisLeft, select,
} from 'd3';
import { BarChartProps } from '../../types/components';
import Container from '../container';

function BarChart({
  y,
  data,
  xScale,
  yScale,
  thresholds,
  dimensions,
}: BarChartProps) {
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    const xAxis = axisBottom(xScale).tickFormat((d) => {
      const date = new Date(Number(d));
      const hours = date.getUTCHours();
      const minutes = date.getMinutes();
      return `${hours === 0 ? '00' : hours}:${minutes === 0 ? '00' : minutes}`;
    }).tickValues(thresholds);
    const yAxis = axisLeft(yScale);

    svg
      .style('width', `${dimensions.width}px`);

    // draw x and y scales
    svg
      .select('.x-axis')
      .style('stroke', '#AEAEAE')
      .style('color', '#AEAEAE')
      .style('font-weight', 400)
      .style('font-size', '10px')
      .style('width', `${dimensions.width - 2 * dimensions.margin.left}px`)
      .style(
        'transform',
        `translate(${dimensions.margin.left}px, 
        ${dimensions.height - dimensions.margin.top}px)`,
      )
      .call(xAxis);

    svg
      .select('.y-axis')
      .style('width', `${dimensions.width - dimensions.margin.left}px`)
      .style('font-weight', 400)
      .style('font-size', '10px')
      .style('stroke', '#AEAEAE')
      .style('color', '#AEAEAE')
      .style(
        'transform',
        `translate(${dimensions.margin.left}px,
            ${dimensions.margin.top}px)`,
      )
      .call(yAxis);
    // rendering the data with d3
    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('fill', '#3a956c')
      .attr('x', (d) => xScale(d.x0) + dimensions.margin.left)
      .attr('y', (d, i) => yScale(y[i]) + dimensions.margin.top)
      .attr('width', (d) => Math.max(0, xScale(d.x1) - xScale(d.x0)))
      .attr('height', (d, i) => yScale(0) - yScale(y[i]));
  }, [data, dimensions]);

  return (
    <Container>
      <svg ref={svgRef} width={`${dimensions.width}px`} height={`${dimensions.height}px`}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </Container>
  );
}

export default BarChart;
