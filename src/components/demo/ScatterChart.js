import React, { useEffect } from 'react';
import * as d3 from 'd3';

const ScatterChart = () => {

    useEffect(() => {
        const dataset = [
            [0.5, 0.5],
            [0.7, 0.8],
            [0.4, 0.9],
            [0.11, 0.32],
            [0.88, 0.25],
            [0.75, 0.12],
            [0.5, 0.1],
            [0.2, 0.3],
            [0.4, 0.1],
            [0.6, 0.7]
        ];

        //定义画布的宽高
        const width = 400;
        const height = 300;
        const svg = d3.select('.ScatterChart').append('svg')
            .attr('width', width)
            .attr('height', height);

        // 定义画布和实际绘画区域的间距
        const margin = {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
        }

        // 定义实际绘画区域的宽高
        const mainGroupWidth = width - margin.left - margin.right;
        const mainGroupHeight = height - margin.top - margin.bottom;

        const mainGroup = svg.append('g')
            .attr('class', 'mainGroup')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // 定义比例尺
        const xScale = d3.scaleLinear()
            .domain([0, 1.2 * d3.max(dataset, d => d[0])])
            .range([0, mainGroupWidth]);
        const yScale = d3.scaleLinear()
            .domain([0, 1.2 * d3.max(dataset, d => d[1])])
            .range([mainGroupHeight, 0]);

        console.log(xScale(0.5));
        console.log(yScale(0.5));

        // 定义坐标轴
        const xAxis = d3.axisBottom().scale(xScale);
        const yAxis = d3.axisLeft().scale(yScale);

        const gXAxis = mainGroup.append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(${margin.left}, ${mainGroupHeight})`)

        const gYAxis = mainGroup.append('g')
            .attr('class', 'yAxis')
            .attr('transform', `translate(${margin.left}, 0)`)

        // 渲染坐标轴
        gXAxis.call(xAxis);
        gYAxis.call(yAxis);

        // 将数据和circle选择集绑定
        const circles = mainGroup.selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('class', 'circle')
            .attr('cx', d => margin.left + xScale(d[0]))
            .attr('cy', d => height - margin.bottom - yScale(d[1]))
            .attr('r', 5)
            .attr('fill', 'steelblue')
    }, [])

    return (
        <div className="ScatterChart"></div>
    );
}

export default ScatterChart
