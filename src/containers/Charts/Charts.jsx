import React from "react";
import { keys } from 'ramda'
import { Select } from "antd";
import { useSelector } from "hooks";
import "./Charts.scss";

export const Charts = () => {
  const ratingListsIds = useSelector(keys);
  const [xListId, setXListId] = React.useState(ratingListsIds[0]);
  const [yListId, setYListId] = React.useState(ratingListsIds[1]);

  return (
    <div className="charts-container">
      {ratingListsIds.lenght === 0 ? (
        <div className="empty-state"></div>
      ) : (
        <div clasName="input-lists-wrapper">
          <div className="list-select-wrapper x">
            <div className="label-wrapper">По горизонтали</div>
            <div className="select">
              <Select
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
            <div className="select">
            <Select
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
