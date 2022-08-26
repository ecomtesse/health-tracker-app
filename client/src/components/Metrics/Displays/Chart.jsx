// FusionCharts components
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";


ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Chart = ({ chartData, metric, metricInfo, capitalise }) => {
  // Create a JSON object to store the chart configurations
  const chartConfigs = {
    type: "line", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "",    //Set the chart caption
        subCaption: "",             //Set the chart subcaption
        xAxisName: "Date",           //Set the x-axis name
        yAxisName: `${capitalise(metric)} (${metricInfo[metric].unit})`,  //Set the y-axis name
        numberSuffix: "",
        theme: "fusion"                 //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chartData
    }
  }

  return (
    <ReactFC {...chartConfigs} />
  )
}

export default Chart