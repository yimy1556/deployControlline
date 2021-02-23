import faultService from 'src/modules/config/fault/faultService';
import selectors from 'src/modules/config/fault/list/faultListSelectors';
import TypeFallaService from 'src/modules/config/service/TypeFallaService'
import checkpointListActions from 'src/modules/config/checkpoint/list/checkpointListActions';
import swal from 'sweetalert';
import modalActions from 'src/modules/modal/modalActions'

const prefix = 'FAULT_LIST';

const faultListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,

  LOAD_OPTION: `${prefix}_LOAD_OPTION`,

  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  doChangePagination: (pagination) => async (
    dispatch,
    getState,
  ) => {
    dispatch({
      type: faultListActions.PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(faultListActions.doFetchCurrentFilter());
  },

  doEdit: (value) => async (dispatch) => {
    try {
      console.log(value)
      await faultService.edit(value);
      dispatch(
        modalActions.closeModal()
      )
      swal("Se Pudo modificar correctamente Falla", "", "success");
      dispatch(
        faultListActions.doFetch({}),
      )
    } catch (error) {
      swal("Error al modificar Falla", "", "error");
    }
  },


  doCreate: (value) => async (dispatch) => {
    try {

      const response = await faultService.create(value);

      if (response) {
        dispatch(
          modalActions.closeModal()
        )
        swal("Nueva falla creada!", "", "success");
        dispatch(
          faultListActions.doFetch({}),

        )
      } else {
        swal("Nombre de falla repetido", "", "error");
      }

    } catch (error) {
      console.log(error)
      swal("Error al crear falla", "", "error");

    }
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: faultListActions.RESETED,
    });

    dispatch(faultListActions.doFetch());
  },

  doFetchCurrentFilter: () => async (
    dispatch,
    getState,
  ) => {
    const filter = selectors.selectFilter(getState());
    const rawFilter = selectors.selectRawFilter(getState());
    dispatch(faultListActions.doFetch(filter, rawFilter, true));
  },

  doFetch: (filter?, rawFilter?, keepPagination = false) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: faultListActions.FETCH_STARTED,
        payload: { filter, rawFilter, keepPagination },
      });

      const response = await faultService.fetchFault(
        filter,
        selectors.selectLimit(getState()),
      );

      console.log(response, 'jshdjshjd')

      dispatch({
        type: faultListActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {

      dispatch({
        type: faultListActions.FETCH_ERROR,
      });
    }
  },

  doLoadOption: () => async (dispatch) => {
    const optionsTypeFalla = await TypeFallaService.fetchTypeFalla({}, {});
    const opTyFa = optionsTypeFalla.rows.reduce((acc, el) => ([...acc, { value: el.id, label: el.name }]), []);
    dispatch({
      type: faultListActions.LOAD_OPTION,
      payload: opTyFa,
    });
  },
  disabled: (id) => async (dispatch) => {
    console.log(id)
    try {
      const response = await faultService.doDisabled(id);
      console.log(response)
      dispatch(
        faultListActions.doFetch({}),
      )
    }
    catch (error) {
      console.log(error);
    }

  },

};

export default faultListActions;
