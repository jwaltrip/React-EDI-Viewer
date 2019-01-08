import React from 'react';
import PropTypes from 'prop-types';

const OrderTableHeader = () => (
  <Container>
    <Row className="header-sticky">
      <div style={{width: '5%'}}>#</div>
      <div style={{width: '49%'}}>Filename</div>
      <div style={{width: '18%'}}>Luma Order Number</div>
      <div style={{width: '18%'}}>Partner Order Number</div>
      <div style={{width: '10%'}}>Date Placed</div>
    </Row>
  </Container>
);

OrderTableHeader.displayName = 'OrderTableHeader';
OrderTableHeader.propTypes = {

};

OrderTableHeader.defaultProps = {

};

export default OrderTableHeader;