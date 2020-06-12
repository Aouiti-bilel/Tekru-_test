import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} style={{color: 'white',background: 'darkred', width: '100%', height: '40px', alignSelf: 'center'}} className={`${alert.alertType}`}>
      {alert.msg}
    </div>
  ));


const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);