import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import classes from "./style.module.css";

export default function CircularProgress({currentUser}) {
  const ref = useRef();

  const userScore = currentUser.score;
  const percentage = userScore * 100;

  useEffect(() => {

    d3.select(ref.current).selectAll("*").remove();


    const width = 182;
    const height = 186;
    const radius = Math.min(width, height) / 3;

    // SVG container
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .style('background-color', 'rgba(251, 251, 251, 1)')
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);


    svg
      .append("circle")
      .attr("r", radius - 10) 
      .attr("fill", "white"); 

    const arc = d3.arc()
      .innerRadius(radius - 10)
      .outerRadius(radius)
      .startAngle(0)
      .endAngle((percentage / 100) * 2 * Math.PI); 


    svg
      .append("path")
      .attr("d", arc)
      .attr("fill", "red");


    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.3em")
      .attr("fill", "black")
      .attr("font-size", "20px")
      .text(`${percentage}%`);

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.2em")
      .attr("fill", "gray")
      .attr("font-size", "12px")
      .text("de votre objectif");


    d3.select(ref.current)
      .append("text")
      .attr("x", 10)
      .attr("y", 20) 
      .attr("fill", "black")
      .attr("font-size", "15px")
      .text("Score");
      
  }, [percentage]);

  return (
    <div className={classes.cubeCircularProgressContainer}>
      <svg ref={ref}></svg>
    </div>
  );
}
