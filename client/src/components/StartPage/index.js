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
import RegistrationForm from './RegistrationForm';

import * as Utils from '../../utils.js';
import * as _ from 'lodash';

import './styles.scss';

/**
 * Страница авторизации
 */
class Authorization extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthorization: true
        };

        Utils.updateBindings(this, ['redirectToHome', 'switchTypeAction']);
    }

    redirectToHome(props) {
        if (props.currentUserId) {
            browserHistory.push('/home')
        }
    }

    componentWillMount() {
        this.redirectToHome(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.redirectToHome(nextProps);
    }

    switchTypeAction() {
        this.setState({ isAuthorization: !this.state.isAuthorization });
    }

    render() {
        const {errorMessage = {}, userActions} = this.props;
        const {isAuthorization} = this.state;
        const isError = !_.isEmpty(errorMessage);
        const typeAction = isAuthorization ? 'входа' : 'регистрации';
        const textLink = isAuthorization ? 'У меня нет аккаунта' : 'У меня есть аккаунт';
        const leftText = !isError ? `Введите данные для ${typeAction}` : 'Ошибка! Проверьте введенные данные';

        return (
            <Row className="align-center authorization-container">
                <Col md={6}>
                    <div className="authorization-left">
                        <div className="title">{leftText}</div>
                        <div className="link-type-action">
                            <a onClick={this.switchTypeAction}>{textLink}</a>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    {isAuthorization ?
                        <AuthorizationForm sendData={userActions.loginUser} error={isError ? errorMessage : null}/> :
                        <RegistrationForm sendData={userActions.registerUser} error={isError ? errorMessage : null}/>
                    }
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    currentUserId: state.users.currentUserId,
    errorMessage: state.users.errorMessage
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
