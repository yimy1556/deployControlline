import actions from 'src/modules/config/process/list/processListActions';

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
  checkpoint:[],
  industrialPlants: [],
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
      checkpoint: state.checkpoint,
      industrialPlants: state.industrialPlants,
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
  
  if (type === actions.LOAD_OPTION) {
    return {
      ...state,
      checkpoint: payload.checkpoint,
      industrialPlants: payload.industrialPlants,
    }
  }

  if (type === actions.PAGINATION_CHANGED) {
    return {
      ...state,
      pagination: payload || {
        current: 1,
        pageSize: INITIAL_PAGE_SIZE,
      },
    };
  }

  return state;
};
