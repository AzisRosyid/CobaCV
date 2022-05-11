window.chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(231,233,237)",
};

window.randomScalingFactor = function () {
  return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};

var randomScalingFactor = function () {
  return Math.round(Math.random() * 100);
};

var now = moment();
var dataTime1 = moment("2016-12-18T14:58:54.026Z");
var dataTime2 = moment("2017-01-18T20:58:54.026Z");
var dataTime3 = moment("2017-02-15T08:58:54.026Z");
var label1 = moment.duration(dataTime1.diff(now)).humanize(true);
var label2 = moment.duration(dataTime2.diff(now)).humanize(true);
var label3 = moment.duration(dataTime3.diff(now)).humanize(true);

var color = Chart.helpers.color;
var config = {
  type: "radar",
  data: {
    labels: [
      "Happiness",
      "Loneliness",
      "Health",
      "Managing at Home",
      "Finances",
      "Work",
      "Relationships",
      "Exercise",
      "Volunteer",
      "Attitude",
    ],
    datasets: [
      {
        label: label1,
        backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
        borderColor: window.chartColors.red,
        pointBackgroundColor: window.chartColors.red,
        data: [8, 1, 5, 2, 4, 10, 0, 0, 3],
        notes: [
          "I am pretty happy",
          "I am isolated",
          "none",
          "none",
          "none",
          "none",
          "none",
          "none",
        ],
      },
      {
        label: label2,
        backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
        borderColor: window.chartColors.blue,
        pointBackgroundColor: window.chartColors.blue,
        data: [10, 3, 4, 3, 5, 8, 7],
        notes: [
          "Joined social club",
          "none",
          "none",
          "none",
          "none",
          "Was late one day",
          "Just broke up",
        ],
      },
      {
        label: label3,
        backgroundColor: color(window.chartColors.purple)
          .alpha(0.2)
          .rgbString(),
        borderColor: window.chartColors.purple,
        pointBackgroundColor: window.chartColors.purple,
        data: [0, 0, 1, 0, 0, 1, 0, 1, 2, 6],
        notes: [
          "none",
          "none",
          "none",
          "none",
          "Won at bingo",
          "none",
          "none",
          "Leg week",
          "Fed the poor",
          "Positive Mental Attitude",
        ],
      },
    ],
  },
  options: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Outcome Graph",
    },
    scale: {
      ticks: {
        beginAtZero: true,
      },
    },
    tooltips: {
      enabled: false,
      callbacks: {
        label: function (tooltipItem, data) {
          var datasetLabel =
            data.datasets[tooltipItem.datasetIndex].label || "";
          //This will be the tooltip.body
          return (
            datasetLabel +
            ": " +
            tooltipItem.yLabel +
            ": " +
            data.datasets[tooltipItem.datasetIndex].notes[tooltipItem.index]
          );
        },
      },
      custom: function (tooltip) {
        // Tooltip Element
        var tooltipEl = document.getElementById("chartjs-tooltip");
        if (!tooltipEl) {
          tooltipEl = document.createElement("div");
          tooltipEl.id = "chartjs-tooltip";
          tooltipEl.innerHTML = "<table></table>";
          document.body.appendChild(tooltipEl);
        }
        // Hide if no tooltip
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
        // Set caret Position
        tooltipEl.classList.remove("above", "below", "no-transform");
        if (tooltip.yAlign) {
          tooltipEl.classList.add(tooltip.yAlign);
        } else {
          tooltipEl.classList.add("no-transform");
        }
        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        // Set Text
        if (tooltip.body) {
          var titleLines = tooltip.title || [];
          var bodyLines = tooltip.body.map(getBody);
          var innerHtml = "<thead>";
          titleLines.forEach(function (title) {
            innerHtml += "<tr><th>" + title + "</th></tr>";
          });
          innerHtml += "</thead><tbody>";
          bodyLines.forEach(function (body, i) {
            var colors = tooltip.labelColors[i];
            var style = "background:" + colors.backgroundColor;
            style += "; border-color:" + colors.borderColor;
            style += "; border-width: 2px";
            var span =
              '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
            innerHtml += "<tr><td>" + span + body + "</td></tr>";
          });
          innerHtml += "</tbody>";
          var tableRoot = tooltipEl.querySelector("table");
          tableRoot.innerHTML = innerHtml;
        }
        var position = this._chart.canvas.getBoundingClientRect();
        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = position.left + tooltip.caretX + "px";
        tooltipEl.style.top = position.top + tooltip.caretY + "px";
        tooltipEl.style.fontFamily = tooltip._fontFamily;
        tooltipEl.style.fontSize = tooltip.fontSize;
        tooltipEl.style.fontStyle = tooltip._fontStyle;
        tooltipEl.style.padding =
          tooltip.yPadding + "px " + tooltip.xPadding + "px";
      },
    },
  },
};
window.onload = function () {
  window.myRadar = new Chart(document.getElementById("canvas"), config);
};
var colorNames = Object.keys(window.chartColors);
