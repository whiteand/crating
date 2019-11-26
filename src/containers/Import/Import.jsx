import React from "react";
import { Button, message } from "antd";
import { useDispatch } from "hooks";
import { setState } from "store/actions";
import { fromStorage } from "store/storageProvider";

export const Import = () => {
  const dispatch = useDispatch();
  const handleImport = React.useCallback(() => {
    const json = window.prompt(
      "Скопируйте сюда данные полученные из кнопки експорт"
    );

    if (!json) return;

    try {
      const state = fromStorage(json);

      dispatch(setState(state));
      message.success("Импорт удался");
    } catch (error) {
      message.error("Импорт не удался");
    }
  }, [dispatch]);
  return <Button onClick={handleImport}>Импорт</Button>;
};
