import { createSelector } from 'reselect';

const selectView = (state) => state.config.process.view;

const selectEdition = createSelector(
  [selectView],
  (view) => view.edition,
);

const selectIsEdit = createSelector(
  [selectView],
  (view) => view.edicionStart,
)


const viewSelectors = {
  selectEdition,
  selectView,
  selectIsEdit,
};

export default viewSelectors;
