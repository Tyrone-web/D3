import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
    const [dataset, SetDataset] = useState([3, 7, 2, 9, 5, 12]);
    const [dataset1, SetDataset1] = useState([
        {
            country: 'china',
            gdp: [
                [2000, 11920],
                [2001, 13170],
                [2002, 14550],
                [2003, 16500],
                [2004, 19440],
                [2005, 22870],
                [2006, 27930],
                [2007, 35040],
                [2008, 45470],
                [2009, 51050],
                [2010, 59490],
                [2011, 73140],
                [2012, 83860],
                [2013, 103550]
            ]
        },
        {
            country: 'japan',
            gdp: [
                [2000, 47340],
                [2001, 41590],
                [2002, 39800],
                [2003, 43020],
                [2004, 46550],
                [2005, 45710],
                [2006, 43560],
                [2007, 43560],
                [2008, 48490],
                [2009, 50350],
                [2010, 54950],
                [2011, 59050],
                [2012, 59370],
                [2013, 48980]
            ]
        }
    ]);

    useEffect(() => {
        const width = 400;
        const height = 300;

        const margin = {
            top: 30,
            right: 100,
            bottom: 30,
            left: 50
        }

        const svg = d3.select('.container').append('svg')
            .attr('class', 'svg1')
            .attr('width', width)
            .attr('height', height);

        const mainGroupWidth = width - margin.left - margin.right;
        const mainGroupHeight = height - margin.top - margin.bottom;

        const mainGroup = svg.append('g')
            .attr('class', 'mainGroup')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // 计算GDP的最大值
        let gdpMax = 0;
        for (let i = 0; i < dataset1.length; i++) {
            const currentGdp = d3.max(dataset1[i].gdp, d => d[1]);
            gdpMax = currentGdp > gdpMax ? currentGdp : gdpMax;
        }

        const xSclae = d3.scaleLinear()
            .domain([2000, 2013])
            .range([0, mainGroupWidth]);
        const yScale = d3.scaleLinear()
            .domain([0, gdpMax]) // 这里需要变动？？
            .range([mainGroupHeight, 0]);

        const line_generator = d3.line()
            .x(d => xSclae(d[0]))
            .y(d => yScale(d[1]))
            .curve(d3.curveBasis);

        const colors = d3.schemeCategory10;

        mainGroup.selectAll('path')
            .data(dataset1)
            .enter()
            .append('path')
            .attr('class', 'linePath')
            .attr('d', d => line_generator(d.gdp))
            // .attr('d', line_generator(dataset1.gdp)) // 这里不能这样写
            .attr('fill', 'none')
            .attr('stroke', (d, i) => colors[i])
            .attr('stroke-width', 2);

        const xAxis = d3.axisBottom(xSclae)
            .ticks(7)
            .tickFormat((d3.format('d')))

        const yAxis = d3.axisLeft(yScale)
            .ticks(5);

        const gXAxis = mainGroup.append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0, ${mainGroupHeight})`)
            .call(xAxis);

        const gYAxis = mainGroup.append('g')
            .attr('class', 'yAxis')
            .call(yAxis);

        const legendGroup = mainGroup.append('g')
            .attr('class', 'legendGroup')

        const rects = legendGroup.selectAll('rect')
            .data(dataset1)
            .enter()
            .append('rect')
            .attr('class', 'legendRect')
            .attr('fill', (d, i) => colors[i])
            .attr('width', 25)
            .attr('height', 3)
            .attr('x', `${mainGroupWidth + 15}`)
            .attr('y', (d, i) => i * 15);

        mainGroup.selectAll('.legendRect')
            .on('mouseover', (event, d) => {
                console.log('test');
                const currentRect = d.country;
                // d3.selectAll('.linePath')
                //     .attr('stroke', (d, i) => {
                //         if (d.country !== currentRect) {

                //             // console.log(colors[i]);
                //             // return 'gray';
                //         }
                //     });
            });

        const textGroup = mainGroup.append('g')
            .attr('class', 'textGroup');

        const text = textGroup.selectAll('text')
            .data(dataset1)
            .enter()
            .append('text')
            .attr('x', mainGroupWidth + 45)
            .attr('y', (d, i) => i * 15 + 5)
            .attr('text-anchor', 'start')
            .text(d => d.country)
        
        const circleGropu = mainGroup.selectAll('circle')
            .data(dataset1[0].gdp)
            .enter()
            .append('circle')
            .attr('fill', 'steelblue');


    }, [dataset1]);

    // useEffect(() => {
    //     const width = 500;
    //     const height = 300;

    //     const margin = {
    //         top: 30,
    //         right: 20,
    //         bottom: 20,
    //         left: 40
    //     }

    //     const mainGroupWidth = width - margin.left - margin.right;
    //     const mainGroupHeight = height - margin.top - margin.bottom;

    //     const svg = d3.select('.container')
    //         .append('svg')
    //         .attr('width', width)
    //         .attr('height', height);

    //     const mainGroup = svg.append('g')
    //         .attr('class', 'mainGropu')
    //         .attr('transform', `translate(${margin.left}, ${margin.top})`);

    //     const xScale = d3.scaleLinear()
    //         .domain([0, dataset.length - 1])
    //         .range([0, mainGroupWidth]);

    //     const yScale = d3.scaleLinear()
    //         .domain([0, d3.max(dataset)])
    //         .range([mainGroupHeight, 0]);

    //     const xAxis = d3.axisBottom(xScale);
    //     const yAxis = d3.axisLeft(yScale);

    //     const gXAxis = mainGroup.append('g')
    //         .attr('class', 'xAxis')
    //         .attr('transform', `translate(0, ${mainGroupHeight})`)
    //         .call(xAxis);

    //     const gYAxis = mainGroup.append('g')
    //         .attr('class', 'xAxis')
    //         .call(yAxis);

    //     const line_generator = d3.line()
    //         .x((d, i) => xScale(i))
    //         .y(d => yScale(d));


    //     const path = mainGroup.append('path')
    //         .attr('d', line_generator(dataset))
    //         .attr('fill', 'none')
    //         .attr('stroke', 'steelblue')
    //         .attr('stroke-width', 2);
    // }, [dataset]);

    return (
        <div className="container"></div>
    );
}

export default LineChart;