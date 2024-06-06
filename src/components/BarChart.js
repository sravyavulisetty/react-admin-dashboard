import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box } from '@mui/material';
import { mockBarData } from '../data/mockData';
import '../index.css'
const BarChart = ({barheight, barwidth}) => {
    const svgRef = useRef();
    useEffect(() => {
        const margin = { top: 20, right: 30, bottom: 30, left: 40};
        const width = barwidth - margin.left - margin.right;
        const height = barheight - margin.top - margin.bottom;

        d3.select(svgRef.current).select('svg').remove();

        const svg = d3
            .select(svgRef.current)
            .append('svg')
            .attr('viewBox', `0 0 ${barheight} ${barwidth}`)
            .attr('preserveAspectRatio', 'none')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .call(responsiveBar)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

            function responsiveBar(svg) {
                const container = d3.select(svg.node().parentNode),
                    width = parseInt(svg.style('width'), 10),
                    height = parseInt(svg.style('height'), 10),
                    aspect = width / height;
                svg.attr('viewBox', `0 0 ${width} ${height}`).
                attr('preserveAspectRatio', 'xMinYMid').
                call(resize);
                 
                d3.select(window).on('resize.' + container.attr('id'), resize);
      
                function resize() {
                    const targetWidth = parseInt(container.style('width'));
                    svg.attr('width', targetWidth);
                    svg.attr('height', Math.round(targetWidth / aspect));
                }
            }
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
        .style('padding-top', '20')
        .style('font-size', '10px')
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
        .style('font-size', '10px')
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
        .style("opacity", 1)
        .style('box-shadow', '2px 2px')
        .style("background-color", "white")
        .style('border-radius', '4px')
        .style("padding-right", "5px")
        .style("padding-left", "5px")
        .style('pointer-events', 'none');
        
        const mouseover = function(event, d) {
            tooltip.style('opacity', 1);
        };

        const mousemove = function(event, d) {
            const formatter = d3.format(',');
            const category = d3.select(this.parentNode).datum().key;
            const value = d.data[category];
            const [mouseX, mouseY] = d3.pointer(event);
            tooltip.html(`${category}: ${formatter(value)}`)
                .style("top", (mouseY) + "px")
                .style("left", (mouseX) + "px");
        };

        const mouseleave = function(event, d) {
            tooltip.style('opacity', 0);
        };

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
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div ref={svgRef} style={{position: "relative", marginTop: '25px'}}></div>
            <div>
                <Box display='flex' gap='5px' alignItems='center'>
                    <div style={{width: '10px', height: '10px', backgroundColor: 'rgb(232, 193, 160)'}}></div>
                    <span style={{fontSize: "10px"}}>hotdog</span>
                </Box>
                <Box display='flex' gap='5px' alignItems='center'>
                    <div style={{width: '10px', height: '10px', backgroundColor: 'rgb(244, 117, 96)'}}></div>
                    <span style={{fontSize: "10px"}}>burger</span>
                </Box>
                <Box display='flex' gap='5px' alignItems='center'>
                    <div style={{width: '10px', height: '10px', backgroundColor: 'rgb(232, 168, 56)'}}></div>
                    <span style={{fontSize: "10px"}}>kebab</span>
                </Box>
                <Box display='flex' gap='5px' alignItems='center'>
                    <div style={{width: '10px', height: '10px', backgroundColor: 'rgb(151, 227, 213)'}}></div>
                    <span style={{fontSize: "10px"}}>donut</span>
                </Box>
            </div>
        </div>
    );
};
export default BarChart;
