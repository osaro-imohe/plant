import { select } from 'd3';
import { useEffect, useRef } from 'react';
import { DonutChatProps } from '../../types/components';
import Container from '../container';

function DonutChart({
  arc,
  arcs,
  colorScale,
  labelArcs,
  allTimeTotal,
  dimensions,
}: DonutChatProps) {
  const svgRef = useRef<any>();
  useEffect(() => {
    const svg = select(svgRef.current);

    svg.append('g')
      .attr('class', 'donut-container')
      .attr('transform', `translate(${dimensions.width / 2}, ${dimensions.height / 2})`)
      .selectAll('path')
      .data(arcs)
      .join('path')
      .style('stroke', 'white')
      .style('stroke-width', 2)
      .style('fill', (d) => colorScale!(`${d.data.minute}`))
      .attr('d', arc);

    const totalContainer = svg.append('g')
      .attr('transform', `translate(${dimensions.height / 2}, ${dimensions.width / 2})`)
      .style('width', dimensions.width)
      .style('height', dimensions.height);

    totalContainer.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .text(`All time total: ${allTimeTotal}`);

    const text = svg.append('g')
      .attr('class', 'lablels-container')
      .attr('transform', `translate(${dimensions.width / 2},${dimensions.height / 2})`)
      .selectAll('text')
      .data(arcs)
      .join('text')
      .attr('transform', (d) => `translate(${labelArcs!.centroid(d)})`)
      .attr('text-anchor', 'middle');

    text.selectAll('tspan')
      .data((d) => {
        const date = new Date(Number(d.data.minute));
        const hours = date.getUTCHours();
        const minutes = date.getMinutes();
        return ([
          `${hours}:${minutes}`,
          `${d.data.label}`,
        ]);
      })
      .join('tspan')
      .attr('x', 0)
      .style('font-family', 'sans-serif')
      .style('font-size', 12)
      .style('font-weight', (d, i) => (i ? undefined : 'bold'))
      .style('fill', '#222')
      .attr('dy', (d, i) => (i ? '1.2em' : 0))
      .text((d) => d);
  }, [dimensions, arcs]);
  return (
    <Container>
      <svg ref={svgRef} width={`${dimensions.width}px`} height={`${dimensions.height}px`} />
    </Container>
  );
}

export default DonutChart;
