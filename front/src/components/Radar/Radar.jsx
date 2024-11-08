import classes from "./style.module.css"; 
import React, { useRef, useEffect } from "react"; 
import * as d3 from "d3"; 

export default function RadarChart({userPerformance}) {
  const ref = useRef();

  const width = 182;
  const height = 186;
  const radius = Math.min(width, height) / 2.5;

  const data = userPerformance.data.map((d) => ({
    name: userPerformance.kind[d.kind],
    value: d.value,
  }));

  useEffect(() => {
    // Effacer le SVG
    d3.select(ref.current).selectAll("*").remove();

    // Créer le conteneur SVG
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`); // Centrer le graphique

    // Couleur de fond
    svg
      .append("rect")
      .attr("x", -width / 2)
      .attr("y", -height / 2)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#282D30"); // Couleur de fond

    // Créer les échelles
    const angleSlice = (Math.PI * 2) / data.length; // Calculer l'angle

    const rScale = d3
      .scaleLinear()
      .range([0, radius]) // Plage de l'échelle
      .domain([0, d3.max(data, (d) => d.value)]);

    const drawPolygon = (level) => {
      const points = data.map((d, i) => {
        const angle = i * angleSlice;
        const r = rScale(level);
        return [r * Math.cos(angle - Math.PI / 2), r * Math.sin(angle - Math.PI / 2)];
      });
      return points;
    };

    const levels = [0.1, 0.3, 0.5, 0.7, 0.9]; // Niveaux des polygones concentriques
    levels.forEach((level) => {
      const polygonPoints = drawPolygon(d3.max(data, (d) => d.value) * level);
      svg.append("polygon")
        .attr("points", polygonPoints.map((d) => d.join(",")).join(" ")) 
        .attr("fill", "none") 
        .attr("stroke", "lightgray") 
        .attr("stroke-width", 1);
    });

    // Positionner les lable des axes
    const labelOffsetFactor = 1.10; // Margin des sommets
    data.forEach((d, i) => {
      const angle = i * angleSlice; 
      const x = rScale(d3.max(data, (d) => d.value)) * labelOffsetFactor * Math.cos(angle - Math.PI / 2); 
      const y = rScale(d3.max(data, (d) => d.value)) * labelOffsetFactor * Math.sin(angle - Math.PI / 2);

      // Dessiner les label
      svg
        .append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em") 
        .attr("fill", "white") 
        .attr("font-size", "10px") 
        .text(d.name); 
    });

    // Créer les lignes pour le radar
    const radarLine = d3
      .lineRadial()
      .angle((d, i) => i * angleSlice)
      .radius((d) => rScale(d.value)) 
      .curve(d3.curveLinearClosed);

    // Dessiner la zone radar
    svg
      .append("path")
      .datum(data) 
      .attr("d", radarLine) 
      .attr("class", "radar-area")
      .style("fill", "rgba(255, 0, 0, 0.5)") 
      .style("stroke", "red");
  }, [data, radius, width, height]); 

  return (
    <div className={classes.chartContainerMain}>
      <svg ref={ref}></svg>
    </div>
  );
}
