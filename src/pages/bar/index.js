import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import { mockBarData } from '../../data/mockData';
import '../../index.css';
const Bar = () => {
    const svgRef = useRef();

    useEffect(() => {
        const margin = { left: 70, right: 20, top: 10, bottom: 30 };
        const width = 1000 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        d3.select(svgRef.current).select('svg').remove();

        const svg = d3
            .select(svgRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const keys = ['hotdog', 'burger', 'kebab', 'donut'];
        const stack = d3.stack().keys(keys);
        const stackedSeries = stack(mockBarData);

        const xScale = d3.scaleBand()
            .domain(mockBarData.map(d => d.country))
            .range([0, width])
            .padding(0.2);

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).tickSize(0).tickPadding(6));
        
        svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .style('fill', 'white')
        .text("Countries");
    

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(mockBarData, d => d.hotdog + d.burger + d.kebab + d.donut)])
            .range([height, 0]);

        svg.append('g')
            .call(d3.axisLeft(yScale).ticks(6).tickSize(0).tickPadding(8))
            .call(g => g.select('.domain').remove());
        
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("fill", 'white')
        .text("Food Consumption");

        const colorScale = d3.scaleOrdinal()
            .domain(keys)
            .range(["rgb(232, 193, 160)", 'rgb(244, 117, 96)','rgb(232, 168, 56)', 'rgb(151, 227, 213)']);

        const GridLine = d3.axisLeft(yScale).tickSize(-width).tickFormat('');
        svg.append('g').attr('class', 'grid-line').call(GridLine);

        const tooltip = d3.select(svgRef.current)
        .append("div")
        .attr("id", "tooltip")
        .style('color', 'black')
        .style("position", "absolute")
        .style("opacity", 0)
        .style('box-shadow', '2px 2px')
        .style("background-color", "white")
        .style('border-radius', '4px')
        .style('z-index', '1000')
        .style("padding", "5px");
        
        const mouseover = function(event, d) {
            tooltip.style('opacity', 0.8);
        };

        const mousemove = function(event, d) {
            const formatter = d3.format(',');
            const category = d3.select(this.parentNode).datum().key;
            const value = d.data[category];
            const [mouseX, mouseY] = d3.pointer(event);
            tooltip.html(`${category}: ${formatter(value)}`)
                .style("top", (mouseY + 25) + "px")
                .style("left", (mouseX + 25) + "px");
        };

        const mouseleave = function(event, d) {
            tooltip.style('opacity', 0);
        };

        svg.append('rect')
        .attr('width', '15')
        .attr('height', '15')
        .attr('x', (margin.left)*9)
        .attr('y',  -(margin.top/2))
        .style('fill', 'rgb(232, 193, 160)');

        svg.append('text')
        .style('font-size', '10px')
        .attr("x", ((margin.left)*9)+20)
        .style('fill', 'white')
        .style('font-size', '12')
        .attr("y", (-(margin.top/4) + 10))
        .text('hotdog')

        svg.append('rect')
        .attr('width', '15')
        .attr('height', '15')
        .attr('x', (margin.left)*10.2)
        .attr('y',  -(margin.top/2))
        .style('fill', 'rgb(244, 117, 96)');

        svg.append('text')
        .style('font-size', '10px')
        .attr("x", ((margin.left)*10.2)+20)
        .style('fill', 'white')
        .style('font-size', '12')
        .attr("y", (-(margin.top/4) + 10))
        .text('burger')

        svg.append('rect')
        .attr('width', '15')
        .attr('height', '15')
        .attr('x', (margin.left)*11.4)
        .attr('y',  -(margin.top/2))
        .style('fill', 'rgb(232, 168, 56)');

        svg.append('text')
        .style('font-size', '10px')
        .attr("x", ((margin.left)*11.4)+20)
        .style('fill', 'white')
        .style('font-size', '12')
        .attr("y", (-(margin.top/4) + 10))
        .text('kebab')

        svg.append('rect')
        .attr('width', '15')
        .attr('height', '15')
        .attr('x', (margin.left)*12.5)
        .attr('y',  -(margin.top/2))
        .style('fill', 'rgb(151, 227, 213)');

        svg.append('text')
        .style('font-size', '10px')
        .attr("x", ((margin.left)*12.5)+20)
        .style('fill', 'white')
        .style('font-size', '12')
        .attr("y", (-(margin.top/4) + 10))
        .text('donut')

        svg.append('g')
            .selectAll('g')
            .data(stackedSeries)
            .enter().append('g')
            .attr('fill', d => colorScale(d.key))
            .selectAll('rect')
            .data(d => d)
            .enter().append('rect')
            .attr('x', d => xScale(d.data.country))
            .attr('y', d => yScale(d[1]))
            .attr('height', d => yScale(d[0]) - yScale(d[1]))
            .attr('width', xScale.bandwidth())
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave)
    }, []);

    return (
        <Box m="20px">
            <Header title="BAR CHART" subtitle="Simple Bar Chart"></Header>
            <div ref={svgRef} style={{position: "relative"}}></div>
        </Box>
    );
};

export default Bar;
