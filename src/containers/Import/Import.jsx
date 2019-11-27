import React from "react";
import { Button, message } from "antd";
import { keys, assoc } from "ramda";
import { useDispatch, useSelector } from "hooks";
import { setState } from "store/actions";
import { fromStorage } from "store/storageProvider";

const getNextKey = (listName, currentState) => {
  const match = listName.match(/(.*)\((\d+)\)$/);

  const name = match ? match[1].trim() : listName.trim();
  let number = Number.parseInt(match ? match[2] : 1);

  while (true) {
    const newName = `${name} (${number + 1})`;

    if (!currentState[newName]) return newName;

    number++;
  }
};

export const Import = () => {
  const dispatch = useDispatch();
  const currentState = useSelector(state => state);
  const handleImport = React.useCallback(() => {
    const importStateJson = window.prompt(
      "Скопируйте сюда данные полученные из кнопки експорт"
    );

    if (!importStateJson) return;

    try {
      const importedState = fromStorage(importStateJson);

      const resState = {
        ...currentState
      };

      for (let key of keys(importedState)) {
        if (!resState[key]) {
          resState[key] = importedState[key];
          continue;
        }

        const newName = window.prompt(
          `Импортированные данные содержат список который уже присутствует у вас: ${key}. Введите другое имя, если хотите сохранить предыдущий список`,
          getNextKey(key, resState)
        );

        if (!newName) continue;

        resState[newName] = assoc('ratingListId', newName, importedState[key]);
      }

      dispatch(setState(resState));
      message.success("Импорт удался");
    } catch (error) {
      message.error("Импорт не удался");
    }
  }, [dispatch, currentState]);
  return <Button onClick={handleImport}>Импорт</Button>;
};
