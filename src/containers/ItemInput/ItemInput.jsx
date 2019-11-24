import React from "react";
import { Typography, Input, Button } from "antd";
import { useDispatch } from "hooks";
import { addItem } from "store/actions";
import "./ItemInput.css";

export const ItemInput = ({ ratingListId }) => {
  const [item, setItem] = React.useState("");
  const dispatch = useDispatch();
  const handleAddItem = React.useCallback(() => {
    dispatch(addItem(ratingListId, item));
    setItem("");
  }, [dispatch, item, setItem, ratingListId]);
  return (
    <div className="item-input-container">
      <Typography.Title level={2}>3. Enter rating list items:</Typography.Title>
      <div className="input-with-button">
        <Input
          value={item}
          onChange={({ target: { value } }) => setItem(value)}
          onPressEnter={handleAddItem}
        />
        <Button className="add-button" onClick={handleAddItem}>
          Add
        </Button>
      </div>
    </div>
  );
};