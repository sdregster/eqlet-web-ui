import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import moment from 'moment/moment';
import ru from 'date-fns/locale/ru';
import 'react-day-picker/dist/style.css';
import './day-picker.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCharacterAllSavesData,
  fetchExactCharacterSave,
  setSelectedSave,
} from '../features/charactersSlice';
import { useSaveFilter } from '../hooks/useSaveFilter';
import images from '../constants/images';

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
    <button
      className="text-xs border-2 border-red-900 p-1 rounded-lg absolute right-[26px] bottom-[26px]"
      onClick={applyBtnHandler}>
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
    <div className="w-[180px] h-full p-2">
      <div className="rounded-lg text-2xl text-center font-medium text-red-900 w-full bg-orange-50 p-1">
        {savesStatus === 'loading' || saves.length === 0 ? (
          <div className="rounded-lg bg-orange-50 border-2 border-red-900 pb-1">Loading...</div>
        ) : (
          <div className="rounded-lg bg-orange-50 border-2 border-red-900 pb-1">Сохранения</div>
        )}
      </div>

      <div className="rounded-lg bg-orange-50 h-[518px] mt-4 p-1 shadow-[3px_3px_7px_1px_rgba(0,0,0,0.33)]">
        <div className="rounded-t-lg bg-orange-50 h-9 border-2 border-red-900 flex">
          <div className="pl-[4px] pt-[3px] relative">
            <input
              className="h-[24px] w-full text-xs px-2 border border-gray-500 placeholder:text-red-900 placeholder:text-center text-red-900 outline-none shadow-sm focus:border-red-900 focus:ring-red-900 focus:placeholder-transparent"
              placeholder="Выбор даты"
              value={filter}
              onChange={inputFieldChangeHandler}
              type="text"></input>
            {filter.length > 0 ? (
              <button onClick={clearSearchFieldHandler} className="absolute right-0 top-[6px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="rgb(127,29,29)"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="rgb(127,29,29)"
                  class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : null}
          </div>
          <img
            className="w-[45px]"
            onClick={() => setCalendarStatus(!calendarStatus)}
            alt="calendar"
            src={images.calendar}
          />
        </div>

        {calendarStatus && (
          <div className="z-10 fixed">
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

        <div className="rounded-b-lg mt-1 bg-orange-50 h-[470px] border-2 border-red-900 overflow-y-auto scrollbar-hide">
          {savesError && <h2 className="text-center">An error occured</h2>}
          {filteredSaves?.map((save) => (
            <div
              key={save.saveGUID}
              onClick={
                save.saveGUID === selectedSave.saveGUID ? null : () => selectSaveHandler(save)
              }
              className={
                selectedSave
                  ? save.saveGUID === selectedSave.saveGUID
                    ? 'h-[24px] m-1 px-1 py-0.5 text-xs text-center border-2 border-red-900 rounded-lg bg-red-900 text-orange-100 cursor-default'
                    : 'cursor-pointer h-[24px] m-1 px-1 py-0.5 text-xs text-center border-2 border-red-900 rounded-lg text-red-900'
                  : 'cursor-pointer h-[24px] m-1 px-1 py-0.5 text-xs text-center border-2 border-red-900 rounded-lg text-red-900'
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

// shadow-[3px_3px_10px_1px_rgba(0,0,0,0.33)]
