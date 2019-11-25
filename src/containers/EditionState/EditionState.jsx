import React from "react";
import { keys, pathOr, pipe, map } from "ramda";
import { Select, Typography, Button, Table, Popover } from "antd";
import {
  CreateRatingListContainer,
  ItemInput,
  ComparisonInput
} from "containers";
import { useSelector, useDispatch } from "hooks";
import {
  getSortedRating,
  getComparisonsToMake,
  getComparisonsGetter
} from "selectors";
import {
  removeRatingList,
  addComparison,
  removeComparison,
  removeItem
} from "store/actions";
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
    const ratingListId = currentRatingListId;
    dispatch(removeRatingList(ratingListId));
    setCurrentRatingListId(ratingListsIds.filter(id => id !== ratingListId)[0]);
  }, [dispatch, currentRatingListId, setCurrentRatingListId, ratingListsIds]);

  const comparisonsToMake = useSelector(
    getComparisonsToMake(currentRatingListId)
  );

  const handleOnComparison = React.useCallback(
    (greater, less) =>
      dispatch(addComparison(currentRatingListId, greater, less)),
    [dispatch, currentRatingListId]
  );

  const getComparisons = useSelector(getComparisonsGetter(currentRatingListId));

  const handleRemoveComparison = React.useCallback(
    (greater, less) => {
      dispatch(removeComparison(currentRatingListId, greater, less));
    },
    [dispatch, currentRatingListId]
  );

  const handleRemoveItem = React.useCallback(
    (item, withComparisons) => {
      dispatch(removeItem(currentRatingListId, item, withComparisons));
    },
    [dispatch, currentRatingListId]
  );

  return (
    <div className="edition-state-container">
      <CreateRatingListContainer title="1. Создать другой рейтинг" />
      {ratingListsIds.length > 1 && (
        <div>
          <Typography.Title level={3}>
            2. Выберите рейтинговый список
          </Typography.Title>
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
            <Button
              className="remove-rating-button"
              onClick={handleRemoveRating}
            >
              Удалить
            </Button>
          </div>
        </div>
      )}
      {currentRatingListId && <ItemInput ratingListId={currentRatingListId} title={`${ratingListsIds.length > 1 ? 3 : 2}. Добавьте елемент в рейтинг:`}/>}
      <div className="comparison-input-wrapper">
        {comparisonsToMake.length > 0 && (
          <ComparisonInput
            onComparison={handleOnComparison}
            comparisons={comparisonsToMake}
          />
        )}
      </div>
      <div className="items">
        <div className="table-wrapper">
          <Table
            columns={[
              {
                title: "#",
                key: "index",
                render(_, _row, index) {
                  return <div key={index}>{index + 1}</div>;
                }
              },
              {
                title: currentRatingListId,
                key: "item",
                dataIndex: "item",
                render(item) {
                  return (
                    <Popover
                      key={item}
                      title={item}
                      getPopupContainer={() => document.querySelector(".app")}
                      content={
                        <div className="comparisons-list">
                          {getComparisons(item).map(([greater, less]) => {
                            return (
                              <div
                                className="comparison"
                                key={`${greater} > ${less}`}
                              >
                                <div className="comparison-statement">
                                  {greater === item
                                    ? `${item} > ${less}`
                                    : `${item} < ${greater}`}
                                </div>
                                <Button
                                  onClick={() =>
                                    handleRemoveComparison(greater, less)
                                  }
                                >
                                  x
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      }
                    >
                      <div>{item}</div>
                    </Popover>
                  );
                }
              },
              {
                title: "Действия",
                dataIndex: "item",
                key: "remove",
                render(item, row) {
                  return (
                    <div key={item} className="remove-item-buttons">
                      <Button
                        className="remove-item-button"
                        onClick={() => handleRemoveItem(item, true)}
                      >
                        Х
                      </Button>
                    </div>
                  );
                }
              }
            ]}
            dataSource={currentItems}
            rowKey="id"
            pagination={false}
          />
        </div>
        <div className="table-wrapper sorted">
          <Table
            pagination={false}
            columns={[
              {
                title: "Созданный рейтинг",
                key: "index",
                render(_, _row, index) {
                  return <div key={index}>{index + 1}</div>;
                }
              },
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
    </div>
  );
};
