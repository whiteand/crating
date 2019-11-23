import React from "react";
import { keys } from "ramda";
import { Select, Typography } from "antd";
import { useSelector } from "hooks";
import "./EditionState.css";

export const EditionState = () => {
  const ratingListsIds = useSelector(keys);
  const [currentRatingListId, setCurrentRatingListId] = React.useState(
    ratingListsIds[0]
  );

  return (
    <div className="edition-state-container">
      <Typography.Title level={2}>Select your rating list</Typography.Title>
      <Select
        className="rating-list-selector"
        value={currentRatingListId}
        options={ratingListsIds}
        onChange={setCurrentRatingListId}
        getPopupContainer={() => document.querySelector(".app")}
      >
        {ratingListsIds.map(id => (
          <Select.Option value={id} key={id}>
            {id}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
