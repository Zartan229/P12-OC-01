import classes from "./style.module.css";
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function Candle({ mock, userId }) {
  const ref = useRef();

  // Dimension de la chart
  const margin = { top: 30, right: 50, bottom: 20, left: 40 };
  const width = 520;
  const height = 135;

  const userActivity = mock.USER_ACTIVITY.find(user => user.userId === userId);

  const data = userActivity.sessions.map((session) => ({
    day: session.day,
    kilogram: session.kilogram,
    calories: session.calories,
  }));
  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    // Création du SVG avec marges et dimensions
    const svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right) // Définir la largeur du SVG
      .attr("height", height + margin.top + margin.bottom) // Définir la hauteur du SVG
      .append("g") // Ajout d'un groupe pour gérer les éléments
      .attr("transform", `translate(${margin.left},${margin.top})`); // Déplacement du groupe pour appliquer les marges

    // Échelle X pour les jours avec un espacement réduit pour rapprocher les barres
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.day)) // Définir le domaine des jours
      .range([0, width]) // Plage de la largeur
      .padding(0.9); // Espacement réduit pour rapprocher les barres

    // Échelle Y pour le poids (kilogrammes)
    const minWeight = d3.min(data, (d) => d.kilogram) - 1; // Poids minimum
    const maxWeight = d3.max(data, (d) => d.kilogram) + 1; // Poids maximum
    const midWeight = (minWeight + maxWeight) / 2; // Poids moyen
    // Ajouter le texte au-dessus du graphique
    svg
      .append("text")
      .attr("x", width - width + 50)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .text("Activité quotidienne")
      .style("font-size", "12px");

    svg
      .append("circle")
      .attr("cx", width - 200)
      .attr("cy", -20)
      .attr("r", 5)
      .attr("fill", "black"); // Rond noir

    svg
      .append("text")
      .attr("x", width - 190)
      .attr("y", -20)
      .text("Poids (kg)")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");

    svg
      .append("circle")
      .attr("cx", width - 130)
      .attr("cy", -20)
      .attr("r", 5)
      .attr("fill", "red"); // Rond rouge

    svg
      .append("text")
      .attr("x", width - 120)
      .attr("y", -20)
      .text("Calories brûlées (kCal)")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");
    const yScaleLeft = d3
      .scaleLinear()
      .domain([minWeight, maxWeight]) // Définir le domaine pour le poids
      .range([height, 0]); // Plage de la hauteur (inverse pour SVG)

    // Échelle Y pour les calories
    const yScaleRight = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.calories) + 100]) // Définir le domaine pour les calories
      .range([height, 0]); // Plage de la hauteur (inverse pour SVG)

    // Couleur pour les barres de poids et de calories
    const colorScaleWeight = "black"; // Couleur pour les barres de poids
    const colorScaleCalories = "red"; // Couleur pour les barres de calories

    // Générer l'axe X
    const bottomAxis = svg
      .append("g")
      .attr("transform", `translate(0, ${height})`) // Positionner l'axe en bas
      .call(d3.axisBottom(xScale).tickFormat((d) => d.slice(-2))); // Appel de l'axe X avec formatage

    // Supprimer la ligne noire de l'axe et les marques de graduation de l'axe inférieur
    bottomAxis.select(".domain").remove(); // Supprimer la ligne de l'axe (chemin)
    bottomAxis.selectAll("line").remove(); // Supprimer les lignes de graduation

    // Axe pour le poids sur le côté droit (position ajustée)
    const rightAxis = svg
      .append("g")
      .attr("transform", `translate(${width - 10}, 0)`) // Déplacer l'axe de poids plus près des barres
      .call(
        d3
          .axisRight(yScaleLeft)
          .tickValues([minWeight, midWeight, maxWeight])
          .tickFormat(d3.format(".0f"))
      ); // Formatage des ticks

    // Supprimer la ligne noire et les marques de graduation de l'axe droit
    rightAxis.select(".domain").remove(); // Supprimer la ligne de l'axe (chemin)
    rightAxis.selectAll("line").remove(); // Supprimer les lignes de graduation

    // Ajouter des barres pour le poids avec des sommets arrondis et un bas plat
    svg
      .selectAll(".barWeight")
      .data(data)
      .join("rect") // Joindre les données aux éléments <rect>
      .attr("class", "barWeight") // Ajouter une classe pour le style
      .attr("x", (d) => xScale(d.day) + (xScale.bandwidth() - 7) / 2) // Centrer la barre
      .attr("y", (d) => yScaleLeft(d.kilogram)) // Positionner la barre selon le poids
      .attr("width", 7) // Définir la largeur de la barre à 7px
      .attr("height", (d) => height - yScaleLeft(d.kilogram)) // Définir la hauteur selon le poids
      .attr("fill", colorScaleWeight) // Définir la couleur de la barre
      .attr("rx", 3) // Ajouter un rayon horizontal pour le sommet arrondi
      .attr("ry", 3); // Ajouter un rayon vertical pour le sommet arrondi

    // Ajouter des barres pour les calories avec des sommets arrondis et un bas plat (sans axe)
    svg
      .selectAll(".barCalories")
      .data(data)
      .join("rect") // Joindre les données aux éléments <rect>
      .attr("class", "barCalories") // Ajouter une classe pour le style
      .attr("x", (d) => xScale(d.day) + (xScale.bandwidth() - 7) / 2 + 10) // Positionner à côté de la barre de poids
      .attr("y", (d) => yScaleRight(d.calories)) // Positionner la barre selon les calories
      .attr("width", 7) // Définir la largeur de la barre à 7px
      .attr("height", (d) => height - yScaleRight(d.calories)) // Définir la hauteur selon les calories
      .attr("fill", colorScaleCalories) // Définir la couleur de la barre
      .attr("rx", 3) // Ajouter un rayon horizontal pour le sommet arrondi
      .attr("ry", 3); // Ajouter un rayon vertical pour le sommet arrondi

    // Ajouter des lignes pointillées pour les poids moyen et maximum
    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", yScaleLeft(midWeight)) // Positionner la ligne au poids moyen
      .attr("x2", width)
      .attr("y2", yScaleLeft(midWeight))
      .attr("stroke", "gray") // Couleur de la ligne
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5"); // Ligne pointillée

    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", yScaleLeft(maxWeight)) // Positionner la ligne au poids maximum
      .attr("x2", width)
      .attr("y2", yScaleLeft(maxWeight))
      .attr("stroke", "gray") // Couleur de la ligne
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5"); // Ligne pointillée

    // Ajouter une ligne droite pour le poids minimum en bas
    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", yScaleLeft(minWeight)) // Positionner la ligne au poids minimum
      .attr("x2", width)
      .attr("y2", yScaleLeft(minWeight))
      .attr("stroke", "gray") // Couleur de la ligne
      .attr("stroke-width", 1); // Ligne solide

    // Tooltip pour poids et calories
    const tooltip = d3
      .select("body")
      .append("div") // Créer un div pour le tooltip
      .style("position", "absolute") // Position absolue pour le tooltip
      .style("padding", "5px") // Ajouter du rembourrage
      .style("border", "1px solid #ccc") // Bordure du tooltip
      .style("border-radius", "5px") // Coins arrondis
      .style("display", "none") // Masquer le tooltip par défaut
      .style("text-align", "center")
      .style("color", "white")
      .style("background-color", `red`); // Couleur de fond du tooltip

    // Écouteurs d'événements pour le tooltip
    svg
      .selectAll("rect")
      .on("mouseover", (event, d) => {
        // Quand la souris passe sur un rectangle
        tooltip
          .style("display", "block") // Afficher le tooltip
          .html(`${d.kilogram}KG<br/>${d.calories}Kcal`) // Formatage en XXKG XXXKcal
          .style("left", `${event.pageX + 10}px`) // Positionnement du tooltip à droite de la souris
          .style("top", `${event.pageY - 20}px`); // Positionnement du tooltip au-dessus de la souris
      })
      .on("mouseout", () => tooltip.style("display", "none")); // Masquer le tooltip quand la souris sort
  }, [data, height, width]); // Dépendances du useEffect

  return (
    <main className={classes.chartContainerMain}>
      <svg ref={ref}></svg>
    </main>
  );
}
