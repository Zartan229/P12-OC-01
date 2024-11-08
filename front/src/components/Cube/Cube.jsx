import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import classes from "./style.module.css";

export default function SmallCube({userAverageSessions }) {
  const ref = useRef();
  const userSessions = userAverageSessions.sessions;
  // Mapping des données de session au format attendu par D3
  const dayMapping = ["L", "M", " M", "J", "V", "S", "D"];
  const data = userSessions.map((session) => ({
    day: dayMapping[session.day - 1], // Mapper le jour numérique au nom du jour correspondant
    minutes: session.sessionLength,
  }));

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();

    // Définir les dimensions du graphique
    const width = 172;
    const height = 166;
    const margin = { top: 5, right: 5, bottom: 15, left: 5 };

    // Sélectionner l'élément SVG
    const svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background-color", "rgba(255, 0, 0, 1)") // Couleur de fond
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Ajouter le label 'Durée moyenne de session' avec un retour à la ligne
    svg
      .append("text")
      .attr("x", 5) // Alignement du texte près du bord droit
      .attr("y", 5) // Position légèrement en haut
      .attr("text-anchor", "start") // Alignement à gauche
      .style("font-size", "8px")
      .style("fill", "white")
      .call((text) => text.append("tspan").text("Durée moyenne"))
      .call((text) =>
        text.append("tspan").attr("x", 5).attr("dy", "1em").text("de session")
      ); // Deuxième ligne

    // Échelle X pour les jours
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.day))
      .range([0, width]) // Plage de la largeur
      .padding(0.2); // Espacement

    // Échelle Y pour le temps en minutes
    const yScale = d3
      .scaleLinear()
      .domain([-10, d3.max(data, (d) => d.minutes)])
      .range([height, 25]);

    const line = d3
      .line()
      .x((d) => xScale(d.day) + xScale.bandwidth() / 2) // Centrer les points de ligne
      .y((d) => yScale(d.minutes))
      .curve(d3.curveCatmullRom); // Catmull-Rom lisse la ligne

    // Ajouter le chemin de la ligne lissée
    svg
      .append("path")
      .datum(data) // Lier les données
      .attr("fill", "none") 
      .attr("stroke", "white") // Couleur de la ligne
      .attr("stroke-width", 1.5) // Épaisseur de la ligne
      .attr("d", line);

    // Ajouter des labels de jour personnalisés (au lieu de l'axe x)
    svg
      .selectAll(".day-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "day-label")
      .attr("x", (d) => xScale(d.day) + xScale.bandwidth() / 2) // Centrer le texte
      .attr("y", height + 10) // Positionner en dessous du graphique
      .attr("text-anchor", "middle") // Alignement au centre
      .style("font-size", "8px")
      .style("fill", "rgba(255, 255, 255, 1)")
      .text((d) => d.day); // Afficher le jour

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute") // Positionnement absolu pour le tooltip
      .style("padding", "5px") // Ajouter du rembourrage
      .style("border", "1px solid #ccc") // Bordure du tooltip
      .style("border-radius", "5px") // Coins arrondis
      .style("display", "none") // Masquer le tooltip par défaut
      .style("background-color", "#fff"); // Couleur de fond du tooltip

    // Ajouter un overlay qui assombrit la zone de la souris à droite
    const overlay = svg
      .append("rect")
      .attr("class", "overlay")
      .attr("y", -5) // Positionner légèrement au-dessus du graphique
      .attr("height", height + 30) // Hauteur de l'overlay
      .attr("fill", "black")
      .attr("opacity", 0)
      .style("pointer-events", "none"); // ne bloque pas les interactions

    // Ajouter des cercles pour chaque point (visible uniquement sur clic)
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.day) + xScale.bandwidth() / 2) // Centrer les cercles
      .attr("cy", (d) => yScale(d.minutes)) // Positionner selon les minutes
      .attr("r", 2) // Rayon des cercles
      .attr("fill", "transparent") // Invisible au départ
      .on("click", (event, d) => {
        // Basculer la visibilité des points au clic
        const isVisible = d3.select(event.currentTarget).attr("fill") === "white";
        d3.select(event.currentTarget).attr("fill", isVisible ? "transparent" : "white"); // Alterne entre blanc et transparent

        // Afficher ou masquer le tooltip en fonction du clic
        if (!isVisible) {
          tooltip
            .style("display", "block") // Afficher le tooltip
            .html(`Minutes passées : ${d.minutes}`) // Contenu du tooltip
            .style("left", `${event.pageX + 10}px`) // Positionner à droite de la souris
            .style("top", `${event.pageY - 20}px`); // Positionner au-dessus de la souris

          // Afficher l'overlay depuis la position de la souris
          const mouseX = d3.pointer(event)[0];
          overlay
            .attr("x", mouseX) // Position de départ de l'overlay
            .attr("width", width + 5 - mouseX) // Couverture de la souris au bord droit
            .attr("opacity", 0.5); // Opacité de l'overlay
        } else {
          tooltip.style("display", "none"); // Masquer le tooltip
          overlay.attr("opacity", 0); // Masquer l'overlay
        }
      });
  }, [data]);

  return (
    <div className={classes.cubeChartContainer}>
      <svg ref={ref}></svg>
    </div>
  );
}
