import { createSelector } from 'reselect';

const selectOpen = (state) => state.modal;

const selectModalOpen = createSelector(
  [selectOpen],
  (modal) => Boolean(modal.open),
);

const modalSelectors = {
  selectModalOpen,
};

export default modalSelectors;
