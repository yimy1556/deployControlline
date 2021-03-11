import { createSelector } from 'reselect';

const selectView = (state) => state.config.checkpoint.view;

const selectEdition = createSelector(
  [selectView],
  (view) => view.edition,
);

const selectViewCheckpoint = createSelector(
  [selectView],
  (view) => view.viewCheckpoint,
)

const viewSelectors = {
  selectEdition,
  selectView,
  selectViewCheckpoint,
};


export default viewSelectors;
