const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'vibecoding',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addNewListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewList', inputVars);
}
addNewListRef.operationName = 'AddNewList';
exports.addNewListRef = addNewListRef;

exports.addNewList = function addNewList(dcOrVars, vars) {
  return executeMutation(addNewListRef(dcOrVars, vars));
};

const getMyListsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyLists');
}
getMyListsRef.operationName = 'GetMyLists';
exports.getMyListsRef = getMyListsRef;

exports.getMyLists = function getMyLists(dc) {
  return executeQuery(getMyListsRef(dc));
};

const addMovieToListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddMovieToList', inputVars);
}
addMovieToListRef.operationName = 'AddMovieToList';
exports.addMovieToListRef = addMovieToListRef;

exports.addMovieToList = function addMovieToList(dcOrVars, vars) {
  return executeMutation(addMovieToListRef(dcOrVars, vars));
};

const getMoviesInListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMoviesInList', inputVars);
}
getMoviesInListRef.operationName = 'GetMoviesInList';
exports.getMoviesInListRef = getMoviesInListRef;

exports.getMoviesInList = function getMoviesInList(dcOrVars, vars) {
  return executeQuery(getMoviesInListRef(dcOrVars, vars));
};
