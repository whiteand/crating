import React from "react";
import { keys, uniq } from "ramda";
import { Select, Typography, Checkbox } from "antd";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  Scatter
} from "recharts";
import { useSelector } from "hooks";
import { getSortedRating } from "selectors";
import "./Charts.scss";

const getValue = (item, rating) => {
  if (rating.length === 0) return -1;

  const index = rating.indexOf(item);

  if (index === -1) return -1;

  if (rating.length === 1) return 50;

  const percents = (100 * (rating.length - index - 1)) / (rating.length - 1);

  return percents;
};

const getDotSize = (list1, list2) => {
  // Math.max(xRating.length, yRating.length) > 0
  //   ? 360 / Math.max(xRating.length, yRating.length)
  //   : 2;
  return 100;
};

export const Charts = () => {
  const ratingListsIds = useSelector(keys);
  const [xListId, setXListId] = React.useState(ratingListsIds[0]);
  const [yListId, setYListId] = React.useState(ratingListsIds[0]);
  const [isLabelsShown, setIsLabelsShown] = React.useState(true);

  React.useEffect(() => {
    if (ratingListsIds.length === 0) return;
    if (ratingListsIds.length === 1) {
      setXListId(ratingListsIds[0]);
      setYListId(ratingListsIds[0]);
      return;
    }
    setXListId(ratingListsIds[0]);
    setYListId(ratingListsIds[1]);
  }, [ratingListsIds]);

  const xRating = useSelector(getSortedRating(xListId));
  const yRating = useSelector(getSortedRating(yListId));

  const allValues = uniq([...xRating, ...yRating]);

  const data = allValues.map(value => ({
    x: getValue(value, xRating),
    y: getValue(value, yRating),
    z: getDotSize(xRating, yRating),
    item: value
  }));

  return (
    <div className="charts-container">
      {ratingListsIds.length === 0 ? (
        <div className="empty-state">
          <Typography.Title level={2}>
            У вас нет ниодного рейтингового списка
          </Typography.Title>
        </div>
      ) : (
        <div className="not-empty-state">
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
          {data.length > 1 && (
            <div className="chart-wrapper">
              <div className="labels-checkbox-wrapper">
                <Checkbox
                  checked={isLabelsShown}
                  onChange={({ target: { checked } }) =>
                    setIsLabelsShown(checked)
                  }
                >
                  Показывать подписи
                </Checkbox>
              </div>
              <ScatterChart
                margin={{ top: 10, left: 10, right: 10, bottom: 10 }}
                width={720}
                height={720}
              >
                <CartesianGrid />
                <XAxis
                  dataKey="x"
                  type="number"
                  name={xListId}
                  label={xListId}
                  tick={false}
                  unit="%"
                  range={[-1, 100]}
                />
                <YAxis
                  dataKey="y"
                  type="number"
                  name={yListId}
                  tick={false}
                  label={{ value: yListId, angle: -90 }}
                  unit="%"
                  range={[-1, 100]}
                />
                <Tooltip
                  content={({ payload: axes }) => {
                    if (axes.length <= 0) return null;

                    const { payload } = axes[0];

                    return (
                      <div className="tooltip">
                        <div className="tooltip-pair">
                          <div className="tooltip-label">Элемент</div>
                          <div className="tooltip-value">{payload.item}</div>
                        </div>
                        <div className="tooltip-pair">
                          <div className="tooltip-label">В "{xListId}"</div>
                          <div className="tooltip-value">
                            {xRating.indexOf(payload.item) + 1}
                          </div>
                        </div>
                        <div className="tooltip-pair">
                          <div className="tooltip-label">В "{yListId}"</div>
                          <div className="tooltip-value">
                            {yRating.indexOf(payload.item) + 1}
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />
                <Legend margin={{ top: 10 }} />
                <Scatter
                  name={`${xListId} vs ${yListId}`}
                  data={data}
                  fill="#333"
                  className="with-small-labels"
                >
                  {isLabelsShown && <LabelList dataKey="item" />}
                </Scatter>
              </ScatterChart>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
