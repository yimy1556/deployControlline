import { createSelector } from 'reselect';

const selectView = (state) => state.config.fault.view;

const selectEdition = createSelector(
  [selectView],
  (view) => view.edition,
);

const viewSelectors = {
  selectEdition,
  selectView,
};

export default viewSelectors;
