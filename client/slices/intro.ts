import { createSlice } from '@reduxjs/toolkit';

export type IntroState = {
  open: boolean;
};

const initialState: IntroState = {
  open: false,
};

const intro = createSlice({
  name: 'intro',
  initialState,
  reducers: {
    showIntro: () => ({
      open: true,
    }),
    hideIntro: () => ({
      open: false,
    }),
  },
});

export const { showIntro, hideIntro } = intro.actions;

export default intro.reducer;
