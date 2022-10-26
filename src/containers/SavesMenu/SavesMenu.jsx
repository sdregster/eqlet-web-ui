import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import moment from 'moment/moment';
import ru from 'date-fns/locale/ru';
import 'react-day-picker/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCharacterAllSavesData,
  fetchExactCharacterSave,
  setSelectedSave,
} from '../../features/charactersSlice';
import { useSaveFilter } from '../../hooks/useSaveFilter';
import images from '../../constants/images';
import { BiX } from 'react-icons/bi';

import './SavesMenu.scss';

const SavesMenu = () => {
  const dispatch = useDispatch();
  const { saves, savesError, savesStatus } = useSelector((state) => state.character);
  const { selectedCharacter, selectedSave } = useSelector((state) => state.character);

  useEffect(() => {
    if (selectedCharacter.characterGUID !== undefined) {
      dispatch(fetchCharacterAllSavesData(selectedCharacter.characterGUID));
      setCalendarStatus(false); // Сброс календаря
      setFilter(''); // Сброс фильтра дат
      setSelectedDates([]);
    }
  }, [selectedCharacter, dispatch]);

  useEffect(() => {}, [selectedSave]);

  const selectSaveHandler = (save) => {
    dispatch(setSelectedSave(save));
    dispatch(fetchExactCharacterSave(save.saveGUID));
  };

  const dateConverter = (date) => {
    let rawDate = new Date(date);
    return format(rawDate, 'dd.MM.yyyy HH:mm:ss');
  };

  // Calendar and filtering
  const [selectedDates, setSelectedDates] = useState([]);
  const [calendarStatus, setCalendarStatus] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [filter, setFilter] = useState('');
  const filteredSaves = useSaveFilter(saves, filter, selectedDates);

  useEffect(() => {
    setAvailableDates(saves.map((save) => new Date(save.saveCreationDatetime)));
  }, [saves]);

  const applyBtnHandler = () => {
    setCalendarStatus(!calendarStatus);

    selectedDates.length !== 0
      ? selectedDates.length > 1
        ? setFilter(`Выбрано: ${selectedDates.length} д.`)
        : setFilter(format(selectedDates[0], 'dd.MM.yyyy'))
      : setFilter('');
  };

  const isDisabledDay = (day) =>
    availableDates.find(
      (availableDate) =>
        moment(day).format('YYYY-MM-DD') === moment(availableDate).format('YYYY-MM-DD'),
    ) === undefined;

  const footer = (
    <button className="saves-menu__content-calendar__btn" onClick={applyBtnHandler}>
      Ok
    </button>
  );

  const clearSearchFieldHandler = () => {
    setFilter('');
    setSelectedDates([]);
  };

  const inputFieldChangeHandler = (e) => {
    if (selectedDates.length === 1) {
      setSelectedDates([]);
      setFilter(e.target.value);
    } else if (selectedDates.length > 1) {
      return;
    } else {
      setFilter(e.target.value);
    }
  };

  return (
    <div className="saves-menu">
      <div className="saves-menu__header app__header">
        {savesStatus === 'loading' || saves.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <div>Сохранения</div>
        )}
      </div>

      <div className="saves-menu__content">
        <div className="saves-menu__content-filter">
          <input
            placeholder="Выбор даты"
            value={filter}
            onChange={inputFieldChangeHandler}
            type="text"></input>
          {filter.length > 0 ? <BiX onClick={clearSearchFieldHandler} /> : null}
          <img
            className="w-[45px]"
            onClick={() => setCalendarStatus(!calendarStatus)}
            alt="calendar"
            src={images.calendar}
          />
        </div>

        {calendarStatus && (
          <div className="saves-menu__content-calendar">
            <DayPicker
              defaultMonth={availableDates[0]}
              mode="multiple"
              locale={ru}
              selected={selectedDates}
              onSelect={setSelectedDates}
              disabled={isDisabledDay}
              footer={footer}
            />
          </div>
        )}

        <div className="saves-menu__content-list">
          {savesError && <h2>An error occured</h2>}
          {filteredSaves?.map((save) => (
            <div
              key={save.saveGUID}
              onClick={
                save.saveGUID === selectedSave.saveGUID ? null : () => selectSaveHandler(save)
              }
              className={
                selectedSave
                  ? save.saveGUID === selectedSave.saveGUID
                    ? 'saves-menu__content-item saves-menu__content-item-active'
                    : 'saves-menu__content-item'
                  : 'saves-menu__content-item'
              }>
              {dateConverter(save.saveCreationDatetime)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavesMenu;
