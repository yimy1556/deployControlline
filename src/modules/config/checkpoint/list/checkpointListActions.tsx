import checkpointService from 'src/modules/config/checkpoint/checkpointService';
import CategoryService from 'src/modules/config/service/CategoryService';
import ControlTypeService from 'src/modules/config/service/ControlTypeService';
import selectors from 'src/modules/config/checkpoint/list/checkpointListSelectors';
import swal from 'sweetalert';
import modalActions from 'src/modules/modal/modalActions'
import UserService from 'src/modules/user/userService';

const prefix = 'CHECKPOINT_LIST';

const checkpointListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  LOAD_OPTION: `${prefix}_LOAD_OPTION`,

  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,

  DISABLED_STARTED: `${prefix}_DISABLED_STARTED`,
  DISABLED_SUCCESS: `${prefix}_DISABLED_SUCCESS`,
  DISABLED_ERROR: `${prefix}_DISABLED_ERROR`,

  doDisabled: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: checkpointListActions.DISABLED_STARTED,
      });

      await checkpointService.doDisabled(id);

      dispatch({
        type: checkpointListActions.DISABLED_SUCCESS,
      });


      dispatch(checkpointListActions.doFetchCurrentFilter());
    } catch (error) {

      dispatch({
        type: checkpointListActions.DISABLED_ERROR,
      });

      dispatch(checkpointListActions.doFetchCurrentFilter());
    }
  },

  doChangePagination: (pagination) => async (
    dispatch,
    getState,
  ) => {
    dispatch({
      type: checkpointListActions.PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(checkpointListActions.doFetchCurrentFilter());
  },

  doLoadOption: () => async (dispatch) => {
    const optionCategory = await CategoryService.fetchCheckpoint({}, {});
    const optionControlType = await ControlTypeService.fetchCheckpoint({}, {});
    const optionOperary = await UserService.fetchUsers({},{},{},{});

    const op = optionCategory.rows.reduce((acc, el) => ([...acc, { value: el.id, label: el.name }]), []);
    const opC = optionControlType.rows.reduce((acc, el) => ([...acc, { value: el.id, label: el.name }]), []);
    const opOper = optionOperary.rows.filter(row => {
        const  esOperary = row.roles.find(rol => rol.name === 'OPERATIONAL');
        return esOperary;
      }).reduce((acc, el) => ([...acc, { value: el.id, label: el.fullName }]), []);
    
    dispatch({
      type: checkpointListActions.LOAD_OPTION,
      payload: {
        category: op,
        controlType: opC,
        operarys : opOper,
      }
    })
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: checkpointListActions.RESETED,
    });

    dispatch(checkpointListActions.doFetch());
  },

  doFetchCurrentFilter: () => async (
    dispatch,
    getState,
  ) => {
    const filter = selectors.selectFilter(getState());
    const rawFilter = selectors.selectRawFilter(getState());
    dispatch(checkpointListActions.doFetch(filter, rawFilter, true));
  },

  doFetch: (filter?, rawFilter?, keepPagination = false) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: checkpointListActions.FETCH_STARTED,
        payload: { filter, rawFilter, keepPagination },
      });

      const response = await checkpointService.fetchCheckpoint(
        filter,
        selectors.selectLimit(getState()),
      );

      dispatch({
        type: checkpointListActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {

      dispatch({
        type: checkpointListActions.FETCH_ERROR,
      });
    }
  },
  doCreate: (value) => async (dispatch) => {
    console.log('ñññññ',value,'jksjkjk')
    try {
      const response = await checkpointService.create(value);
      console.log(response)
      dispatch(
        modalActions.closeModal()
      )
      swal("Nuevo puesto de control creado!", "", "success");

      dispatch(
        checkpointListActions.doFetch({}),
      )
    }
    catch (error) {
      console.log(error);
      swal("Error al crear nueva falla", "", "error");
    }

  },

  doEdit: (value) => async (dispatch) => {
    console.log('edit',value,'jksjkjk')
    try {
      console.log(value)
      await checkpointService.edit(value);
      dispatch(
        modalActions.closeModal()
      )
      swal("Se Pudo modificar correctamente el Puesto de Control", "", "success");
      dispatch(
        checkpointListActions.doFetch({}),
      )
    } catch (error) {
      swal("Error al modificar el Puesto de control", "", "error");
    }
  },

  disabled: (id) => async (dispatch) => {
    console.log(id)
    try {
      const response = await checkpointService.doDisabled(id);
      console.log(response)
      dispatch(
        checkpointListActions.doFetch({}),
      )
    }
    catch (error) {
      console.log(error);
    }

  },

};

export default checkpointListActions;
