import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IProveedor, defaultValue } from 'app/shared/model/empresa/proveedor.model';

export const ACTION_TYPES = {
  FETCH_PROVEEDOR_LIST: 'proveedor/FETCH_PROVEEDOR_LIST',
  FETCH_PROVEEDOR: 'proveedor/FETCH_PROVEEDOR',
  CREATE_PROVEEDOR: 'proveedor/CREATE_PROVEEDOR',
  UPDATE_PROVEEDOR: 'proveedor/UPDATE_PROVEEDOR',
  DELETE_PROVEEDOR: 'proveedor/DELETE_PROVEEDOR',
  RESET: 'proveedor/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProveedor>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProveedorState = Readonly<typeof initialState>;

// Reducer

export default (state: ProveedorState = initialState, action): ProveedorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROVEEDOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROVEEDOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROVEEDOR):
    case REQUEST(ACTION_TYPES.UPDATE_PROVEEDOR):
    case REQUEST(ACTION_TYPES.DELETE_PROVEEDOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PROVEEDOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROVEEDOR):
    case FAILURE(ACTION_TYPES.CREATE_PROVEEDOR):
    case FAILURE(ACTION_TYPES.UPDATE_PROVEEDOR):
    case FAILURE(ACTION_TYPES.DELETE_PROVEEDOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROVEEDOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROVEEDOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROVEEDOR):
    case SUCCESS(ACTION_TYPES.UPDATE_PROVEEDOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROVEEDOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'services/empresa/api/proveedors';

// Actions

export const getEntities: ICrudGetAllAction<IProveedor> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROVEEDOR_LIST,
  payload: axios.get<IProveedor>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IProveedor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROVEEDOR,
    payload: axios.get<IProveedor>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProveedor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROVEEDOR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProveedor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROVEEDOR,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProveedor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROVEEDOR,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
