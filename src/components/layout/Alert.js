import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert as Alerts } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';

const Alert = ({ alerts }) =>
    
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        // <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        //     {alert.msg}
        // </div>
        
        <Snackbar 
            open={true} 
            autoHideDuration={5000}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            key={alert.id}
        >
            <Alerts variant="filled" severity={alert.alertType}>
                {alert.msg}
            </Alerts>
        </Snackbar>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);