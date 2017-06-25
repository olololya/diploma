import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    Popover,
    OverlayTrigger,
    FormControl,
    Modal
} from 'react-bootstrap';
import * as Utils from '../../utils.js';
import * as _ from 'lodash';

export default class TransportForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: '',
            capacity: '',
            number: '',
            model: '',
            color: '',
            date: '',
            width: '',
            height: '',
            length: '',
            types: []
        };

        listOfWeights = [{
            name: 'Небольшой',
            character: 'до 20кг',

        }]

        Utils.updateBindings(this, ['onChange', 'onClickButton', 'getInput']);
    }

    componentWillMount() {
        Utils.getFromUrlGET('http://localhost:3000/transport_types').then(types => {
            this.setState({ types, type: types[0].code });
        });
    }

    onChange(event, field) {
        this.setState({
            [field]: event.target.value,
            [`${field}Error`]: null
        });
    }

    onClickButton() {
        const {type, capacity, number, model, color, date, height, width, length, types} = this.state;
        let typeId = null;
        for (let i = 0; i < types.length; i++) {
            if (type === types[i].code) {
                typeId = types[i]._id;
                break;
            }
        }

        const isErrors = this.checkErrors([
            {
                name: 'type',
                namePrint: 'Тип'
            }, {
                name: 'capacity',
                namePrint: 'Грузоподъёмность'
            }, {
                name: 'number',
                namePrint: 'Номер'
            }, {
                name: 'model',
                namePrint: 'Модель'
            }, {
                name: 'color',
                namePrint: 'Цвет'
            }, {
                name: 'date',
                namePrint: 'Год выпуска'
            }, {
                name: 'height',
                namePrint: 'Максимальная высота груза'
            }, {
                name: 'width',
                namePrint: 'Максимальная ширина груза'
            }, {
                name: 'length',
                namePrint: 'Максимальная длина груза'
            }
        ]);

        if (!isErrors && typeId && capacity && number && model && color && date && height && width && length) {
            this.props.onSubmit({
                type: typeId,
                capacity,
                number,
                model,
                color,
                date,
                maxDimensions: {
                    height,
                    width,
                    length
                }
            });

            this.setState({
                type: this.state.types[0]._id,
                capacity: '',
                number: '',
                model: '',
                color: '',
                date: '',
                width: '',
                height: '',
                length: '',
            });

            this.props.onClose();
        }
    }

    checkErrors(fields) {
        const errors = {};
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (!this.state[field.name]) {
                errors[`${field.name}Error`] = `${field.namePrint} обязателен для заполнения`;
            } else {
                if (field.name === 'date' && parseInt(this.state[field.name], 10) < 1990) {
                    errors[`${field.name}Error`] = 'Год выпуска автомобиля должен быть не раньше 1990-го';
                } else {
                    if ((field.name === 'capacity' || field.name === 'width' || field.name === 'height'
                        || field.name === 'length') && parseInt(this.state[field.name], 10) < 0) {
                        errors[`${field.name}Error`] = `${field.namePrint} не может быть меньше 1-го`;
                    }
                }

            }
        }

        if (!_.isEmpty(errors)) {
            this.setState(errors);
            return true;
        }
        return false;
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
                <Col md={5}>
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

    renderSelect

    render() {
        const {isShowModal, onClose, idUser} = this.props;
        const {types} = this.state;
        return (
            <Modal show={isShowModal} bsSize="large">
                <Modal.Header>
                    <Modal.Title>Создание заказа</Modal.Title>
                </Modal.Header>

                <Modal.Body className="modal-order">
                    <Row className="field-container">
                        <Col md={5}>
                            <label htmlFor="type">Выберете тип</label>
                        </Col>
                        <Col md={6}>
                            <FormControl componentClass="select" onChange={this.onChangeSelect}>
                                {types.map((elem, ind) =>
                                    <option value={elem.code} key={ind}>{elem.name}</option>)
                                }
                            </FormControl>
                        </Col>
                    </Row>
                    {this.getInput('number', 'Введите номер автомобиля', 'text')}
                    {this.getInput('model', 'Введите модель', 'text')}
                    {this.getInput('color', 'Введите цвет', 'text')}
                    {this.getInput('date', 'Введите год выпуска', 'number')}
                    {this.getInput('capacity', 'Вветите грузоподъемность, кг', 'number')}
                    <Row>
                        <Col md={6} mdOffset={3}><label>Максимальные габариты груза:</label></Col>
                    </Row>
                    {this.getInput('width', 'Вветите ширину, м', 'text')}
                    {this.getInput('height', 'Введите высоту, м', 'text')}
                    {this.getInput('length', 'Введите длину, м', 'text')}
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="danger" onClick={onClose}>Назад</Button>
                    <Button bsStyle="success" onClick={this.onClickButton}>Добавить</Button>
                </Modal.Footer>

            </Modal>
        );
    };

}
