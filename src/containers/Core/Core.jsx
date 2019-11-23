import React from "react";
import { keys } from "ramda";
import { Typography } from "antd";
import { useSelector } from "hooks";
import { EmptyState, EditionState } from "containers";
import "./Core.css";

export const Core = () => {
  const ratingLists = useSelector(keys);
  return (
    <div class="core-container">
      <Typography.Title level={1}>Crating</Typography.Title>
      {ratingLists.length === 0 ? <EmptyState /> : <EditionState />}
    </div>
  );
};
