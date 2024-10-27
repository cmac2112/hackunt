import React, { useEffect, useState, useRef } from 'react';
import Layout from '../Layout/Layout';
import * as d3 from 'd3'
import { useLogin} from '../../context/LoginContext';


const Home = () => {
  const { isLoggedIn, login } = useLogin();
  console.log(isLoggedIn)

  const [count, setCount] = useState(0)
  const svgRef = useRef(null);

  useEffect(() => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
      { id: 'C' },
      { id: 'D' }
    ];

    const links = [
      { source: 'A', target: 'B' },
      { source: 'A', target: 'C' },
      { source: 'B', target: 'D' },
      { source: 'C', target: 'D' },
      { source: 'A', target: 'D' },
      { source: 'B', target: 'C' },
      { source: 'A', target: 'B' }, // Multiple edge between A and B
      { source: 'B', target: 'A' }  // Reverse edge from B to A
    ];

    const addElements = async () =>{
      for(let i = 0; i < 100; i++){
        nodes.push({id: i})
        links.push({source: i, target: 'A'})
        links.push({source: i, target: 'B'})
      }
    }
    addElements()
     const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value));const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', 'currentColor')
      .call(drag(simulation))
      .on('click', (event, d) => {
        console.log('clicked', d.id);
      });

    node.append('title')
      .text(d => d.id);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y); node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  }, []);

  return (
    <Layout>
  <div className="flex items-center justify-center min-h-screen">
    <svg ref={svgRef} className="justify-center"></svg>
    <div className="flex flex-col items-center">
      <button onClick={() => setCount(count + 1)} className="mt-4">Increment</button>
      <p className="mt-2">{count}</p>
    </div>
  </div>
</Layout>
  );
};

export default Home;