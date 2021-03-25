import { createSelector } from 'reselect';

const selectView = (state) => state.config.process.view;

const selectEdition = createSelector(
  [selectView],
  (view) => view.edition,
);

const selectIsEdit = createSelector(
  [selectView],
  (view) => view.edicionStart,
);

const selectViewControlLine = createSelector(
  [selectView],
  (view) => view.viewControlLine,
);

const viewSelectors = {
  selectEdition,
  selectView,
  selectIsEdit,
  selectViewControlLine,
};

export default viewSelectors;
