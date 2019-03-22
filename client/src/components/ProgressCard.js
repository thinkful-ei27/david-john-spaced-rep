import React from "react";
import PieChart from "react-minimal-pie-chart";

export default function ProgressCard(props) {
  const { data, label } = props;
  return (
    <div className="w-1/4 h-full p-4 sm:p-8 md:p-16">
      <p className="font-bold text-center my-4">{label}</p>
      <PieChart
        data={data}
        totalValue={100}
        lineWidth={20}
        label
        labelStyle={{
          fontSize: "25px",
          fontFamily: "sans-serif"
        }}
        labelPosition={0}
      />
    </div>
  );
}
