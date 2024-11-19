// settings for each chart
// consider parameterizing later
const chartWidth = 700;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };

// helper function to make multiple SVGs on the page
function makeChart(id, height) {
  // create a root <g> center aligned
  const svg = d3
    .select(id)
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", height)
    .attr("viewBox", `0 0 ${chartWidth} ${height}`);
  return svg;
}
