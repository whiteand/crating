import React from "react";
import { Typography, Input, Button } from "antd";
import { useDispatch } from "hooks";
import { addItem } from "store/actions";
import "./ItemInput.css";

const tokenizeInput = itemsListString =>
  itemsListString
    .replace(/,,/g, "__@COMMA@__")
    .split(",")
    .map(word => word.trim().replace(/__@COMMA@__/g, ","))
    .filter(Boolean);

export const ItemInput = ({ ratingListId, title }) => {
  const [itemsString, setItem] = React.useState("");

  const dispatch = useDispatch();

  const handleAddItem = React.useCallback(() => {
    const items = tokenizeInput(itemsString);
    for (let i = 0; i < items.length; i++) {
      dispatch(addItem(ratingListId, items[i]));
    }
    setItem("");
  }, [dispatch, itemsString, setItem, ratingListId]);

  return (
    <div className="item-input-container">
      <Typography.Title level={3}>{title}</Typography.Title>
      <div className="input-with-button">
        <Input
          value={itemsString}
          onChange={({ target: { value } }) => setItem(value)}
          onPressEnter={handleAddItem}
        />
        <Button className="add-button" onClick={handleAddItem}>
          Добавить
        </Button>
      </div>
    </div>
  );
};
