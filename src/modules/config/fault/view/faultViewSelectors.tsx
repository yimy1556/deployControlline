import { createSelector } from 'reselect';

const selectView = (state) => state.config.fault.view;

const selectEdition = createSelector(
  [selectView],
  (view) => view.edition,
);

const selectViewsActive = createSelector(
  [selectView],
  (view) => view.viewFault,
);

const viewSelectors = {
  selectEdition,
  selectView,
  selectViewsActive,
};

export default viewSelectors;
