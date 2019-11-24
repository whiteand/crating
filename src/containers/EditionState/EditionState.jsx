import React from "react";
import { keys, pathOr, pipe, map } from "ramda";
import { Select, Typography, Button, Table } from "antd";
import {
  CreateRatingListContainer,
  ItemInput,
  ComparisonInput
} from "containers";
import { useSelector, useDispatch } from "hooks";
import { getSortedRating, getComparisonsToMake } from "selectors";
import { removeRatingList, addComparison } from "store/actions";
import "./EditionState.css";

export const EditionState = () => {
  const ratingListsIds = useSelector(keys);
  const [currentRatingListId, setCurrentRatingListId] = React.useState(
    ratingListsIds[0]
  );

  const itemToObj = item => ({ id: item, item });
  const currentItems = useSelector(
    pipe(pathOr([], [currentRatingListId, "items"]), map(itemToObj))
  );

  const currentSortedItems = useSelector(
    pipe(getSortedRating(currentRatingListId), map(itemToObj))
  );

  const dispatch = useDispatch();

  const handleRemoveRating = React.useCallback(() => {
    dispatch(removeRatingList(currentRatingListId));
  }, [dispatch, currentRatingListId]);

  const comparisonsToMake = useSelector(
    getComparisonsToMake(currentRatingListId)
  );

  const handleOnComparison = React.useCallback(
    (greater, less) => {
      console.log("add");
      dispatch(addComparison(currentRatingListId, greater, less));
    },
    [dispatch, currentRatingListId]
  );

  return (
    <div className="edition-state-container">
      <CreateRatingListContainer title="1. Add another rating list" />
      <Typography.Title level={2}>2. Select your rating list</Typography.Title>
      <div className="rating-list-selector-and-delete-button">
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
        <Button className="remove-rating-button" onClick={handleRemoveRating}>
          Delete
        </Button>
      </div>
      {currentRatingListId && <ItemInput ratingListId={currentRatingListId} />}
      {comparisonsToMake.length > 0 && (
        <ComparisonInput
          onComparison={handleOnComparison}
          comparisons={comparisonsToMake}
        />
      )}
      <div className="items">
        <Table
          columns={[
            {
              key: "item",
              dataIndex: "item",
              render(item) {
                return <div key={item}>{item}</div>;
              }
            }
          ]}
          dataSource={currentItems}
          rowKey="id"
        />
        <Table
          columns={[
            {
              key: "item",
              dataIndex: "item",
              render(item) {
                return <div key={item}>{item}</div>;
              }
            }
          ]}
          dataSource={currentSortedItems}
          rowKey="id"
        />
      </div>
    </div>
  );
};
