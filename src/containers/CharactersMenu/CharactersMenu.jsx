import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../constants/images';
import {
  fetchCharactersData,
  setSaves,
  setSelectedCharacter,
} from '../../features/charactersSlice';
import { useCharacterFilter } from '../../hooks/useCharacterFilter';
import './CharactersMenu.scss';

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
    <div className="characters-menu">
      <div className="characters-menu__header app__header">
        {charactersStatus === 'loading' ? <div>Loading...</div> : <div>Персонажи</div>}
      </div>
      <div className="characters-menu__content">
        <div className="characters-menu__content-filter">
          <img alt="searchIcon" src={images.questionMarkIcon} />
          <input
            placeholder="Поиск-фильтр"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="characters-menu__content-list">
          {charactersError && <h2>An error occured</h2>}
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
                    ? 'characters-menu__content-item characters-menu__content-item-active'
                    : 'characters-menu__content-item'
                  : 'characters-menu__content-item'
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
