import actions from 'src/modules/controlLineExecution/list/controlLineExecutionListActions';

const INITIAL_PAGE_SIZE = 10;

const initialPagination = {
  current: 1,
  pageSize: INITIAL_PAGE_SIZE,
}

const controlLineExecutionRows = [
  {
    id: 1,
    name: "name 1",
    status: "Finalizada",
    priority: 1,
    controlLine: {
      name: "control line 1",
    },
    updatedAt: "12-02-2020",
    createdAt: "03-08-2021",
  },
  {
    id: 2,
    name: "name 2",
    status: "Activa",
    priority: 2,
    controlLine: {
      name: "control line 2",
    },
    updatedAt: "12-02-2020",
    createdAt: "03-08-2021",
  },
  {
    id: 3,
    name: "name 3",
    status: "Cancelado",
    priority: 3,
    controlLine: {
      name: "control line 3",
    },
    updatedAt: "12-02-2020",
    createdAt: "03-08-2021",
  },
  {
    id: 4,
    name: "name 4",
    status: "Pausada",
    priority: 4,
    controlLine: {
      name: "control line 4",
    },
    updatedAt: "12-02-2020",
    createdAt: "03-08-2021",
  },
  {
    id: 5,
    name: "name 5",
    status: "Cancelado",
    priority: 5,
    controlLine: {
      name: "control line 5",
    },
    updatedAt: "12-02-2020",
    createdAt: "03-08-2021",
  },
];

const initialData = {
  rows: controlLineExecutionRows as Array<any>,
  count: 0,
  loading: false,
  filter: {},
  rawFilter: {},
  pagination: initialPagination,
  sorter: {},
  optionContolLine: [],
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

  if(type === actions.MODIFY){
    return {
      rows: payload,
    }
  }

  if (type === actions.LOAD_OPTION) {
    return {
      ...state,
      optionContolLine:payload,
    }
  }

  if (type === actions.RESETED) {
    return {
      ...initialData,
      optionControlType: state.optionContolLine,
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
