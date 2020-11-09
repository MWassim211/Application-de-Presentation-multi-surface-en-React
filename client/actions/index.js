export const CREATE_POSTIT = 'CREATE_POSITIT';
export const DELETE_POSTIT = 'DELETE_POSTIT';
export const CREATE_BOARD = 'CREATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const NEXT_BOARD = 'NEXT_BOARD';
export const PREVIOUS_BOARD = 'PREVIOUS_BOARD';
export const NEXT_POSTIT = 'NEXT_POSTIT';
export const PREVIOUS_POSTIT = 'PREVIOUS_POSTIT';
export const SET_INDEX = 'SET_INDEX';

export function createBoard(payload, meta) {
  return { type: CREATE_BOARD, payload, meta };
}

export function deleteBoard(payload, meta) {
  return { type: DELETE_BOARD, payload, meta };
}

export function createPostit(payload, meta) {
  return { type: CREATE_POSTIT, payload, meta };
}

export function deletePostit(payload, meta) {
  return { type: DELETE_POSTIT, payload, meta };
}

export function nextBoard(payload, meta) {
  return { type: NEXT_BOARD, payload, meta };
}

export function previousBoard(payload, meta) {
  return { type: PREVIOUS_BOARD, payload, meta };
}

export function setIndex(payload, meta) {
  return { type: SET_INDEX, payload, meta };
}

export function nextPostit(payload, meta) {
  return { type: NEXT_POSTIT, payload, meta };
}

export function previousPostit(payload, meta) {
  return { type: PREVIOUS_POSTIT, payload, meta };
}
