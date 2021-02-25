import { createSelector } from 'reselect';

const selectRaw = (state) => state.process.form;

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const checkpointFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
};

export default checkpointFormSelectors;
