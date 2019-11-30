import React from "react";
import { Typography } from "antd";
import "./ComparisonInput.scss";
export const ComparisonInput = ({ comparisons, onComparison }) => {
  const [[a, b]] = comparisons;
  return (
    <div className="comparison-input-component">
      <Typography.Title level={3}>
        Выберите лучшее(осталось {comparisons.length} сравнений)
      </Typography.Title>
      <div className="comparison-input" key={`${a} vs. ${b}`}>
        <button className="item-button" onClick={() => onComparison(a, b)}>
          {a}
        </button>
        <button className="item-button" onClick={() => onComparison(b, a)}>
          {b}
        </button>
      </div>
    </div>
  );
};
