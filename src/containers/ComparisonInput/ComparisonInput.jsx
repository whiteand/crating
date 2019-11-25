import React from "react";
import { Button, Typography } from "antd";
import "./ComparisonInput.css";
export const ComparisonInput = ({ comparisons, onComparison }) => {
  const [[a, b]] = comparisons;
  return (
    <div className="comparison-input-component">
      <Typography.Title level={3}>
        Выберите лучшее(осталось {comparisons.length} сравнений)
      </Typography.Title>
      <div className="comparison-input">
        <Button className="item-button" onClick={() => onComparison(a, b)}>
          {a}
        </Button>
        <Button className="item-button" onClick={() => onComparison(b, a)}>
          {b}
        </Button>
      </div>
    </div>
  );
};
