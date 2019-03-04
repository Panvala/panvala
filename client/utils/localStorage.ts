const LOCAL_STATE = 'LOCAL_STATE';

export function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STATE, serializedState);
  } catch (error) {
    console.warn('Warning: failed to set to local storage', state);
    // Ignore write errors.
  }
}

export function loadState() {
  try {
    const serializedState = localStorage.getItem(LOCAL_STATE);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}
