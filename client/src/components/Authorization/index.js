import React, {Component} from 'react';
import {
    Row,
    Col,
    Button
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import {userActions} from '../../actions/userActions';
import AuthorizationForm from './AuthorizationForm';

import * as Utils from '../../utils.js';
import * as _ from 'lodash';

/**
 * Страница авторизации
 */
class Authorization extends Component {

    constructor(props) {
        super(props);

        this.redirectToHome = this.redirectToHome.bind(this);
    }

    redirectToHome(props) {
        const {currentUser = {}} = props.usersState;
        if (!_.isEmpty(currentUser)) {
            browserHistory.push('/home')
        }
    }

    componentWillMount() {
        this.redirectToHome(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.redirectToHome(nextProps);
    }

    render() {
        const {errorMessage = {}} = this.props.usersState;
        const isError = !_.isEmpty(errorMessage);
        const leftText = !isError ? 'Введите данные для входа' : 'Ошибка входа! Проверьте введенные данные';

        return (
            <Row className="align-center authorization-container">
                <Col md={6}>
                    <div className="authorization-left">{leftText}</div>
                </Col>
                <Col md={6}>
                    <AuthorizationForm sendData={this.props.actionsUser.login}
                                       error={isError ? errorMessage : null}
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    usersState: state.users
});

const mapDispatchToProps = dispatch => ({
    actionsUser: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
