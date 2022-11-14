const errorMap = { 
  MISSING_VALUE: 400,
  INVALID_VALUE: 422,
  INEXISTENT_VALUE: 404,
};

const mapError = (type) => errorMap[type] || 500; 
module.exports = {
  errorMap,
  mapError,
};