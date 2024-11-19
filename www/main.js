// create empty chart SVGs - pyramid charts start with a centered group
const dollarsG = makeChart("#pyramidDollars", 200)
  .append("g")
  .attr("transform", `translate(${chartWidth / 2}, ${margin.top})`);
const percentG = makeChart("#pyramidPercent", 200)
  .append("g")
  .attr("transform", `translate(${chartWidth / 2}, ${margin.top})`);
const lineDollars = makeChart("#lineChartDollars", 400);
const linePercent = makeChart("#lineChartPercent", 400);

// global state
let levelsData = []; // placeholder of data to be loaded
let displayIndex = 0; // currently displayed year index
let timerFunc = null; // handle to timer function if animating

// called every frame of animation -- draw all charts
// actual functions to draw charts are in other JS files (pyramid/linechart.js)
function updateCharts() {
  drawPyramid(percentG, "percent");
  drawPyramid(dollarsG, "dollars");
  drawLineChart(lineDollars, levelsData, "dollars");
  drawLineChart(linePercent, levelsData, "percent");
}

// disable timer (see below setInterval code)
function stopTimer() {
  clearInterval(timerFunc);
  timerFunc = null;
  d3.select("#playPause").text("Play");
}

// The below global code runs on page load to set up the application.

// color the text in the paragraph to act as a key
d3.selectAll(".pyramidLabel").style("color", (d, i) => d3.schemeOranges[5][i]);

// load CSV and parse data -- then draw charts for first time
d3.csv("levels.csv").then((data) => {
  levelsData = data;
  updateCharts();
});

// if they drag the slider, update charts
d3.select("#timeSlider").on("change", function (e) {
  // update the index & redraw
  displayIndex = e.target.value;
  updateCharts();
});

// if play button is clicked toggle play state
d3.select("#playPause").on("click", function (e) {
  // toggle the playing class -- used for display
  // as well as knowing if the animation is active
  e.target.classList.toggle("playing");

  // if the state is now playing -- start a timer function
  if (e.target.classList.contains("playing")) {
    // toggle button to say 'Pause'
    d3.select(e.target).text("Pause");

    // reset timer if they've gone past the end
    if (displayIndex >= levelsData.length) {
      displayIndex = 0;
    }

    // setInterval will call this function every 100ms until cancelled
    // the variable "timerFunc" stores a reference to the timer so we can
    // pause/cancel it
    timerFunc = setInterval(function () {
      displayIndex += 1;
      const timeSlider = d3.select("#timeSlider");
      if (displayIndex >= levelsData.length && timerFunc) {
        stopTimer();
        displayIndex = levelsData.length - 1;
      }
      timeSlider.attr("value", displayIndex);
      updateCharts();
    }, 100);
  } else if (timerFunc) {
    stopTimer();
  }
});
