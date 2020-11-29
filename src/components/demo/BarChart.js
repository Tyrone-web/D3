import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
    const data = [10, 20, 30, 40, 33, 24, 12, 5];
    const [dataset, setDataSet] = useState(data);

    const handleSort = () => {
        const newDataSet = dataset.sort((a, b) => a - b)
        setDataSet([...newDataSet]);
    }

    const handleAdd = () => {
        const newDataSet = [...dataset, 33];
        setDataSet([...newDataSet]);
    }


    useEffect(() => {
        d3.select('svg').remove();
        const width = 400;
        const height = 400;
        const margin = {
            top: 20,
            right: 40,
            bottom: 40,
            left: 30
        }
        // 定义矩形的宽度
        const rectWidth = 30;
        // 矩形宽度和间距
        const rectStep = 35;
        const svg = d3.select('.BarChart')
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        // 绘画的区域g
        const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
        const rectUpdate = g.selectAll('rect').data(dataset);
        const rectEnter = rectUpdate.enter();
        const rectExit = rectUpdate.exit();

        // 定义比例尺
        const xScale = d3.scaleLinear()
            .domain([0, dataset.length]) // d3.range() 返回一个等差数列[1, 2, 3, 4]
            .range([0, width - margin.left - margin.right]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([height - margin.top - margin.bottom, 0]);

        rectUpdate
            .attr('x', (d, i) => margin.left + i * rectStep)
            .attr('y', d => yScale(d))
            .attr('width', rectWidth)
            .attr('height', d => height - margin.bottom - yScale(d))
            .attr('fill', 'steelblue');

        rectEnter.append('rect')
            .attr('x', (d, i) => margin.left + i * rectStep)
            .attr('y', d => yScale(d))
            .attr('width', rectWidth)
            .attr('height', d => height - margin.bottom - yScale(d))
            .attr('fill', 'steelblue');

        rectExit.remove();


        const text = g.selectAll('.mytext')
            .data(dataset)
            .enter()
            .append('text')
            .attr('x', (d, i) => margin.left + i * rectStep)
            .attr('y', d => yScale(d))
            .attr('text-anchor', 'middle')
            .attr('dx', rectWidth / 2)
            .attr('dy', '1em')
            .text(d => d);

        // 定义坐标轴
        const xAixs = d3.axisBottom().scale(xScale);
        const yAxis = d3.axisLeft().scale(yScale);

        g.append('g')
            .attr('class', 'xAixs')
            .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAixs)
        g.append('g')
            .attr('class', 'yAxis')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .call(yAxis)


        // const width = 500
        // const height = 500
        // const dataset = [10, 20, 30, 40, 33, 24, 12, 5]
        // const padding = { left: 30, right: 30, top: 20, bottom: 20 }
        // const rectPadding = 4

        // const svg = d3.select('.BarChart')
        //     .append('svg')
        //     .attr('width', width)
        //     .attr('height', height)

        // const xScale = d3
        //     .scaleBand()
        //     .domain(d3.range(dataset.length))
        //     .rangeRound([0, width - padding.left - padding.right])
        // const yScale = d3
        //     .scaleLinear()
        //     .domain([0, d3.max(dataset)])
        //     .range([height - padding.top - padding.bottom, 0])

        // const xAxis = d3.axisBottom(xScale)
        // const yAxis = d3.axisLeft(yScale)

        // svg
        //     .selectAll('rect')
        //     .data(dataset)
        //     .enter()
        //     .append('rect')
        //     .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        //     .attr('x', (d, i) => {
        //         return (xScale.bandwidth() + xScale.paddingInner()) * i
        //     })
        //     .attr('y', (d, i) => {
        //         // return height - padding.top - padding.bottom - yScale(d)
        //         return yScale(d)
        //     })
        //     .attr('height', (d, i) => {
        //         return height - padding.top - padding.bottom - yScale(d)
        //     })
        //     .attr('width', xScale.bandwidth() - rectPadding)
        //     .attr('fill', 'green')

        // svg
        //     .selectAll('text')
        //     .data(dataset)
        //     .enter()
        //     .append('text')
        //     .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        //     .attr('x', (d, i) => {
        //         return (xScale.bandwidth() + xScale.paddingInner()) * i
        //     })
        //     .attr('y', (d, i) => {
        //         return yScale(d)
        //     })
        //     .attr("dx", function () {
        //         return xScale.bandwidth() / 2 - rectPadding;
        //     })
        //     .attr("dy", 20)
        //     .text((d) => d)

        // svg
        //     .append('g')
        //     .attr("class", "axis")
        //     .attr("transform", `translate(${padding.left},${height - padding.bottom})`)
        //     .call(xAxis)
        // svg
        //     .append('g')
        //     .attr("class", "axis")
        //     .attr("transform", `translate(${padding.left},${padding.bottom})`)
        //     .call(yAxis)

        // svg
        //     .selectAll('rect')
        //     .on("mouseover", function (d, i) {
        //         d3.select(this)
        //             .transition()
        //             .duration(100)
        //             .attr("fill", "yellow");
        //     })
        //     .on("mouseout", function (d, i) {
        //         d3.select(this)
        //             .transition()
        //             .duration(500)
        //             .attr("fill", "green");
        //     });
    }, [dataset]);

    return (
        <div className="BarChart">
            <button onClick={handleSort}>排序</button>
            <button onClick={handleAdd}>增加数据</button>
        </div>
    );
}

export default BarChart;