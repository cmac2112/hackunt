import React, { useEffect, useState, useRef } from "react";
import Layout from "../Layout/Layout";
import * as d3 from "d3";
import { useLogin } from "../../context/LoginContext";
import { Link } from "react-router-dom";
import SongForm from "../SongForm/SongForm";
import axios from "axios";
const Home = () => {
  const { isLoggedIn, username } = useLogin();
  console.log(username);
  const [showForm, setShowForm] = useState(false);
  const tooltipRef = useRef(null);
  const [songsUpdated, setSongsUpdated] = useState(false);
  //songs are their own nodes
  //edges are the connections between songs and genres
  //genres are their own nodes


  
  //song structure
  //{ title: "song title", artist: "artist name", genre: "genre name", link: "youtube link" }

  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };
  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Link to="/login" className="p-4 bg-blue-500 text-white rounded-full">
            Login
          </Link>
        </div>
      </Layout>
    );
  }
  if (isMobile()) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Link to="/login" className="p-4 bg-blue-500 text-white rounded-full">
            We do not support mobile quite yet
          </Link>
        </div>
      </Layout>
    );
  }
  const svgRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("User is not logged in");
      
    }
    if(isMobile()){
      alert("We are not ready for mobile devices yet, please visit us on a desktop")
      return
    }

    console.log("User is logged in");

    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/songs/${username}`
        );
        const songs = response.data;

        const nodes = songs.map((song, index) => ({
          id: `song-${index}`,
          title: song.title,
          artist: song.artist,
          genre: song.genre,
          link: song.link,
        }));
        const genres = [...new Set(songs.map((song) => song.genre))];
        const genreNodes = genres.map((genre, index) => ({
          id: `genre-${index}`,
          genre,
        }));

        // Add master node
        const masterNode = { id: "master", title: "Master Node" };

        const links = songs.map((song, index) => ({
          source: `song-${index}`,
          target: `genre-${genres.indexOf(song.genre)}`,
        }));

        // Add links from genres to master node
        const genreLinks = genres.map((genre, index) => ({
          source: `genre-${index}`,
          target: "master",
        }));

        const allNodes = [...nodes, ...genreNodes, masterNode];
        const allLinks = [...links, ...genreLinks];

        const width = 800;
        const height = 600;
        
        d3.select(svgRef.current).selectAll('*').remove();
        
        const svg = d3
          .select(svgRef.current)
          .attr("width", width)
          .attr("height", height)
          .call(
            d3.zoom().on("zoom", function (event) {
              svg.attr("transform", event.transform);
            })
          )
          .append("g");

        const simulation = d3
          .forceSimulation(allNodes)
          .force(
            "link",
            d3
              .forceLink(allLinks)
              .id((d) => d.id)
              .distance(70)
          )
          .force("charge", d3.forceManyBody().strength(-100))
          .force("center", d3.forceCenter(width / 2, height / 2));

        const link = svg
          .append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(allLinks)
          .join("line")
          .attr("stroke-width", (d) => Math.sqrt(d.value));

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(genres);
        const node = svg
          .append("g")
          .attr("stroke", "#fff")
          .attr("stroke-width", 8)
          .selectAll("circle")
          .data(allNodes)
          .join("circle")
          .attr("r", 10)
          .attr('fill', d => d.id === 'master' ? '#ff6347' : d.genre ? colorScale(d.genre) : '#ff6347')
          .on("click", (event, d) => {
            if (d.link) {
              window.open(d.link, "_blank");
            }
          })
          .on("mouseover", (event, d) => {
            console.log(d);
          })
          .on("mouseout", () => {
            d3.select(tooltipRef.current).style("opacity", 0);
          })
          .call(
            d3
              .drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended)
          );

        node.append("title").text((d) => d.title || d.genre);

        simulation.on("tick", () => {
          link
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

          node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        });

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
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [isLoggedIn, username, songsUpdated]);

  return (
    <Layout>
      <div className="flex flex-col">
        <button
          onClick={() => setShowForm(true)}
          className="p-4 bg-green-500 text-white z-50"
        >
          Add Song
        </button>
        {showForm && <SongForm onClose={() => setShowForm(false)} onSongAdded={() => setSongsUpdated(!songsUpdated)} />}
        <svg ref={svgRef} className="w-full h-full md:h-3/4 bg-gray-950"></svg>
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            textAlign: "center",
            width: "120px",
            height: "auto",
            padding: "8px",
            font: "20px sans-serif",
            background: "black",
            color: "white",
            border: "0px",
            borderRadius: "8px",
            pointerEvents: "none",
            opacity: 0,
          }}
        ></div>
      </div>
    </Layout>
  );
};


export default Home;
