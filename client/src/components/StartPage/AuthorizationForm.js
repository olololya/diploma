import React, {Component} from 'react';
import {
    Row,
    Col,
    Button
} from 'react-bootstrap';
import * as Utils from '../../utils.js';
import md5 from 'md5';
import * as _ from 'lodash';

/**
 * Форма для авторизации
 */
export default class AuthorizationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: ''
        };

        Utils.updateBindings(this, ['onChangeLogin', 'onChangePassword', 'onClickButton']);
    }

    onChangeLogin(event) {
        this.setState({ login: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onClickButton() {
        const {login, password} = this.state;
        if (login && password) {
            this.props.sendData({
                login,
                password: md5(password)
            });
        }
    }

    render() {
        const {login, password} = this.state;
        const {error = null} = this.props;
        const loginError = error && error.errorType === 'login' ? error.message : null;
        const passwordError = error && error.errorType === 'password' ? error.message : null;

        return (
            <Col md={12} className="authorization-right">
                <div>
                    <input type="text"
                           value={login}
                           className="form-control"
                           placeholder="Введите логин"
                           onChange={this.onChangeLogin}
                    />
                    {loginError && <span className="error-label">{loginError}</span> }
                </div>
                <div>
                    <input type="password"
                           value={password}
                           className="form-control"
                           placeholder="Введите пароль"
                           onChange={this.onChangePassword}
                    />
                    {passwordError && <span className="error-label">{passwordError}</span> }
                </div>
                <Button type="button" onClick={this.onClickButton}>Войти</Button>
            </Col>
        );
    };

}
