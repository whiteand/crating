import React from "react";
import { Typography, Input, Button } from "antd";
import { useDispatch } from "hooks";
import { createRatingList } from "store/actions";
import "./EmptyState.css";

export const EmptyState = () => {
  const dispatch = useDispatch();

  const [ratingListId, setRatingListId] = React.useState("");

  const handleAdd = React.useCallback(() => {
    dispatch(createRatingList(ratingListId));
  }, [dispatch, ratingListId]);

  const handleOnChange = React.useCallback(
    ({ target: { value } }) => {
      setRatingListId(value);
    },
    [setRatingListId]
  );

  return (
    <div className="empty-state-container">
      <Typography.Title className="create-rating-title" level={2}>
        Create your first rating
      </Typography.Title>
      <Input
        className="rating-name-input"
        value={ratingListId}
        onChange={handleOnChange}
        placeholder="Rating List Name"
      />
      <Button className="add-button" onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
};
