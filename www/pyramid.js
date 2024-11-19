const barHeight = 20;

// create scale functions for each mode
const trillionsScale = d3
  .scaleLinear()
  .domain([0, 60_000_000])
  .range([0, chartWidth]);
const pctScale = d3.scaleLinear().domain([0, 0.4]).range([0, chartWidth]);
const xScale = {
  dollars: trillionsScale,
  percent: pctScale,
};

// bar labeling functiosn also dependent on mode
const labelBars = {
  dollars: (d) => `${(d / 1000000).toFixed(1)}T`,
  percent: (d) => `${(d * 100).toFixed(1)}%`,
};

function drawPyramid(chartG, mode) {
  // pick the row to display using the index
  const row = levelsData[displayIndex];
  const categories = ["TopPt1", "RemainingTop1", "Next9", "Next40", "Bottom50"];

  // use raw values in dollars mode
  let values = categories.map((category) => +row[category]);
  // in percent, convert each to % held
  if (mode === "percent") {
    let quarterTotal = values.reduce((partialSum, a) => partialSum + a, 0);
    values = values.map((v) => v / quarterTotal);
  }

  // show the current date on the page
  d3.select("#timeDisplay").html(row.Date);

  // create a pyramid for these 5 values
  chartG
    .selectAll("rect")
    .data(values)
    .join("rect")
    .attr("x", (d) => -xScale[mode](d) / 2) // center the bars
    .attr("y", (d, i) => i * barHeight)
    .attr("width", (d) => xScale[mode](d))
    .attr("height", barHeight)
    .attr("fill", (d, i) => d3.schemeOranges[values.length][i]);
  chartG
    .selectAll("text")
    .data(values)
    .join("text")
    .text((d) => labelBars[mode](d))
    .style("font-family", "monospace")
    .style("font-size", "10pt")
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("dy", 14)
    .attr("y", (d, i) => i * barHeight)
    .attr(
      "fill",
      (d, i) => d3.schemeGreys[values.length + 3][values.length + 3 - i],
    );
}
