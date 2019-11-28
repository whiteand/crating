import React from "react";
import { keys } from "ramda";
import { Select, Typography } from "antd";
import { useSelector } from "hooks";
import "./Charts.scss";

export const Charts = () => {
  const ratingListsIds = useSelector(keys);
  const [xListId, setXListId] = React.useState(ratingListsIds[0]);
  const [yListId, setYListId] = React.useState(ratingListsIds[0]);

  return (
    <div className="charts-container">
      {ratingListsIds.length === 0 ? (
        <div className="empty-state">
          <Typography.Title level={2}>
            У вас нет ниодного рейтингового списка
          </Typography.Title>
        </div>
      ) : (
        <div className="input-lists-wrapper">
          <div className="list-select-wrapper x">
            <div className="label-wrapper">По горизонтали</div>
            <div className="select-wrapper">
              <Select
                className="select"
                value={xListId}
                getPopupContainer={() => document.querySelector(".app")}
                onChange={setXListId}
              >
                {ratingListsIds.map(id => (
                  <Select.Option value={id} key={id}>
                    {id}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="list-select-wrapper y">
            <div className="label-wrapper">По вертикали</div>
            <div className="select-wrapper">
              <Select
                className="select"
                value={yListId}
                getPopupContainer={() => document.querySelector(".app")}
                onChange={setYListId}
              >
                {ratingListsIds.map(id => (
                  <Select.Option value={id} key={id}>
                    {id}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
