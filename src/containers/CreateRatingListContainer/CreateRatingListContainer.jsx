import React from "react";
import { Typography, Input, Button } from "antd";
import { useDispatch } from "hooks";
import { createRatingList } from "store/actions";
import "./CreateRatingListContainer.css";

export const CreateRatingListContainer = ({
  title = "1. Create your first rating"
}) => {
  const dispatch = useDispatch();

  const [ratingListId, setRatingListId] = React.useState("");

  const handleAdd = React.useCallback(() => {
    dispatch(createRatingList(ratingListId));
    setRatingListId("");
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
        {title}
      </Typography.Title>
      <Input
        className="rating-name-input"
        value={ratingListId}
        onChange={handleOnChange}
        placeholder="Rating List Name"
        onPressEnter={handleAdd}
      />
      <Button className="add-button" onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
};
