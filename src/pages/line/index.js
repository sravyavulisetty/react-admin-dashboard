import React from 'react'
import * as d3 from 'd3';
import { mockLineData } from '../../data/mockData'
const Line = () => {
    const transformDataForStackedArea = (data) => {
        const uniqueXValues = Array.from(new Set(data.flatMap(d => d.data.map(item => item.x))));
        const stackedData = uniqueXValues.map(x => {
          const stackedItem = { x };
          data.forEach(d => {
            const foundItem = d.data.find(item => item.x === x);
            stackedItem[d.id] = foundItem ? foundItem.y : 0;
          });
          return stackedItem;
        }); 
        return stackedData;
      };
      const stackedData = transformDataForStackedArea(mockLineData); 
      const stack = d3
      .stack()
      .keys(['plane', 'helicopter', 'boat', 'train', 'subway', 'bus', 'car', 'moto', 'bicycle', 'horse', 'skateboard', 'others'])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);
      const stackedValues = stack(stackedData);
      

  return (
    <div>
      
    </div>
  )
}

export default Line
