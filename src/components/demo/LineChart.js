import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

import './lineChart.css';

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
            .domain([0, gdpMax]) // 这里gdpMax * 1.1 ?
            .range([mainGroupHeight, 0]);

        const line_generator = d3.line()
            .x(d => xSclae(d[0]))
            .y(d => yScale(d[1]))
        // .curve(d3.curveMonotoneY);

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

        // 给legends图例添加交互
        d3.selectAll('.legendRect')
            .on('mouseover', function (event, d) { //注意这里如果要使用箭头函数这里不能使用箭头函数
                const currentColor = d3.select(this).attr('fill');
                const currentRect = d.country;
                // 保留当前选中图例颜色对应颜色线条的样式，其它线条透明度设置为0.2
                d3.selectAll('.linePath')
                    .attr('opacity', (d) => d.country !== currentRect ? '0.2' : 1);

                d3.selectAll('circle')
                    .attr('opacity', (d) => {
                        console.log(d);
                        // return d.country !== currentRect ? '0.2' : 1
                        return 1;
                    });
                // 保留当前选中图例颜色的circle的样式，其它circle的透明度设置为0.2
                // const circles = d3.selectAll('circle');
                // console.log(circles);
                // const currentCircles = document.getElementsByTagName('circle');
                // const circleArray = Array.from(currentCircles)
                // circles._groups[0].forEach((circle, index) => {
                //     circle.attr('opacity', circleData => {
                //         console.log(circleData);
                //         return 1;
                //     })
                // });
                d3.selectAll('circle')
                    .attr('opacity', '0.2');
            })
            .on('mouseout', function (event, d, i) {
                // 重置所有线条的颜色为初始值
                const lines = d3.selectAll('.linePath')._groups[0];
                lines.forEach((line, index) => {
                    line.setAttribute('opacity', 1);
                });
            });

        // 给所有的线条添加和legends交互的内容相同
        d3.selectAll('.linePath')
            .on('mouseover', function (event, d) {
                const currentColor = d3.select(this).attr('stroke');
                const currentRect = d.country;
                d3.selectAll('.linePath')
                    .attr('opacity', (d) => d.country !== currentRect ? '0.1' : 1);
            })
            .on('mouseout', function (event, d, i) {
                const lines = d3.selectAll('.linePath')._groups[0];
                lines.forEach((line, index) => {
                    line.setAttribute('opacity', 1);
                });
            });

        // 给每条线添加添加点
        let circleData = [];
        dataset1.forEach((item, index) => {
            circleData.push(item.gdp);
        });

        circleData.forEach((data, index) => {
            mainGroup.selectAll(`circle${index}`) // 这里需要选择一个空的集合，否则后面的选择集会覆盖前面的集合导致指挥显示最后一次的选择集
                .data(data)
                .enter()
                .append('circle')
                .attr('class', `circle${index}`) // 给圆点添加类名
                .attr('cx', d => xSclae(d[0]))
                .attr('cy', d => yScale(d[1]))
                .attr('r', 3)
                .attr('fill', colors[index]);
        });

        // 添加tooltip 在画布之外添加一个div元素作为提示的容器
        // attr方法只整队元素本身有的属性，当要设置样式的时候需要用到stye方法
        const toolTip = d3.select('.container')
            .append('div')
            .attr('class', 'tooltipDiv')


        mainGroup.selectAll('circle')
            .on('mouseover', (event, d) => {
                console.log(event);
                toolTip
                    .html(
                        `
                            <span>时间：${d[0]}</span><br />
                            <span>异常点：${d[1]}</span><br />
                            <span>状态：正常</span>
                        `
                    )
                    .style('opacity', 1)
                    .style('left', `${event.pageX}px`)
                    .style('top', `${event.pageY + 20}px`) // 这里+20是为了让tooltip在鼠标箭头的下方
            })
            .on('mouseout', () => {
                toolTip.style('opacity', 0); // 隐藏tooltip
            })

        const textGroup = mainGroup.append('g')
            .attr('class', 'textGroup');

        const text = textGroup.selectAll('text')
            .data(dataset1)
            .enter()
            .append('text')
            .attr('x', mainGroupWidth + 45)
            .attr('y', (d, i) => i * 15 + 5)
            .attr('text-anchor', 'start')
            .text(d => d.country);


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