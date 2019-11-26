import React from "react";
import { Button, message } from "antd";
import Clipboard from "react-clipboard.js";
import { useSelector } from "hooks";
import { toStorageValue } from "store/storageProvider";
import "./Export.css";

export const Export = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const stateJson = useSelector(toStorageValue);

  return (
    <div className="export-container">
      <Clipboard
        data-clipboard-text={stateJson}
        component="div"
        onSuccess={() => {
          console.log("somethign");
          setIsCollapsed(!isCollapsed);
          message.success(
            "Данные скопированы в буффер обмена. Вставьте их в окно которое появится при нажатии на кнопку Импорт"
          );
        }}
      >
        <Button>Експорт</Button>
      </Clipboard>
    </div>
  );
};
