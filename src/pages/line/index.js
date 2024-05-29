import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { mockLineData } from '../../data/mockData';
import Header from '../../components/Header';

const LineChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 900;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    svg.selectAll('*').remove();


    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('color', 'black')
      .style('box-shadow', '2px 2px')
    //   .style('border', '1px solid #d3d3d3')
      .style('border-radius', '5px')
      .style('padding', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

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

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.append('g')
      .call(d3.axisLeft(yScale));

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    const lines = g.selectAll('.line')
      .data(mockLineData)
      .attr('d', d => line(d.data))
      .enter()
      .append('g')
      .attr('class', 'line-group')

    lines.append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.data))
      .attr('stroke', d => colorScale(d.id))
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    lines.each(function(d) {
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
            const color = d.color;
            const [mouseX, mouseY] = d3.pointer(event);
            tooltip.html(`
            <div style="display: flex; align-items: center;">
            <div style="width: 13px; height: 13px; background-color: ${color}; margin-right: 5px;"></div>
            <div>
              <strong>x:</strong> ${dataPoint.x},
              <strong>y:</strong> ${dataPoint.y}
            </div>
          </div>`)
              .style('left', (mouseX + 5) + 'px')
              .style('top', (mouseY - 28) + 'px');
          })
          .on('mousemove', (event) => {
            tooltip.style('left', (event.pageX + 5) + 'px')
              .style('top', (event.pageY - 28) + 'px');
          })
          .on('mouseout', () => {
            tooltip.transition().duration(500).style('opacity', 0);
          });
      });

    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + 10) + ")")
        .style("text-anchor", "middle")
        .style('fill', 'white')
        .style('padding', '20px')
        .text("Transportation");
    
    svg.append('rect')
        .attr('width', '15')
        .attr('height', '15')
        .attr("transform", "translate(" + (width + 10) + " ," + (height - 200) + ")")
        .style('fill', 'rgb(76, 206, 172)');

    svg.append('text')
        .style('font-size', '10px')
        .style('fill', 'white')
        .style('font-size', '12')
        .attr("transform", "translate(" + (width + 35) + " ," + (height - 187) + ")")
        .text('Japan')
    svg.append('rect')
        .attr('width', '15')
        .attr('height', '15')
        .attr("transform", "translate(" + (width + 10) + " ," + (height - 170) + ")")
        .style('fill', 'rgb(164, 169, 252)');
    svg.append('text')
        .style('font-size', '10px')
        .style('fill', 'white')
        .style('font-size', '12')
        .attr("transform", "translate(" + (width + 35) + " ," + (height - 157) + ")")
        .text('France')
    svg.append('rect')
        .attr('width', '15')
        .attr('height', '15')
        .attr("transform", "translate(" + (width + 10) + " ," + (height - 140) + ")")
        .style('fill', 'rgb(241, 185, 183)');
    svg.append('text')
        .style('font-size', '10px')
        .attr("transform", "translate(" + (width + 35) + " ," + (height - 129) + ")")
        .style('fill', 'white')
        .style('font-size', '12')
        .text('USA')
    
    return (()=>{
        tooltip.remove();
    })
  }, []);

  return (
    <div style={{ overflow: 'hidden', margin:"20px" }}>
      <Header title='Line Chart' subtitle='Simple Line Chart'></Header>
      <svg ref={svgRef} width="100%" height="600" style={{marginLeft: "50px"}}></svg>
    </div>
  );
};

export default LineChart;

