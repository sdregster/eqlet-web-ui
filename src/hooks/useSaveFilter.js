import { useMemo } from 'react';
import { format } from 'date-fns';

export const useSaveFilter = (saves, query, selectedDays) => {
  const filteredSaves = useMemo(() => {
    if (selectedDays.length > 0) {
      let whiteList = selectedDays.map((date) => format(date, 'dd.MM.yyyy'));
      return saves.filter((save) =>
        whiteList.includes(format(new Date(save.saveCreationDatetime), 'dd.MM.yyyy')),
      );
    } else {
      return saves.filter((save) =>
        format(new Date(save.saveCreationDatetime), 'dd.MM.yyyy HH:mm:ss').includes(query),
      );
    }
  }, [query, saves, selectedDays]);

  return filteredSaves;
};
