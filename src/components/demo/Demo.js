import React, { useEffect } from 'react';
import * as d3 from 'd3';

// import './demo.css';



const Demo = () => {

    useEffect(() => {
        const p = d3.select('.container').selectAll('p');
        // 1、使用datum 绑定数据
        // p.datum('span').append('span').text(d => `  ${d}`); // 在被绑定数据的选择集中添加元素后，新元素会继承改数据
        // console.log(p);
        // 2、使用data绑定数据
        // const dataset =[3];
        // const update = p.data(dataset);
        // update.exit().remove();
        // console.log(update);
        // 3、绑定的顺序
        // const dataset = [
        //     {
        //         id: 5,
        //         name: '张三'

        //     },
        //     {
        //         id: 4,
        //         name: '李四'
        //     },
        //     {
        //         id: 3,
        //         name: '王五'
        //     }
        // ]
        // p.data(dataset, function(d) {console.log(d)});
        // p.text(d => console.log(d));
        // p.data(dataset).text(d => `${d.id}: ${d.name}`);  ????
        // enter 处理方法
        // const dataset = [3, 6, 9];
        // const update = d3.select('.container').selectAll('p').data(dataset);
        // const enter = update.enter();
        // update.text(d => d);
        // enter.append('p').text(d => d);
        // const container = d3.select
        // const ps = d3.select('.container').selectAll('p'); // 选择集
        // const update = p.data(dataset); // 将数据和选择集绑定返回的就是update
        // const enter = update.enter(); // 获取enter部分
        // const exit = update.exit(); // 获取exit部分
        // update.text(d => d); // 处理update部分
        // enter.append('p').text(d => d); // 处理enter部分
        // exit.remove(); // 处理exit部分

        // 4、绘制坐标轴
        const width = 600;
        const height = 600;
        const svg = d3.select('.container')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // 设置比例尺
        const xScale = d3.scaleLinear()
            .domain([0, 10])
            .range([0, 300]);

        // 定义坐标轴
        const axis = d3.axisBottom().scale(xScale)
        // axis.outerTickSize(10);

        // 添加一个g
        const gAxis = svg.append('g').attr('transform', 'translate(80, 80)').attr('class', 'axis');
        axis(gAxis);
    }, []);

    return (
        <div className="container">
            {/* <p>p1</p> */}
            {/* <p>p2</p>
            <p>p3</p> */}
        </div>
    );
}

export default Demo;