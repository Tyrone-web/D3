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
        },
        {
            country: '主机主机主机主机主机主机主机主机主机主机',
            gdp: [
                [2000, 87340],
                [2001, 91590],
                [2002, 109800],
                [2003, 11020],
                [2004, 12550],
                [2005, 13710],
                [2006, 14560],
                [2007, 15560],
                [2008, 16490],
                [2009, 17350],
                [2010, 18950],
                [2011, 19050],
                [2012, 20370],
                [2013, 21980]
            ]
        },
        {
            country: 'korea',
            gdp: [
                [2000, 27340],
                [2001, 12890],
                [2002, 25800],
                [2003, 51020],
                [2004, 62550],
                [2005, 73710],
                [2006, 84560],
                [2007, 95560],
                [2008, 106490],
                [2009, 27350],
                [2010, 12550],
                [2011, 39350],
                [2012, 30370],
                [2013, 31880]
            ]
        }
    ]);

    useEffect(() => {
        const width = 600;
        const height = 300;

        const margin = {
            top: 30,
            right: 200,
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

        // 给所有的线条添加和legends交互相同的交互
        d3.selectAll('.linePath')
            .on('mouseover', function (event, d) {
                const currentColor = d3.select(this).attr('stroke');
                const currentRect = d.country;
                d3.selectAll('.linePath')
                    .attr('opacity', (d) => d.country !== currentRect ? '0.1' : 1);

                const gdp = d.gdp;
                d3.selectAll('circle')
                    .attr('opacity', circleData => {
                        let opacity = 0.1;
                        gdp.forEach(item => item === circleData ? opacity = 1 : 0.1);
                        return opacity;
                    });

            })
            .on('mouseout', function (event, d, i) {
                const lines = d3.selectAll('.linePath')._groups[0];
                lines.forEach((line, index) => {
                    line.setAttribute('opacity', 1);
                });

                const circles = d3.selectAll('circle')._groups[0];
                circles.forEach(circle => circle.setAttribute('opacity', 1));
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

        // 添加tooltip：在画布之外添加一个div元素作为提示的容器
        // attr方法只针对元素本身有的属性，当要设置样式的时候需要用到stye方法
        const toolTip = d3.select('.container')
            .append('div')
            .attr('class', 'tooltipDiv')

        // 添加图例
        const legendGroup = d3.select('.container')
            .append('div')
            .attr('class', 'legendDiv')
            .style('transform', `translate(30, ${mainGroupWidth})`)

        const legendUl = legendGroup.append('ul')
            .attr('class', 'legendUl');

        const legendLi = legendUl.selectAll('li')
            .data(dataset1)
            .enter()
            .append('li')
            .attr('class', 'legendLi')
            // .style('background-color', (d, i) => colors[i]);

        const legendRect = legendLi.insert('i')
            .attr('class', 'legend-rect')
            .style('background-color', (d, i) => colors[i]);

        const legentText = legendLi.append('span')
            .attr('class', 'legend-text')
            .attr('title', d => {
                return d.country.length > 6 ? d.country : '';
            })
            .text(d => d.country);




        // 给legends图例添加交互
        d3.selectAll('.legendLi')
            .on('mouseover', function (event, d, i) { //注意这里如果要使用回调函数中的this这里不能使用箭头函数
                const currentColor = d3.select(this).style('background-color');
                const currentRect = d.country;
                // 保留当前选中图例颜色对应颜色线条的样式，其它线条透明度设置为0.1
                d3.selectAll('.linePath')
                    .attr('opacity', (d, i) => {
                        // console.log(d, i);
                        return d.country !== currentRect ? '0.1' : 1;
                    });

                // 保留当前选中图例颜色对应颜色圆点(circle)的样式，其它圆点透明度设置为0.1
                const gdp = d.gdp;
                d3.selectAll('circle')
                    .attr('opacity', circleData => {
                        let opacity = 0.1;
                        gdp.forEach(item => item === circleData ? opacity = 1 : 0.1);
                        return opacity;
                    })
            })
            .on('mouseout', function (event, d, i) {
                // 重置所有线条的颜色为初始值
                const lines = d3.selectAll('.linePath')._groups[0];
                lines.forEach((line, index) => {
                    line.setAttribute('opacity', 1);
                });

                //  重置所有圆点（circle)的颜色为初始值
                const circles = d3.selectAll('circle')._groups[0];
                circles.forEach((circle, index) => circle.setAttribute('opacity', 1));
            });


        // 给圆点添加交互
        mainGroup.selectAll('circle')
            .on('mouseover', (event, d) => {
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

    }, [dataset1]);

    return (
        <div className="container"></div>
    );
}

export default LineChart;