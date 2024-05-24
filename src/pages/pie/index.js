import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import * as d3 from 'd3';
import { mockPieData } from '../../data/mockData';
import Header from '../../components/Header';

const Pie = () => {
  const radius = Math.min(900, 500) / 2 - 30;
  const svgRef = useRef();
  const [hoveredSlice, setHoveredSlice] = useState(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("width", 900)
      .attr("height", 500)
      .append("g")
      .attr("transform", `translate(${900 / 2}, ${500 / 2})`);

    const totalValue = mockPieData.reduce((sum, data) => sum + data.value, 0);
    let percentageData = {};
    mockPieData.forEach((data) => {
      percentageData[data.id] = ((data.value / totalValue) * 100).toFixed(1);
    });

    const color = d3.scaleOrdinal(d3.schemeTableau10)
      .domain(mockPieData.map((data) => data.color));
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(100).outerRadius(radius);
    const arcHover = d3.arc().innerRadius(100).outerRadius(radius * 1.1);
    const labelRadius = radius * 0.7;
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
    const arcs = pie(mockPieData);

    const tooltip = d3.select(svgRef.current)
    .append("div")
    .attr("id", "tooltip")
    .style('color', 'black')
    .style("position", "absolute")
    .style("opacity", 1)
    .style('box-shadow', '2px 2px')
    .style("background-color", "white")
    .style('border-radius', '4px')
    .style("padding", "5px")
    .style('pointer-events', 'none');

    svg.selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.id))
      .on("mouseenter", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", arcHover(d));
      })
      .on("mouseleave", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", arc(d));
      });

    svg.selectAll("text")
      .data(arcs)
      .enter()
      .append("text")
      .attr("transform", function(d){ const [x, y] = arcLabel.centroid(d); return `translate(${x}, ${y})`})
      .attr("text-anchor", "middle")
      .attr("font-size", 16)
      .attr("fill", "white")
      .text(d => `${percentageData[d.data.id]}%`);

    svg.selectAll(".legend")
      .data(mockPieData)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${radius + 50}, ${-500 / 2 + i * 25 + 20})`)
      .each(function(d) {
        d3.select(this).append("circle")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("r", 10)
          .attr("fill", color(d.id));
        d3.select(this).append("text")
          .attr("x", 20)
          .attr("y", 5)
          .attr("font-size", 14)
          .attr("fill", "white")
          .attr("alignment-baseline", "middle")
          .text(d.id);
      });
  }, [hoveredSlice]);

  return (
    <Box m='20px'>
      <Header title='PIE CHART' subtitle='Simple Pie Chart' />
      <svg ref={svgRef}></svg>
    </Box>
  );
}

export default Pie;

