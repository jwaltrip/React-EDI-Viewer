// helper function to check if the passed value is undefined, null, or objects or strings length = 0
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

module.exports = isEmpty;