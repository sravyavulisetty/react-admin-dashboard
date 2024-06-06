import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { mockLineData } from '../data/mockData';

const LineChart = ({ linewidth, lineheight, cutoffwidth, cutoffheight }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = linewidth - cutoffwidth;
    const height = lineheight - cutoffheight;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scalePoint()
      .domain(mockLineData[0].data.map(d => d.x))
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(mockLineData.flatMap(d => d.data.map(dataPoint => dataPoint.y)))])
      .nice()
      .range([innerHeight, 0]);

    const colorScale = d3.scaleOrdinal()
      .domain(mockLineData.map(d => d.id))
      .range(mockLineData.map(d => d.color));

    const yTicks = d3.range(0, d3.max(mockLineData.flatMap(d => d.data.map(datapoint => datapoint.y))) + 100, 100)
    
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.append('g')
      .call(d3.axisLeft(yScale).tickValues(yTicks));

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    const lines = g.selectAll('.line-group')
      .data(mockLineData)
      .enter()
      .append('g')
      .attr('class', 'line-group');

    lines.append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.data))
      .attr('stroke', d => colorScale(d.id))
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('color', 'black')
      .style('box-shadow', '2px 2px')
      .style('border-radius', '5px')
      .style('padding', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    lines.each(function (d) {
      d3.select(this).selectAll('.data-point')
        .data(d.data)
        .enter()
        .append('circle')
        .attr('class', 'data-point')
        .attr('cx', dataPoint => xScale(dataPoint.x))
        .attr('cy', dataPoint => yScale(dataPoint.y))
        .attr('r', 6)
        .attr('fill', d.color)
        .on('mouseover', (event, dataPoint) => {
          tooltip.transition().duration(200).style('opacity', 1);
          tooltip.html(`
            <div style="display: flex; align-items: center;">
              <div style="width: 13px; height: 13px; background-color: ${d.color}; margin-right: 5px;"></div>
              <div>
                <strong>x:</strong> ${dataPoint.x}, 
                <strong>y:</strong> ${dataPoint.y}
              </div>
            </div>`)
            .style('left', `${event.pageX + 5}px`)
            .style('top', `${event.pageY - 28}px`);
        })
        .on('mousemove', (event) => {
          tooltip.style('left', `${event.pageX + 5}px`)
            .style('top', `${event.pageY - 28}px`);
        })
        .on('mouseout', () => {
          tooltip.transition().duration(500).style('opacity', 0);
        });
    });
    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + 10) +")")
        .style("text-anchor", "middle")
        .style('fill', 'white')
        .style('font-size', '14px')
        .text("Transportation");

    
    svg.append('rect')
        .attr('width', '14')
        .attr('height', '14')
        .attr("transform", "translate(" + (width + 10) + " ," + (height - 150) + ")")
        .style('fill', 'rgb(76, 206, 172)');

    svg.append('text')
        .style('font-size', '10px')
        .style('fill', 'white')
        .style('font-size', '12')
        .attr("transform", "translate(" + (width + 35) + " ," + (height - 140) + ")")
        .text('Japan')
    svg.append('rect')
        .attr('width', '14')
        .attr('height', '14')
        .attr("transform", "translate(" + (width + 10) + " ," + (height - 130) + ")")
        .style('fill', 'rgb(164, 169, 252)');
    svg.append('text')
        .style('font-size', '10px')
        .style('fill', 'white')
        .style('font-size', '12')
        .attr("transform", "translate(" + (width + 35) + " ," + (height - 120) + ")")
        .text('France')
    svg.append('rect')
        .attr('width', '14')
        .attr('height', '14')
        .attr("transform", "translate(" + (width + 10) + " ," + (height - 110) + ")")
        .style('fill', 'rgb(241, 185, 183)');
    svg.append('text')
        .style('font-size', '10px')
        .attr("transform", "translate(" + (width + 35) + " ," + (height - 100) + ")")
        .style('fill', 'white')
        .style('font-size', '12')
        .text('USA')

    return () => {
      tooltip.remove();
    };
  }, [linewidth, lineheight]);

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${linewidth} ${lineheight}`}
        preserveAspectRatio="xMinYMid meet"
        style={{ width: '100%', height: 'auto' }}
      ></svg>
    </div>
  );
};

export default LineChart;
