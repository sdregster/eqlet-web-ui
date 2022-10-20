import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import images from '../constants/images';

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
    <div>
      {exactCharacterCard && (
        <div className="w-[552px] h-full p-2">
          <div className="rounded-lg text-2xl text-center font-medium text-red-900 bg-orange-50 p-1">
            <div className="rounded-lg bg-orange-50 border-2 border-red-900 pb-1">
              {exactCharacterCard.name !== undefined ? exactCharacterCard.name : 'Loading...'}
            </div>
          </div>
          <div className="rounded-lg bg-orange-50 h-[518px] mt-4 shadow-[3px_3px_7px_1px_rgba(0,0,0,0.33)]">
            <div className="flex p-1">
              <div className="h-[128px] w-[128px] bg-orange-50 mr-1 p-0.5 border-2 border-red-900 rounded-lg  justify-center items-center overflow-hidden">
                <img
                  className="overflow-hidden"
                  alt="avatar"
                  src={
                    exactCharacterCard.avatarGUID !== undefined &&
                    exactCharacterCard.avatarGUID.length > 0
                      ? `https://miclient.ru/MiClient/api/SRPH/picture/${exactCharacterCard.avatarGUID}`
                      : images.questionMarkIcon
                  }></img>
              </div>
              <div className="h-[128px] w-[403px]">
                <div className="">
                  <div className="h-[62px] flex">
                    <div className="h-[62px] w-[63px] p-0.5 bg-orange-50 mr-1 border-2 border-red-900 rounded-lg  justify-center items-center">
                      <img width="54px" alt="race" src={racesMap[exactCharacterCard.race]}></img>
                    </div>
                    <div className="h-[62px] w-[331px]">
                      <div className="flex">
                        <div className="h-[29px] font-bold text-red-900 rounded-l-lg text-center text-xs p-1 min-w-[62px] bg-orange-50 border border-l-2 border-y-2 border-red-900">
                          {aditionalExpInfo.currentLevel + ' lvl'}
                        </div>
                        <div className="w-full bg-orange-50 border-2 border-red-900 h-[29px]">
                          <div
                            className="bg-red-900 text-orange-100 text-center text-xs p-1 h-full"
                            style={{ width: `${aditionalExpInfo.hpPercantage}%` }}></div>
                        </div>
                        <div className="h-[29px] font-bold text-red-900 rounded-r-lg text-center text-xs p-1 min-w-[62px] w-1/6 bg-orange-50 border-r-2 border-y-2 border-red-900">
                          {exactCharacterCard.exp + ' exp'}
                        </div>
                      </div>
                      <div className="flex mt-1">
                        <div className="h-[29px] font-bold text-red-900 rounded-l-lg text-center text-xs p-1 min-w-[62px] bg-orange-50 border border-l-2 border-y-2 border-red-900">
                          {exactCharacterCard.curHP !== undefined
                            ? exactCharacterCard.curHP + ' hp'
                            : null}
                        </div>
                        <div className="w-full bg-orange-50 border-2 border-red-900 h-[29px]">
                          <div
                            className="bg-red-900 text-orange-100 text-center text-xs p-1 h-full"
                            style={{
                              width: `${
                                (exactCharacterCard.curHP * 100) / exactCharacterCard.maxHP
                              }%`,
                            }}></div>
                        </div>
                        <div className="h-[29px] font-bold text-red-900 rounded-r-lg text-center text-xs p-1 min-w-[62px] w-1/6 bg-orange-50 border-r-2 border-y-2 border-red-900">
                          {exactCharacterCard.maxHP !== undefined
                            ? exactCharacterCard.maxHP + ' hp'
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[62px] mt-1 flex">
                    <div className="h-[62px] w-[63px] p-0.5 bg-orange-50 mr-1 border-2 border-red-900 rounded-lg  justify-center items-center">
                      <img
                        width="54px"
                        alt="chClass"
                        src={chClassesMap[exactCharacterCard.chClass]}></img>
                    </div>
                    <div className="h-[62px] w-[63px] bg-orange-50 mr-1 border-2 border-red-900 rounded-lg  justify-center items-center">
                      <div className="h-1/3 border-b border-red-900 justify-center items-center">
                        <img
                          className="m-auto"
                          width="17px"
                          alt="stamina"
                          src={images.stamina}></img>
                      </div>
                      <div className="h-1/3 border-y border-red-900 text-xs text-center text-red-900">
                        {statConverter(exactCharacterCard.stamina)}
                      </div>
                      <div className="h-1/3 border-t border-red-900 text-xs text-center text-red-900">
                        {statConverter(exactCharacterCard.buffStamina)}
                      </div>
                    </div>
                    <div className="h-[62px] w-[63px] bg-orange-50 mr-1 border-2 border-red-900 rounded-lg  justify-center items-center">
                      <div className="h-1/3 border-b border-red-900 justify-center items-center">
                        <img className="m-auto" width="17px" alt="power" src={images.power}></img>
                      </div>
                      <div className="h-1/3 border-y border-red-900 text-xs text-center text-red-900">
                        {statConverter(exactCharacterCard.power)}
                      </div>
                      <div className="h-1/3 border-t border-red-900 text-xs text-center text-red-900">
                        {statConverter(exactCharacterCard.buffPower)}
                      </div>
                    </div>
                    <div className="h-[62px] w-[63px] bg-orange-50 mr-1 border-2 border-red-900 rounded-lg  justify-center items-center">
                      <div className="h-1/3 border-b border-red-900 justify-center items-center">
                        <img
                          className="m-auto"
                          width="17px"
                          alt="agility"
                          src={images.agility}></img>
                      </div>
                      <div className="h-1/3 border-y border-red-900 text-xs text-center text-red-900">
                        {statConverter(exactCharacterCard.agility)}
                      </div>
                      <div className="h-1/3 border-t border-red-900 text-xs text-center text-red-900">
                        {statConverter(exactCharacterCard.buffAgility)}
                      </div>
                    </div>
                    <div className="h-[62px] w-[63px] bg-orange-50 mr-1 border-2 border-red-900 rounded-lg  justify-center items-center">
                      <div className="h-1/3 border-b border-red-900 justify-center items-center">
                        <img
                          className="m-auto"
                          width="17px"
                          alt="intelligence"
                          src={images.intelligence}></img>
                      </div>
                      <div className="h-1/3 border-y border-red-900 text-xs text-center text-red-900">
                        {statConverter(exactCharacterCard.intelligence)}
                      </div>
                      <div className="h-1/3 border-t border-red-900 text-xs text-center text-red-900">
                        {statConverter(exactCharacterCard.buffIntelligence)}
                      </div>
                    </div>
                    <div className="h-[62px] w-[63px] bg-orange-50 border-2 border-red-900 rounded-lg  justify-center items-center">
                      <div className="h-1/3 border-b border-red-900 justify-center items-center">
                        <img
                          className="m-auto"
                          width="17px"
                          alt="charisma"
                          src={images.charisma}></img>
                      </div>
                      <div className="h-1/3 border-y border-red-900 text-xs text-center text-red-900">
                        {statConverter(exactCharacterCard.charisma)}
                      </div>
                      <div className="h-1/3 border-t border-red-900 text-xs text-center text-red-900">
                        {statConverter(exactCharacterCard.buffCharisma)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-1">
              <div className="w-full rounded-lg bg-orange-50 border-red-900 border-2 h-[36px] flex py-0.5 px-1 box-border">
                <button onClick={() => setActiveTab('effects')} className="mr-0.5">
                  <img
                    width="26px"
                    alt="effects"
                    src={
                      activeTab === 'effects'
                        ? images.effectsAct_CharaterWindow
                        : images.effects_CharaterWindow
                    }></img>
                </button>
                <button onClick={() => setActiveTab('history')} className="mr-0.5">
                  <img
                    width="26px"
                    alt="history"
                    src={
                      activeTab === 'history'
                        ? images.historyAct_CharaterWindow
                        : images.history_CharaterWindow
                    }></img>
                </button>
                <button onClick={() => setActiveTab('items')} className="mr-0.5">
                  <img
                    width="26px"
                    alt="items"
                    src={
                      activeTab === 'items'
                        ? images.inventoryAct_CharaterWindow
                        : images.inventory_CharaterWindow
                    }></img>
                </button>
                <button onClick={() => setActiveTab('specialAbility')} className="mr-0.5">
                  <img
                    width="26px"
                    alt="specialAbility"
                    src={
                      activeTab === 'specialAbility'
                        ? images.specialAbilitiesAct_CharaterWindow
                        : images.specialAbilities_CharaterWindow
                    }></img>
                </button>
                <button onClick={() => setActiveTab('battleResorce')} className="mr-0.5">
                  <img width="26px" alt="battleResources" src={images.questionMarkIcon}></img>
                </button>
              </div>
              <div className="w-full rounded-lg bg-orange-50 mt-1 border-red-900 border-2 h-[338px] scrollbar-hide">
                <div className="w-full text-xl text-center p-2 text-red-900 mt-1">
                  {tabsMap[activeTab]}
                </div>
                <div className="w-full p-2 text-justify text-red-900 whitespace-pre-wrap">
                  {exactCharacterCard[activeTab]}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
