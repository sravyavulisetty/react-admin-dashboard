import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import * as d3 from 'd3';
import { mockPieData } from '../../data/mockData';
import Header from '../../components/Header';

const Pie = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("width", '100%')
      .attr("height", '100%')
      .attr("viewBox", `0 0 900 500`)
      .attr("preserveAspectRatio", "xMinYMin meet");

    const g = svg.append("g")
      .attr("transform", `translate(${850 / 2}, ${450 / 2})`);

    const radius = Math.min(850, 450) / 2 - 30;

    const totalValue = mockPieData.reduce((sum, data) => sum + data.value, 0);
    let percentageData = {};
    mockPieData.forEach((data) => {
      percentageData[data.id] = ((data.value / totalValue) * 100).toFixed(1);
    });

    const color = d3.scaleOrdinal(d3.schemeTableau10)
      .domain(mockPieData.map((data) => data.color));

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(80).outerRadius(radius);
    const arcHover = d3.arc().innerRadius(80).outerRadius(radius * 1.1);
    const labelRadius = radius * 0.7;
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
    const arcs = pie(mockPieData);

    const tooltip = d3.select("body").append("div")
      .attr("id", "tooltip")
      .style('color', 'black')
      .style("position", "absolute")
      .style("opacity", 0)
      .style('box-shadow', '2px 2px')
      .style("background-color", "white")
      .style('border-radius', '4px')
      .style("padding", "5px")
      .style('pointer-events', 'none');

    const mouseover = function(event, d) {
      d3.select(this).transition().duration(200).attr("d", arcHover(d));
      tooltip.style('opacity', 0.8);
    };

    const mousemove = function(event, d) {
      const [mouseX, mouseY] = d3.pointer(event);
      const formatter = d3.format(',');
      tooltip.html(`${d.data.label}: ${formatter(d.data.value)}`)
        .style("top", `${event.pageY + 10}px`)
        .style("left", `${event.pageX + 10}px`);
    };

    const mouseleave = function(event, d) {
      d3.select(this).transition().duration(200).attr("d", arc(d));
      tooltip.style('opacity', 0);
    };

    g.selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.id))
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);

    g.selectAll("text")
      .data(arcs)
      .enter()
      .append("text")
      .attr("transform", function(d) { 
        const [x, y] = arcLabel.centroid(d); 
        return `translate(${x}, ${y})`
      })
      .attr("text-anchor", "middle")
      .attr("font-size", 16)
      .attr("fill", "white")
      .text(d => `${percentageData[d.data.id]}%`);

    g.selectAll(".legend")
      .data(mockPieData)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${radius + 50}, ${-450 / 2 + i * 25 + 20})`)
      .each(function(d) {
        d3.select(this).append("circle")
          .attr("cx", 0)
          .attr("cy", 3)
          .attr("r", 9)
          .attr("fill", color(d.id));
        d3.select(this).append("text")
          .attr("x", 20)
          .attr("y", 5)
          .attr("font-size", 12)
          .attr("fill", "white")
          .attr("alignment-baseline", "middle")
          .text(d.id);
      });

    return () => {
      tooltip.remove();
    }

  }, []);

  return (
    <Box m='20px'>
      <Header title='PIE CHART' subtitle='Simple Pie Chart' />
      <svg ref={svgRef}></svg>
    </Box>
  );
}

export default Pie;



