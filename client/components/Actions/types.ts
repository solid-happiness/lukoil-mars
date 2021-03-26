export type ReducerActionsState = {
  open: boolean;
  hovered: boolean;
};

export enum ReducerActionType {
  SET_OPEN,
  SET_ACTIVE,
  SET_HOVERED,
}

export type ReducerAction = {
  type: ReducerActionType;
  payload: boolean;
};
