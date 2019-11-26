import React from "react";
import { keys } from "ramda";
import { Typography } from "antd";
import { useSelector } from "hooks";
import { CreateRatingListContainer, EditionState, Import } from "containers";
import "./Core.css";

export const Core = () => {
  const ratingLists = useSelector(keys);
  return (
    <div className="core-container">
      <Typography.Title level={1}>Crating</Typography.Title>
      {ratingLists.length === 0 ? (
        <CreateRatingListContainer key="1" />
      ) : (
        <EditionState key="1" />
      )}
      <Import/>
    </div>
  );
};
