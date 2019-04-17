import React from 'react';
import { Provider as Provider$1, connect } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var REQUEST_DATA = 'REQUEST_DATA';
var RECEIVE_DATA = 'RECEIVE_DATA';

var handleData = function handleData() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isFetching: true,
    data: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case REQUEST_DATA:
      return _objectSpread({}, state, {
        isFetching: true
      });

    case RECEIVE_DATA:
      return _objectSpread({}, state, {
        isFetching: false,
        data: action.data,
        timeStamp: Date.now()
      });

    default:
      return _objectSpread({}, state);
  }
};

var muState = function muState() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case RECEIVE_DATA:
    case REQUEST_DATA:
      return _objectSpread({}, state, _defineProperty({}, action.category, handleData(state[action.category], action)));

    default:
      return _objectSpread({}, state);
  }
};

var reducer = combineReducers({
  muState: muState
});

var middleware = [thunk];
var store = createStore(reducer, applyMiddleware.apply(void 0, middleware));
var Provider = (function (_ref) {
  var children = _ref.children;
  return React.createElement(Provider$1, {
    store: store
  }, children);
});

var funcs;
var setConfig = function setConfig(apis) {
  return funcs = apis;
};

var requestData = function requestData(category) {
  return {
    type: REQUEST_DATA,
    category: category
  };
};

var receiveData = function receiveData(data, category) {
  return {
    type: RECEIVE_DATA,
    data: data,
    category: category
  };
};

var setMuState = function setMuState(_ref) {
  var funcName = _ref.funcName,
      params = _ref.params,
      _ref$stateName = _ref.stateName,
      stateName = _ref$stateName === void 0 ? funcName : _ref$stateName,
      data = _ref.data;
  return function (dispatch) {
    if (!funcName && stateName) return dispatch(receiveData(data, stateName));
    dispatch(requestData(stateName));
    return funcs[funcName](params).then(function (res) {
      return dispatch(receiveData(res, stateName));
    });
  };
};

var mapStateToProps = function mapStateToProps(_ref, muStateKeys) {
  var muState = _ref.muState;
  if (!muStateKeys) return {
    muState: muState
  };
  var _transferObj = {};
  muStateKeys.forEach(function (key) {
    muState[key] && (_transferObj[key] = muState[key]);
  });
  return _objectSpread({}, _transferObj);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setMuState: bindActionCreators(setMuState, dispatch)
  };
};

var index = (function (muStateKeys) {
  return connect(function (state) {
    return mapStateToProps(state, muStateKeys);
  }, mapDispatchToProps);
});

export { Provider as MuProvider, index as connectMu, setMuState, setConfig };
