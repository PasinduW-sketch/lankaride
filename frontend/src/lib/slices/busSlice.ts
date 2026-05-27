import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BusState {
  searchQuery: {
    from: string;
    to: string;
    date: string;
  };
  selectedBusId: number | null;
}

const initialState: BusState = {
  searchQuery: {
    from: '',
    to: '',
    date: '',
  },
  selectedBusId: null,
};

export const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<BusState['searchQuery']>) => {
      state.searchQuery = action.payload;
    },
    setSelectedBusId: (state, action: PayloadAction<number | null>) => {
      state.selectedBusId = action.payload;
    },
  },
});

export const { setSearchQuery, setSelectedBusId } = busSlice.actions;
export default busSlice.reducer;
