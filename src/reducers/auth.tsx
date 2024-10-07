import * as ActionTypes from "../action/ActionType";

const initialState = {
  retailer_id: '28',
  register: null,
  loginUser: null,
  isLogin: false,
  usersList: [],
  location: null,
  mapAddress: null,
  mapLatLng: {
    timestamp: 0,
    mocked: false,
    provider: "",
    coords: {
      speed: 0,
      heading: 0,
      altitude: 0,
      accuracy: 0,
      longitude: 0,
      altitudeAccuracy: 0,
      latitude: 0
    }
  }
  // addressList: []
};
// console.log("initialState",initialState);

export default (state = initialState, action: any = {}) => {
  switch (action.type) {
    case ActionTypes.REGISTER:
      console.log("action", action.data.data)
      return {
        ...state,
        loginUser: action.data.data,
        isLogin: !action.data.data || action.data.data === null ? false : true,
      };
    case ActionTypes.LOCATION:
      console.log("action", action.data)
      return {
        ...state,
        location: action.data,
        // isLogin: !action.data.data || action.data.data === null ? false : true,
      };
    case ActionTypes.MAPADDRESS:
      console.log("action", action.data)
      return {
        ...state,
        mapAddress: action.data,
        // isLogin: !action.data.data || action.data.data === null ? false : true,
      };
    case ActionTypes.MAPLATLNG:
      return {
        ...state,
        mapLatLng: action.data
      }
    case ActionTypes.LOGOUT:
      return {
        register: null,
        loginUser: null,
        isLogin: false,
        usersList: [],
        location: null,
        mapAddress: null,
        mapLatLng: {
          timestamp: 0,
          mocked: false,
          provider: "",
          coords: {
            speed: 0,
            heading: 0,
            altitude: 0,
            accuracy: 0,
            longitude: 0,
            altitudeAccuracy: 0,
            latitude: 0
          }
        }
      }
    // return {
    //   register: null,
    //   loginUser: null,
    //   isLogin: false,
    //   usersList: [],
    //   location: null,
    //   mapAddress: null,
    //   mapLatLng: null
    // };
    default:
      return (
        console.log("initialStateAuth", state),
        state
      )
    // return state;
  }
};
