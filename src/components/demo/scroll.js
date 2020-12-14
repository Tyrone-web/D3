import React, { useEffect, useState } from 'react';
// import './scroll.css';


const Scroll = () => {

    const handleScroll = () => {
        console.log('测试滚动');
    }

    return (
        <div className="scrollContainer">
            <ul onScroll={handleScroll}>
                <li title='测试测试测试测试测试测试测试测试测试测试'>测试测试测试测试测试测试测试测试测试测试</li>
                <li>测试2</li>
                <li>测试3</li>
                <li>测试4</li>
                <li>测试5</li>
                <li>测试6</li>
                <li>测试7</li>
                <li>测试8</li>
                <li>测试9</li>
                <li>测试10</li>
                <li>测试1</li>
                <li>测试2</li>
                <li>测试3</li>
                <li>测试4</li>
                <li>测试5</li>
                <li>测试6</li>
                <li>测试7</li>
                <li>测试8</li>
                <li>测试9</li>
                <li>测试10</li>
                <li>测试1</li>
                <li>测试2</li>
                <li>测试3</li>
                <li>测试4</li>
                <li>测试5</li>
                <li>测试6</li>
                <li>测试7</li>
                <li>测试8</li>
                <li>测试9</li>
                <li>测试10</li>
                <li>测试10</li>
            </ul>
        </div>

    );
}


export default Scroll;