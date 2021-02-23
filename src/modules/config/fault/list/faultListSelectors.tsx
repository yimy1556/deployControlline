import { createSelector } from 'reselect';

const selectRaw = (state) => state.config.fault.list;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const selectOptionTypeFalla = createSelector(
  [selectRaw],
  (raw) => raw.optionsTypeFalla,
);

const selectOptionFaultActive = createSelector(
  [selectRaw],
  (raw) => raw.optionsFaultActive,
);


const selectExportLoading = createSelector(
  [selectRaw],
  (raw) => raw.exportLoading,
);

const selectRowsFault = createSelector(
  [selectRaw],
  (raw) => raw.rowsFault,
);

const selectCount = createSelector(
  [selectRaw],
  (raw) => raw.count,
);

const selectHasRows = createSelector(
  [selectCount],
  (count) => count > 0,
);


const selectFilter = createSelector([selectRaw], (raw) => {
  return raw.filter;
});

const selectRawFilter = createSelector(
  [selectRaw],
  (raw) => {
    return raw.rawFilter;
  },
);

const selectLimit = createSelector([selectRaw], (raw) => {
  const pagination = raw.pagination;
  return pagination.pageSize;
});

const selectOffset = createSelector([selectRaw], (raw) => {
  const pagination = raw.pagination;

  if (!pagination || !pagination.pageSize) {
    return 0;
  }

  const current = pagination.current || 1;

  return (current - 1) * pagination.pageSize;
});

const selectPagination = createSelector(
  [selectRaw, selectCount],
  (raw, count) => {
    return {
      ...raw.pagination,
      total: count,
    };
  },
);



const faultListSelectors = {
  selectLoading,
  selectRowsFault,
  selectCount,
  selectLimit,
  selectFilter,
  selectOffset,
  selectPagination,
  selectHasRows,
  selectExportLoading,
  selectRawFilter,
  selectOptionTypeFalla,
  selectOptionFaultActive,
};

export default faultListSelectors;
