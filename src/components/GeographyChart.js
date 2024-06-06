import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box } from '@mui/material';
import { mockGeographyData } from '../data/mockData';
import { geoFeatures } from '../data/mockGeoFeatures';

const GeographyChart = ({ geowidth, geoheight, showScale }) => {
  const [tooltip, setTooltip] = useState({ visible: false, value: null, country: null, color: null, x: 0, y: 0 });
  const svgRef = useRef();
  const wrapperRef = useRef();
  const [dimensions, setDimensions] = useState({ width: geowidth, height: geoheight });

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const { width } = wrapperRef.current.getBoundingClientRect();
        const aspectRatio = geowidth / geoheight;
        setDimensions({ width: Math.min(geowidth, width), height: Math.min(geoheight, width / aspectRatio) });
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [geowidth, geoheight]);

  const colorCategories = {
    '0-110k': [0, 110000, 'rgb(242, 248, 254)'],
    '110k-220k': [110000, 220000, 'rgb(232, 241, 250)'],
    '220k-330k': [220000, 330000, 'rgb(211, 228, 243)'],
    '330k-440k': [330000, 440000, 'rgb(190, 216, 236)'],
    '440k-560k': [440000, 560000, 'rgb(170, 207, 230)'],
    '560k-670k': [560000, 670000, 'rgb(90, 162, 207)'],
    '670k-780k': [670000, 780000, 'rgb(56, 135, 193)'],
    '780k-890k': [780000, 890000, 'rgb(16, 89, 160)'],
    '890k-1.0M': [890000, 1000000, 'rgb(8, 59, 123)']
  };

  const categorizeColor = (value) => {
    for (let i in colorCategories) {
      let [min, max] = colorCategories[i];
      if (value >= min && value < max) {
        return i;
      }
    }
    return null;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num;
  };

  const values = mockGeographyData.map((region) => region.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const colorScale = d3.scaleSequential()
    .domain([minValue, maxValue])
    .interpolator(d3.interpolateBlues);

  const projection = d3
    .geoMercator()
    .scale(dimensions.width / 2 / Math.PI)
    .translate([dimensions.width / 2, dimensions.height / 2]);

  const geoPathGenerator = d3.geoPath().projection(projection);

  const handleMouseOver = (event, regionData, shape) => {
    const { clientX, clientY } = event;
    setTooltip({ visible: true, value: regionData?.value, country: shape.properties.name, color: categorizeColor(regionData?.value) ? colorCategories[categorizeColor(regionData?.value)][2] : '', x: clientX, y: clientY });
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setTooltip((tooltip) => ({ ...tooltip, x: clientX, y: clientY }));
  };

  const handleMouseOut = () => {
    setTooltip({ visible: false, value: null, x: 0, y: 0 });
  };

  const allSvgPaths = geoFeatures.features
    .filter((shape) => shape.id !== 'ATA')
    .map((shape) => {
      const regionData = mockGeographyData.find((region) => region.id === shape.id);
      const color = regionData ? colorScale(regionData?.value) : 'lightgrey';

      return (
        <path
          key={shape.id}
          d={geoPathGenerator(shape)}
          stroke="lightGrey"
          strokeWidth={0.5}
          fill={color}
          fillOpacity={1}
          onMouseOver={(event) => handleMouseOver(event, regionData, shape)}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
        />
      );
    });

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "10px", gap:'15px' }} ref={wrapperRef}>
        <svg ref={svgRef} width={dimensions.width} height={dimensions.height}>
          {allSvgPaths}
        </svg>
        <Box>
          {showScale && Object.keys(colorCategories).map(category => (
            <Box key={category} display="flex" alignItems="center">
              <div style={{
                width: '14px',
                height: '14px',
                backgroundColor: colorCategories[category][2],
                marginRight: '14px'
              }}></div>
              <span style={{ fontSize: "12px", color: "lightgray" }}>{`${category}`}</span>
            </Box>
          ))}
        </Box>
      </div>
      {tooltip.visible && (
        <div
          style={{
            position: 'absolute',
            top: `${tooltip.y + 10}px`,
            left: `${tooltip.x + 10}px`,
            backgroundColor: 'white',
            color: 'black',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
            padding: "5px",
            borderRadius: '4px',
            pointerEvents: 'none',
            opacity: 1
          }}
        >
          {tooltip.value !== undefined ?
            <div style={{ display: 'flex', alignItems: "center", gap: "5px" }}>
              <svg width='12' height='12'>
                <rect width='12' height='12' fill={tooltip.color}></rect>
              </svg>
              {tooltip.country} <span style={{ fontWeight: "bold" }}>{formatNumber(tooltip.value)}</span>
            </div>
            : ''}
        </div>
      )}
    </>
  );
};

export default GeographyChart;

