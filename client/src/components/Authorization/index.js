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

import * as Utils from '../../utils';
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
        if (props.currentUser.id) {
            browserHistory.push('/');
            Utils.saveToLocalStorage('user', props.currentUser);
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

    getTitle(isAuthorization) {
        const textLink = isAuthorization ? 'У меня нет аккаунта' : 'У меня есть аккаунт';
        const titleText = isAuthorization ? 'Вход' : 'Регистрация';

        return (
            <Row className="authorization-title">
                <Col md={12}>
                    <h1>{titleText}</h1>
                </Col>
                <Col md={12} >
                    <div className="link-type-action">
                        <a onClick={this.switchTypeAction}>{textLink}</a>
                    </div>
                </Col>
            </Row>
        )
    }

    render() {
        const {errorMessage = {}, userActions} = this.props;
        const {isAuthorization} = this.state;
        const isError = !_.isEmpty(errorMessage);
        const callback = isAuthorization ? userActions.loginUser : userActions.registerUser;

        return (
            <Row style={{ height: '100%' }}>
                <Col md={10} mdOffset={1} className="center-container">
                    <Row className="authorization-container">
                        {this.getTitle(isAuthorization)}
                        <Row>
                            <Col md={12}>
                                <AuthorizationForm sendData={callback}
                                                   error={isError ? errorMessage : null}
                                                   isAuthorization={isAuthorization}
                                />
                            </Col>
                        </Row>
                    </Row>
                    <Row>
                        <Col md={12} className="tip">
                            <span>Если Вы здесь впервые - нажмите на "У меня нет аккаунта" возле надписи "Вход"</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.users.currentUser,
    errorMessage: state.users.errorMessage
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
