import React from "react";
import Visualization from "./Visualization";
import VisualizationCat from "./VisualizationCat";

const TotalV = (props) => {
  const { selectedYear } = props;
  return (
    <div className="bg-gray-900 flex h-[200vh] flex-col flex-grow p-20">
      <div className="flex-grow m-10 h-1/2">
        <VisualizationCat selectedYear={selectedYear} />
      </div>
      <div className="flex-grow m-10 h-1/2">
        <Visualization selectedYear={selectedYear} />
      </div>
    </div>
  );
};

export default TotalV;
