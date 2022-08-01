import Chart from "react-google-charts";
import React
  // ,  { Component } 
from "react";

const chart = (name, value) => {
  return (
    <Chart
      width={400}
      height={120}
      chartType="Gauge"
      loader={<div>Loading Chart</div>}
      data={[
        ["Label", "Value"],
        [name, value]
      ]}
      options={{
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75,
        yellowTo: 90,
        minorTicks: 5
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export default chart;
