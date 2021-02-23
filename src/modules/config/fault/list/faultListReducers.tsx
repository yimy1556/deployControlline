import actions from 'src/modules/config/fault/list/faultListActions';

const INITIAL_PAGE_SIZE = 10;

const initialPagination = {
  current: 1,
  pageSize: INITIAL_PAGE_SIZE,
}

const initialData = {
  rowsFault: [] as Array<any>,
  count: 0,
  loading: false,
  filter: {},
  rawFilter: {},
  pagination: initialPagination,
  sorter: {},
  optionsTypeFalla: [
    {
      value: 1,
      label: "Bloqueante",
    },
    {
      value: 2,
      label: "Declarativa ",
    },
  ],
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
      optionsTypeFalla: payload,
    }
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
      rowsFault: payload.rows,
      count: payload.count,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      rowsFault: [],
      count: 0,
    }
  }

  return state;
};
