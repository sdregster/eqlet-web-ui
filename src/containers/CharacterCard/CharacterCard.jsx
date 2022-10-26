import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import images from '../../constants/images';

import './CharacterCard.scss';

const CharacterCard = () => {
  const { exactCharacterCard } = useSelector((state) => state.character);
  const [activeTab, setActiveTab] = useState('effects');
  const [aditionalExpInfo, setAdditionalExpInfo] = useState({ currentLevel: '', hpPercantage: '' });

  useEffect(() => {
    levelCalculation(exactCharacterCard.exp);
  }, [exactCharacterCard]);

  const levelCalculation = (exp) => {
    const expPoints = [50, 150, 300, 500, 800, 1300, 2000, 3500, 6000];
    for (let index = 0; index < expPoints.length; index++) {
      const element = expPoints[index];
      if (exp < element) {
        setAdditionalExpInfo({
          currentLevel: index + 1,
          hpPercantage: Math.ceil((exp * 100) / element),
        });
        break;
      }
    }
  };

  const tabsMap = {
    effects: 'Эффекты',
    history: 'История',
    items: 'Предметы',
    specialAbility: 'Спец. способоности',
    battleResorce: 'Боевые ресурсы',
  };

  const statConverter = (value) => {
    if (value > 0) {
      return '+' + value;
    } else {
      return value;
    }
  };

  const chClassesMap = {
    0: images.chClassWarriorAct,
    1: images.chClassBarbarianAct,
    2: images.chClassPaladinAct,
    3: images.chClassHunterAct,
    4: images.chClassMageAct,
    5: images.chClassWarlockAct,
    6: images.chClassRogueAct,
    7: images.chClassPriestAct,
    8: images.chClassDruidAct,
    9: images.chClassMehAct,
  };

  const racesMap = {
    0: images.raceEarthPoniesAct,
    1: images.raceDonkeyAct,
    2: images.racePegasusAct,
    3: images.raceGriffinsAct,
    4: images.raceUnicornsAct,
    5: images.raceZebrasAct,
    6: images.raceYaksAct,
    7: images.raceBisonsAct,
    8: images.raceChangelingsAct,
    9: images.raceFestralsAct,
  };

  return (
    <div className="characters-card">
      <div className="characters-card__header app__header">
        <div className="app__border">
          {exactCharacterCard.name !== undefined ? exactCharacterCard.name : 'Loading...'}
        </div>
      </div>

      <div className="characters-card__content">
        <div className="characters-card__content-avatar app__border">
          <img
            alt="avatar"
            src={
              exactCharacterCard.avatarGUID !== undefined &&
              exactCharacterCard.avatarGUID.length > 0
                ? `https://miclient.ru/MiClient/api/SRPH/picture/${exactCharacterCard.avatarGUID}`
                : images.questionMarkIcon
            }></img>
        </div>
        <div className="characters-card__content-race app__border">
          <img alt="race" src={racesMap[exactCharacterCard.race]}></img>
        </div>
        <div className="characters-card__content-class app__border">
          <img alt="chClass" src={chClassesMap[exactCharacterCard.chClass]}></img>
        </div>

        <div className="characters-card__content-level app__border">
          <div className="characters-card__content__progress-left">
            {aditionalExpInfo.currentLevel + ' lvl'}
          </div>
          <div className="characters-card__content__progress-bar">
            <div
              className="bg-red-900 text-orange-100 text-center text-xs p-1 h-full"
              style={{ width: `${aditionalExpInfo.hpPercantage}%` }}></div>
          </div>
          <div className="characters-card__content__progress-right">
            {exactCharacterCard.exp + ' exp'}
          </div>
        </div>

        <div className="characters-card__content-hp app__border">
          <div className="characters-card__content__progress-left">
            {exactCharacterCard.curHP !== undefined ? exactCharacterCard.curHP + ' hp' : null}
          </div>
          <div className="characters-card__content__progress-bar">
            <div
              className="bg-red-900 text-orange-100 text-center text-xs p-1 h-full"
              style={{
                width: `${(exactCharacterCard.curHP * 100) / exactCharacterCard.maxHP}%`,
              }}></div>
          </div>
          <div className="characters-card__content__progress-right">
            {exactCharacterCard.maxHP !== undefined ? exactCharacterCard.maxHP + ' hp' : null}
          </div>
        </div>

        <div className="characters-card__content-stamina app__border">
          <div className="characters-card__content__stat-icon">
            <img alt="stamina" src={images.stamina}></img>
          </div>
          <div className="characters-card__content__stat-value app__small-text">
            {statConverter(exactCharacterCard.stamina)}
          </div>
          <div className="characters-card__content__stat-buffed-value app__small-text">
            {statConverter(exactCharacterCard.buffStamina)}
          </div>
        </div>
        <div className="characters-card__content-power app__border">
          <div className="characters-card__content__stat-icon">
            <img alt="power" src={images.power}></img>
          </div>
          <div className="characters-card__content__stat-value app__small-text">
            {statConverter(exactCharacterCard.power)}
          </div>
          <div className="characters-card__content__stat-buffed-value app__small-text">
            {statConverter(exactCharacterCard.buffPower)}
          </div>
        </div>
        <div className="characters-card__content-agility app__border">
          <div className="characters-card__content__stat-icon">
            <img alt="agility" src={images.agility}></img>
          </div>
          <div className="characters-card__content__stat-value app__small-text">
            {statConverter(exactCharacterCard.agility)}
          </div>
          <div className="characters-card__content__stat-buffed-value app__small-text">
            {statConverter(exactCharacterCard.buffAgility)}
          </div>
        </div>
        <div className="characters-card__content-intelligence app__border">
          <div className="characters-card__content__stat-icon">
            <img alt="intelligence" src={images.intelligence}></img>
          </div>
          <div className="characters-card__content__stat-value app__small-text">
            {statConverter(exactCharacterCard.intelligence)}
          </div>
          <div className="characters-card__content__stat-buffed-value app__small-text">
            {statConverter(exactCharacterCard.buffIntelligence)}
          </div>
        </div>
        <div className="characters-card__content-charisma app__border">
          <div className="characters-card__content__stat-icon">
            <img alt="charisma" src={images.charisma}></img>
          </div>
          <div className="characters-card__content__stat-value app__small-text">
            {statConverter(exactCharacterCard.charisma)}
          </div>
          <div className="characters-card__content__stat-buffed-value app__small-text">
            {statConverter(exactCharacterCard.buffCharisma)}
          </div>
        </div>
        <div className="characters-card__content-tabs app__border">
          <img
            onClick={() => setActiveTab('effects')}
            alt="effects"
            src={
              activeTab === 'effects'
                ? images.effectsAct_CharaterWindow
                : images.effects_CharaterWindow
            }></img>
          <img
            onClick={() => setActiveTab('history')}
            alt="history"
            src={
              activeTab === 'history'
                ? images.historyAct_CharaterWindow
                : images.history_CharaterWindow
            }></img>

          <img
            onClick={() => setActiveTab('items')}
            alt="items"
            src={
              activeTab === 'items'
                ? images.inventoryAct_CharaterWindow
                : images.inventory_CharaterWindow
            }></img>
          <img
            onClick={() => setActiveTab('specialAbility')}
            alt="specialAbility"
            src={
              activeTab === 'specialAbility'
                ? images.specialAbilitiesAct_CharaterWindow
                : images.specialAbilities_CharaterWindow
            }></img>
          <img
            onClick={() => setActiveTab('battleResorce')}
            alt="battleResources"
            src={images.questionMarkIcon}></img>
        </div>
        <div className="characters-card__content-info app__border">
          <div className="characters-card__content-info__title">{tabsMap[activeTab]}</div>
          <div className="characters-card__content-info__desc">{exactCharacterCard[activeTab]}</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
