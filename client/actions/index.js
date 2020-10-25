export const CREATE_POSTIT = 'CREATE_POSITIT';
export const DELETE_POSTIT = 'DELETE_POSTIT';
export const CREATE_BOARD = 'CREATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const NEXT_BOARD = 'NEXT_BOARD';
export const PREVIOUS_BOARD = 'PREVIOUS_BOARD';

export function createBoard(payload) {
  return { type: CREATE_BOARD, payload };
}

export function deleteBoard(payload) {
  return { type: DELETE_BOARD, payload };
}

export function createPostit(payload) {
  return { type: CREATE_POSTIT, payload };
}

export function deletePostit(payload) {
  return { type: DELETE_POSTIT, payload };
}

export function nextBoard(payload) {
  return { type: NEXT_BOARD, payload };
}

export function previousBoard(payload) {
  return { type: PREVIOUS_BOARD, payload };
}
