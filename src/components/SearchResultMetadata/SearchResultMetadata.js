import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const SearchResultMetadata = ({ searchTerm, numResults }) => {
  // determine the color of the alert
  let alertColor;
  if (numResults === 0) alertColor = 'danger';
  else alertColor = 'success';

  return (
    <div>
      <Alert color={alertColor}>
        <strong>Search term:</strong> "{searchTerm}" returned {numResults} results
      </Alert>
    </div>
  );
};

SearchResultMetadata.displayName = 'SearchResultMetadata';
SearchResultMetadata.propTypes = {

};

SearchResultMetadata.defaultProps = {

};

export default SearchResultMetadata;