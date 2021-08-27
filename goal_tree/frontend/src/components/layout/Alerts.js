import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if (error.msg.title) alert.error(`Title: ${error.msg.title.join()}`);
            if (error.msg.description) alert.error(`Description: ${error.msg.description.join()}`);
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors);
            if (error.msg.username) alert.error(`Username: ${error.msg.username.join()}`);
            if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
            if (error.msg.password) alert.error(`Password: ${error.msg.password.join()}`);
        }
        if (message !== prevProps.message) {
            if (message.deleteTree) alert.success(message.deleteTree);
            if (message.createTree) alert.success(message.createTree);
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
        }

    }
    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
