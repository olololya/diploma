import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    Popover,
    OverlayTrigger,
    FormControl
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
            password: '',
            passwordConfirm: '',
            email: '',
            type: 'customer'
        };

        Utils.updateBindings(this, ['onChange', 'onClickButton', 'getInput', 'checkErrors']);
    }

    onChange(event, field) {
        this.setState({
            [field]: event.target.value,
            [`${field}Error`]: null
        });
    }

    componentWillReceiveProps(nextProps) {
        const { error } = nextProps;
        if (!error) {
            return;
        }
        const loginError = error.errorType === 'login' ? error.message : null;
        const passwordError = error.errorType === 'password' ? error.message : null;
        const emailError = error.errorType === 'email' ? error.message : null;

        this.setState({ loginError, passwordError, emailError });
    }

    checkErrors(fields) {
        const errors = {};
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (!this.state[field.name]) {
                errors[`${field.name}Error`] = `${field.namePrint} обязателен для заполнения`;
            }
        }

        if (!_.isEmpty(errors)) {
            this.setState(errors);
        }
    }


    onClickButton() {
        const {login, password, passwordConfirm, email, type} = this.state;

        let fields = [{
            name: 'login',
            namePrint: 'Логин'
        }, {
            name: 'password',
            namePrint: 'Пароль'
        }];

        if (this.props.isAuthorization) {
            if (login && password) {
                this.props.sendData({
                    login,
                    password: md5(password)
                });
            } else {
                this.checkErrors(fields);
            }
        } else {
            if (login && password && passwordConfirm && email && type) {
                this.props.sendData({
                    login,
                    email,
                    type,
                    password: md5(password),
                    passwordConfirm: md5(passwordConfirm),
                    lengthPassword: password.length
                });
            } else {
                fields = [...fields, {
                        name: 'passwordConfirm',
                        namePrint: 'Подтверждение пароля'
                    }, {
                        name: 'email',
                        namePrint: 'Email'
                    }, {
                        name: 'type',
                        namePrint: 'Тип'
                    }
                ];

                this.checkErrors(fields);
            }
        }
    }

    getPopoverError(error) {
        return error ? <Popover id="popover-error" title="Ошибка!">{error}</Popover> : <div />;
    }

    getInput(id, label, type) {
        const error = this.state[`${id}Error`];
        const value = this.state[id];

        const className= `form-control ${error ? 'error-input' : ''}`;
        return (
            <Row className="field-container">
                <Col md={6} className="container-right-text">
                    <label htmlFor={id}>{label}</label>
                </Col>
                <Col md={6}>
                    <OverlayTrigger trigger={['hover', 'focus']}
                                    placement="right"
                                    overlay={this.getPopoverError(error)}
                    >
                        <input type={type}
                               value={value}
                               className={className}
                               placeholder={label}
                               onChange={(event) => this.onChange(event, id)}
                               id={id}
                        />
                    </OverlayTrigger>
                </Col>
            </Row>
        );
    }

    getAuthorizationForm() {
        return (
          <div>
              {this.getInput('login', 'Введите логин', 'text')}
              {this.getInput('password', 'Введите пароль', 'password')}
          </div>
        );
    }

    onChangeSelect(index, value) {
        debugger
        this.setState({ type: value });
    }

    getRegistrationForm() {
        return (
            <div>
                {this.getInput('login', 'Введите логин', 'text')}
                {this.getInput('email', 'Введите email', 'text')}
                {this.getInput('password', 'Введите пароль', 'password')}
                {this.getInput('passwordConfirm', 'Подтвердите пароль', 'password')}

                <Row className="field-container">
                    <Col md={6} className="container-right-text">
                        <label htmlFor="type">Выберете тип</label>
                    </Col>
                    <Col md={6}>
                        <FormControl componentClass="select" onChange={this.onChangeSelect}>
                            <option value="customer">Заказчик</option>
                            <option value="courier">Курьер</option>
                        </FormControl>
                    </Col>
                </Row>
            </div>
        );
    }

    render() {
        const {isAuthorization} = this.props;
        const buttonText = isAuthorization ? 'Войти' : 'Зарегистрироваться';

        return (
            <Col md={12}>
                {isAuthorization ? this.getAuthorizationForm() : this.getRegistrationForm()}

                <Row className="field-container">
                    <Col md={6} mdOffset={6}>
                        <Button type="button" onClick={this.onClickButton}>{buttonText}</Button>
                    </Col>
                </Row>
            </Col>
        );
    };

}
