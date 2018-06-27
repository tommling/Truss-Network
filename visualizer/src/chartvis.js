var chartData = [];
var chart = AmCharts.makeChart("chartdiv", {
  type: "serial",
  theme: "dark",
  dataProvider: chartData,

  addClassNames: true,
  startDuration: 1,
  color: "#FFFFFF",
  marginLeft: 0,

  categoryField: "number",
  categoryAxis: {
    parseDates: false,
    minPeriod: "DD",
    gridCount: 50,
    gridAlpha: 0.1,
    gridColor: "#FFFFFF",
    axisColor: "#555555",
  },

  valueAxes: [],
  graphs: [{
    id: "g2",
    valueField: "latitude",
    classNameField: "bulletClass",
    title: "Ethereum",
    type: "line",
    valueAxis: "a2",
    lineColor: "#786c56",
    lineThickness: 1,
    legendValueText: "[[difficulty]]",
    descriptionField: "townName",
    bullet: "square",
    bulletBorderColor: "#786c56",
    bulletBorderAlpha: 1,
    bulletBorderThickness: 2,
    bulletColor: "#000000",
    balloonText: "Ethereum block:[[hash]]",
    showBalloon: true,
    animationPlayed: true,
  },{
    id: "g3",
    title: "WeakCoin",
    valueField: "distance",
    type: "line",
    valueAxis: "a3",
    lineColor: "#ff5755",
    balloonText: "WeakCoin Block:[[hash]]",
    lineThickness: 1,
    legendValueText: "[[difficulty]]",
    bullet: "square",
    bulletBorderColor: "#ff5755",
    bulletBorderThickness: 1,
    bulletBorderAlpha: 1,
    dashLengthField: "dashLength",
    animationPlayed: true
  }],
  chartCursor: {
    zoomable: true,
    categoryBalloonDateFormat: "DD",
    cursorAlpha: 0,
    valueBalloonsEnabled: false
  },
  legend: {
    bulletType: "square",
    equalWidths: false,
    valueWidth: 120,
    useGraphSettings: true,
    color: "#FFFFFF"
  }
});


/**
 * Set interval to push new data points periodically
 */
// set up the chart to update every second
var flag = true;
var etnum = 0;
var wnum = 0;
var totalDifficulty = 0;
const etD = 200;
const weakD = 100;
console.log("Truss Visualizer");

function insertNewData () {
    flag = !flag;
    // normally you would load new datapoints here
    var hash = "0x"+generateUnid();
    // remove datapoint from the beginning
    var data = {
        "number": wnum++,
        "distance": 100,
        "hash": hash
    }
    if (flag) {
        if (wnum % 4 == 0) {
            data["difficulty"] = weakD;
            totalDifficulty += weakD;
            data["distance"] = 100;
            // delete data["distance"];
        } else {
            data["difficulty"] = etD;
            totalDifficulty += etD;
            data["distance"] = 190;
            data["latitude"] = 200;
        }
    } else totalDifficulty += weakD;
    console.log("Total Difficulty: " + totalDifficulty);
    // load new data (with json promise here)
    chart.dataProvider.push(data);
    chart.validateData();
}

(function loop() {
    var rand = Math.round ( Math.random() * (10000 - 4000) ) + 4000;
    // console.log(rand);
    setTimeout(function() {
            insertNewData();
            loop();  
    }, rand);
}());

if (chart.dataProvider.size > 8) {
    setInterval( function() {
        chart.dataProvider.shift(); // delete oldest data
    }, 10000);
}