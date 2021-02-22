import actions from 'src/modules/config/checkpoint/list/checkpointListActions';

const INITIAL_PAGE_SIZE = 10;

const initialPagination = {
  current: 1,
  pageSize: INITIAL_PAGE_SIZE,
}

const initialData = {
  rows: [] as Array<any>,
  count: 0,
  loading: false,
  filter: {},
  rawFilter: {},
  pagination: initialPagination,
  sorter: {},
  optionCategory: [],
  optionControlType: [],
  optionVerificationtype: [

  ]
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
      filter: payload ? payload.filter : {},
      rawFilter: payload ? payload.rawFilter : {},
      pagination:
        payload && payload.keepPagination
          ? state.pagination
          : initialPagination,
    };
  }

  if (type === actions.LOAD_OPTION) {
    return {
      ...state,
      optionCategory: payload.category,
      optionControlType: payload.controlType,
    }
  }

  if (type === actions.RESETED) {
    return {
      ...initialData,
      optionCategory: state.optionCategory,
      optionControlType: state.optionControlType,
      optionVerificationtype: state.optionVerificationtype,
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
