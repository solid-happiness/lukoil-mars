import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Snapshot } from 'client/typings';

type SnapshotsState = {
  snapshotId?: number;
  tankerId?: number;
  stationId?: number;
  list: Snapshot[];
};

const initialState: SnapshotsState = {
  list: [],
};

const snapshots = createSlice({
  name: 'snapshots',
  initialState,
  reducers: {
    setSnapshots: (
      state: SnapshotsState,
      action: PayloadAction<{ snapshots: Snapshot[] }>
    ): SnapshotsState => ({
      ...state,
      list: action.payload.snapshots,
    }),
    setActive: (
      state: SnapshotsState,
      action: PayloadAction<{
        snapshotId: number;
        tankerId?: number;
        stationId?: number;
      }>
    ): SnapshotsState => ({
      ...state,
      snapshotId: action.payload.snapshotId,
      tankerId: action.payload.tankerId,
      stationId: action.payload.stationId,
    }),
  },
});

export const { setSnapshots, setActive } = snapshots.actions;
export default snapshots.reducer;
