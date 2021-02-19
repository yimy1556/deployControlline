import actions from 'src/modules/config/process/list/processListActions';

const INITIAL_PAGE_SIZE = 10;

const initialPagination = {
  current: 1,
  pageSize: INITIAL_PAGE_SIZE,
} 

const initialData = {
  rows: ['ajhsjashj'] as Array<any>,
  count: 0,
  loading: false,
  filter: {},
  rawFilter: {},
  pagination: initialPagination,
  sorter: {},
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
      filter: payload? payload.filter : {},
      rawFilter: payload? payload.rawFilter : {},
      pagination:
        payload && payload.keepPagination
          ? state.pagination
          : initialPagination,
    };
  }
 
  if (type === actions.RESETED) {
    return {
      ...initialData,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
      count: payload.count,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      rows: [],
      count: 0,
    }
  }

  return state;
};
