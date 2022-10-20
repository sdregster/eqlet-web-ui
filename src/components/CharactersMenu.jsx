import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import images from '../constants/images';
import { fetchCharactersData, setSaves, setSelectedCharacter } from '../features/charactersSlice';
import { useCharacterFilter } from '../hooks/useCharacterFilter';

const CharactersMenu = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharactersData());
  }, [dispatch]);

  const { characters, charactersStatus, charactersError, selectedCharacter } = useSelector(
    (state) => state.character,
  );

  useEffect(() => {}, [selectedCharacter]);

  const selectCharacterHandler = (character) => {
    dispatch(setSaves([]));
    dispatch(setSelectedCharacter(character));
  };

  const [filter, setFilter] = useState('');
  const filteredCharacters = useCharacterFilter(characters, filter);

  return (
    <div className="w-[180px] h-full p-2">
      <div className="rounded-lg text-2xl text-center font-medium text-red-900 w-full bg-orange-50 p-1">
        {charactersStatus === 'loading' ? (
          <div className="rounded-lg bg-orange-50 border-2 border-red-900 pb-1">Loading...</div>
        ) : (
          <div className="rounded-lg bg-orange-50 border-2 border-red-900 pb-1">Персонажи</div>
        )}
      </div>
      <div className="rounded-lg bg-orange-50 h-[518px] mt-4 p-1 overflow-hidden shadow-[3px_3px_7px_1px_rgba(0,0,0,0.33)]">
        <div className="rounded-t-lg bg-orange-50 h-9 border-2 border-red-900 flex">
          <img alt="searchIcon" src={images.questionMarkIcon} />
          <input
            className="w-[114px] m-1 float-right text-xs px-2 border border-gray-500 placeholder:text-red-900 placeholder:text-center text-red-900 outline-none shadow-sm focus:border-red-900 focus:ring-red-900 focus:placeholder-transparent"
            placeholder="Поиск-фильтр"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="rounded-b-lg mt-1 bg-orange-50 h-[470px] border-2 border-red-900 overflow-y-auto scrollbar-hide">
          {charactersError && <h2 className="text-center">An error occured</h2>}
          {filteredCharacters?.map((character) => (
            <div
              key={character.characterGUID}
              onClick={
                character.characterGUID === selectedCharacter.characterGUID
                  ? null
                  : () => selectCharacterHandler(character)
              }
              className={
                selectedCharacter
                  ? character.characterGUID === selectedCharacter.characterGUID
                    ? 'h-[24px] m-1 px-1 py-0.5 text-xs text-center border-2 border-red-900 rounded-lg bg-red-900 text-orange-100 cursor-default'
                    : 'cursor-pointer h-[24px] m-1 px-1 py-0.5 text-xs text-center border-2 border-red-900 rounded-lg text-red-900'
                  : 'cursor-pointer h-[24px] m-1 px-1 py-0.5 text-xs text-center border-2 border-red-900 rounded-lg text-red-900'
              }>
              {character.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharactersMenu;
