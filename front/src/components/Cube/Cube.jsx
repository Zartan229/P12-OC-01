import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import classes from "./style.module.css";

export default function SmallCube(mock) {
  const ref = useRef();

  // Extraction des données de session de l'utilisateur à partir des données mock
  const userSessions = mock.mock.USER_AVERAGE_SESSIONS[0].sessions;

  // Mapping des données de session au format attendu par D3
  const dayMapping = ["L", "M", " M", "J", "V", "S", "D"];
  const data = userSessions.map((session) => ({
    day: dayMapping[session.day - 1],  // Mapper le jour numérique au nom du jour correspondant
    minutes: session.sessionLength
  }));

  useEffect(() => {
    // Définir les dimensions du graphique
    const width = 172;
    const height = 166;
    const margin = { top: 5, right: 5, bottom: 15, left: 5 };

    // Sélectionner l'élément SVG
    const svg = d3.select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', 'rgba(255, 0, 0, 1)') // Couleur de fond
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Ajouter le label 'Durée moyenne de session' avec un retour à la ligne
    svg.append('text')
      .attr('x', 5)  // Alignement du texte près du bord droit
      .attr('y', 5)  // Position légèrement en haut
      .attr('text-anchor', 'start')  // Alignement à gauche
      .style('font-size', '8px')
      .style('fill', 'white')
      .call(text => text.append('tspan').text('Durée moyenne')) // Premier ligne
      .call(text => text.append('tspan').attr('x', 5).attr('dy', '1em').text('de session')); // Deuxième ligne

    // Échelle X pour les jours
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.day)) // Domaine basé sur les jours
      .range([0, width]) // Plage de la largeur
      .padding(0.2); // Espacement entre les bandes

    // Échelle Y pour le temps en minutes
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.minutes)]) // Domaine basé sur le temps en minutes
      .range([height, 0]); // Plage de la hauteur (inverse pour SVG)

    // Création du générateur de ligne avec lissage
    const line = d3.line()
      .x(d => xScale(d.day) + xScale.bandwidth() / 2)  // Centrer les points de ligne
      .y(d => yScale(d.minutes))
      .curve(d3.curveCatmullRom);  // Lisser la ligne avec la courbe de Catmull-Rom

    // Ajouter le chemin de la ligne lissée
    svg.append('path')
      .datum(data) // Lier les données au chemin
      .attr('fill', 'none') // Pas de remplissage
      .attr('stroke', 'black') // Couleur de la ligne
      .attr('stroke-width', 1.5) // Épaisseur de la ligne
      .attr('d', line); // Définir le chemin basé sur la ligne

    // Ajouter des labels de jour personnalisés (au lieu de l'axe x)
    svg.selectAll('.day-label')
      .data(data)
      .enter().append('text')
      .attr('class', 'day-label')
      .attr('x', d => xScale(d.day) + xScale.bandwidth() / 2) // Centrer le texte sous les bandes
      .attr('y', height + 10)  // Positionner en dessous du graphique
      .attr('text-anchor', 'middle') // Alignement au centre
      .style('font-size', '8px')
      .style('fill', 'black')
      .text(d => d.day); // Afficher le jour

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
      .attr("opacity", 0) // Commencer caché
      .style("pointer-events", "none"); // Assurer qu'il ne bloque pas les interactions

    // Ajouter des cercles pour chaque point (pour l'effet de survol)
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.day) + xScale.bandwidth() / 2) // Centrer les cercles
      .attr("cy", (d) => yScale(d.minutes)) // Positionner selon les minutes
      .attr("r", 2) // Rayon des cercles
      .attr("fill", "black") // Couleur des cercles
      .on("mouseover", (event, d) => {
        tooltip
          .style("display", "block") // Afficher le tooltip
          .html(`Minutes passées : ${d.minutes}`) // Contenu du tooltip
          .style("left", `${event.pageX + 10}px`) // Positionnement à droite de la souris
          .style("top", `${event.pageY - 20}px`); // Positionnement au-dessus de la souris

        const mouseX = d3.pointer(event)[0]; // Obtenir la position de la souris
        overlay
          .attr("x", mouseX) // Définir le point de départ de l'overlay à la position x de la souris
          .attr("width", (width + 5) - mouseX) // Définir la largeur de l'overlay pour couvrir de la souris au bord droit
          .attr("opacity", 0.5); // Afficher l'overlay avec une certaine opacité
      })
      .on("mouseout", () => {
        tooltip.style("display", "none"); // Masquer le tooltip lorsque la souris sort
        overlay.attr("opacity", 0); // Masquer l'overlay lorsque la souris sort
      });
  }, [data]);

  return (
    <div className={classes.cubeChartContainer}>
      <svg ref={ref}></svg>
    </div>
  );
}
