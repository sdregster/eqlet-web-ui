import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCharactersData = createAsyncThunk(
  'characters/fetchCharactersData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://miclient.ru/MiClient/api/SRPH/characters/all', {
        headers: {
          accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Can't fetch data. Server error.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCharacterAllSavesData = createAsyncThunk(
  'characters/fetchCharacterAllSavesData',
  async (characterGUID, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://miclient.ru/MiClient/api/SRPH/characters/${characterGUID}/saves`,
        {
          headers: {
            accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error("Can't fetch saves data. Server error.");
      }

      const data = await response.json();
      dispatch(fetchExactCharacterSave(data.reverse()[0].saveGUID));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchExactCharacterSave = createAsyncThunk(
  'characters/fetchExactCharacterSave',
  async (saveGUID, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://miclient.ru/MiClient/api/SRPH/characters/saves/${saveGUID}`,
        {
          headers: {
            accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error("Can't fetch exact save data. Server error.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: [],
    charactersStatus: null,
    charactersError: null,
    selectedCharacter: { exp: 0 },
    selectedSave: null,
    saves: [],
    savesStatus: null,
    savesError: null,
    exactCharacterCard: { exp: 0 },
    cardStatus: null,
    cardError: null,
  },
  reducers: {
    setSelectedCharacter(state, action) {
      state.selectedCharacter = action.payload;
    },
    setSaves(state, action) {
      state.saves = action.payload;
    },
    setSelectedSave(state, action) {
      state.selectedSave = action.payload;
    },
  },
  extraReducers: {
    [fetchCharactersData.pending]: (state) => {
      state.charactersStatus = 'loading';
      state.charactersError = null;
    },
    [fetchCharactersData.fulfilled]: (state, action) => {
      state.charactersStatus = 'resolved';
      const incomingData = action.payload;
      state.characters = incomingData;
      state.selectedCharacter = incomingData[0];
      state.charactersError = null;
    },
    [fetchCharactersData.rejected]: (state, action) => {
      state.charactersStatus = 'rejected';
      state.charactersError = action.payload;
    },
    [fetchCharacterAllSavesData.pending]: (state) => {
      state.savesStatus = 'loading';
      state.savesError = null;
    },
    [fetchCharacterAllSavesData.fulfilled]: (state, action) => {
      state.savesStatus = 'resolved';
      const incomingData = action.payload;
      state.saves = incomingData;
      state.selectedSave = incomingData[0];
      state.savesError = null;
    },
    [fetchCharacterAllSavesData.rejected]: (state, action) => {
      state.savesStatus = 'rejected';
      state.savesError = action.payload;
    },
    [fetchExactCharacterSave.pending]: (state) => {
      state.cardStatus = 'loading';
      state.cardError = null;
    },
    [fetchExactCharacterSave.fulfilled]: (state, action) => {
      state.cardStatus = 'resolved';
      state.exactCharacterCard = action.payload;
      state.cardError = null;
    },
    [fetchExactCharacterSave.rejected]: (state, action) => {
      state.cardStatus = 'rejected';
      state.cardError = action.payload;
    },
  },
});

export const { setSelectedCharacter, setSaves, setSelectedSave } = charactersSlice.actions;
export default charactersSlice.reducer;
