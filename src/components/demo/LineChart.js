import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
    const [dataset, SetDataset] = useState([3, 7, 2, 9, 5, 12]);

    useEffect(() => {
        const width = 500;
        const height = 300;

        const margin = {
            top: 30,
            right: 20,
            bottom: 20,
            left: 40
        }

        const mainGroupWidth = width - margin.left - margin.right;
        const mainGroupHeight = height - margin.top - margin.bottom;

        const svg = d3.select('.container')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const mainGroup = svg.append('g')
            .attr('class', 'mainGropu')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xScale = d3.scaleBand()
            .domain(d3.range(dataset.length))
            .range([0, mainGroupWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([mainGroupHeight, 0]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        const gXAxis = mainGroup.append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0, ${mainGroupHeight})`)
            .call(xAxis);

        const gYAxis = mainGroup.append('g')
            .attr('class', 'xAxis')
            .call(yAxis);

        const line_generator = d3.line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d));


        const path = mainGroup.append('path')
            .attr('d', line_generator(dataset))
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2);
    }, [dataset]);

    return (
        <div className="container"></div>
    );
}

export default LineChart;