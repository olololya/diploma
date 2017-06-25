import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    Popover,
    OverlayTrigger,
    FormControl,
    Modal,
    HelpBlock
} from 'react-bootstrap';
import * as Utils from '../../utils.js';
import * as _ from 'lodash';
import Moment from 'moment';

export default class OrderForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            description: '',    // textarea
            weight: '',         // выбор
            timeToSend: '',       // выбор
            citySend: '',     // список
            areaSend: '',     // список
            streetSend: '',         // input
            houseSend: '',          // input
            apartamentSend: '',     // input (необязательно)
            cityReceipt: '',     // список
            areaReceipt: '',     // список
            streetReceipt: '',         // input
            houseReceipt: '',          // input
            apartamentReceipt: '',     // input (необязательно)
            fioRecipient: '',        // input
            phoneRecipient: '',       // input
            fioCustomer: '',        // input
            phoneCustomer: '',      // input
            maxPrice: 0.1,       // input
            dateToSend: '',

            intervals: [],
            weights: [],
            areas: [],
            cities: [],
            datesToSend: []
        };

        Utils.updateBindings(this, [
            'onChangeInput', 'onClickButton', 'getInput', 'renderContactAndAddressFiled', 'renderSelect', 'onChangeSelect',
            'onChangeCity', 'renderInfoLoad', 'getDateToSend', 'onChange'
        ]);
    }

    componentWillMount() {
        const {idUser} = this.props;
        Utils.getFromUrlGET(`http://localhost:3000/users/profile/${idUser}`).then(data => {
            const {firstName, secondName, lastName, phone} = data.user;
            this.setState({
                fioCustomer: `${firstName} ${secondName} ${lastName || ''}`,
                phoneCustomet: phone || ''
            });
        });

        Utils.getFromUrlGET('http://localhost:3000/weights').then(weights => {
            this.setState({ weights, weight: weights[0]._id });
        });

        Utils.getFromUrlGET('http://localhost:3000/intervals').then(intervals => {
            this.setState({ intervals, timeToSend: intervals[0]._id });
        });

        Utils.getFromUrlGET('http://localhost:3000/cities').then(cities => {
            Utils.getFromUrlWithBody('http://localhost:3000/cities/areas', { cityName: cities[0].name })
                .then(areas => {
                    this.setState({
                        cities,
                        citySend: cities[0]._id,
                        cityReceipt: cities[0]._id,
                        areas,
                        areaSend: areas[0]._id,
                        areaReceipt: areas[0]._id
                    });
                });
        });

        const datesToSend = this.getDateToSend();
        this.setState({ datesToSend, dateToSend: datesToSend[0]._id  });
    }

    onChangeInput(event, field) {
        this.setState({
            [field]: event.target.value,
            [`${field}Error`]: null
        });
    }

    onClickButton() {
        const {idUser} = this.props;
        const {description = '', weight, citySend, areaSend, streetSend, houseSend, apartamentSend, cityReceipt,
            areaReceipt, streetReceipt, houseReceipt, apartamentReceipt, fioRecipient, phoneRecipient, fioCustomer,
            phoneCustomer, maxPrice, timeToSend, dateToSend
        } = this.state;

        const isErrors = this.checkErrors([
            {
                name: 'streetSend',
                namePrint: 'Улица'
            }, {
                name: 'houseSend',
                namePrint: 'Дом'
            }, {
                name: 'streetReceipt',
                namePrint: 'Улица'
            }, {
                name: 'houseReceipt',
                namePrint: 'Дом'
            }, {
                name: 'fioRecipient',
                namePrint: 'ФИО получателя'
            }, {
                name: 'phoneRecipient',
                namePrint: 'Контактный телефон получателя'
            }, {
                name: 'fioCustomer',
                namePrint: 'ФИО отправителя'
            }, {
                name: 'phoneCustomer',
                namePrint: 'Контактный телефон отправителя'
            }
        ]);

        if (!isErrors) {
            const time = new Moment();

            this.props.onSubmit({
                description,
                weight,
                sendAddress: {
                    city: citySend,
                    area: areaSend,
                    street: streetSend,
                    house: houseSend,
                    apartament: apartamentSend
                },
                receiptAddress: {
                    city: cityReceipt,
                    area: areaReceipt,
                    streets: streetReceipt,
                    house: houseReceipt,
                    apartament: apartamentReceipt
                },
                recipientInfo: {
                    fio: fioRecipient,
                    phone: phoneRecipient
                },
                phoneCustomer,
                timeToSend,
                dateToSend,
                maxPrice,
                customerId: idUser,
                dateCreation: time.format('HH:MM DD.MM.YYYY'),
                status: 'open'
            });

            this.setState({
                description: '',
                weight: this.state.weights[0]._id,
                interval: this.state.intervals[0]._id,
                streetSend: '',
                houseSend: '',
                apartamentSend: '',
                streetReceipt: '',
                houseReceipt: '',
                apartamentReceipt: '',
                fioRecipient: '',
                phoneRecipient: '',
                maxPrice: 0.1
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

    onChange(event, field) {
        this.setState({
            [field]: event.target.value,
            [`${field}Error`]: null
        });
    }

    getInput(id, label, type) {
        const error = this.state[`${id}Error`];
        const value = this.state[id];
        const className= `form-control ${error ? 'error-input' : ''}`;
        const additionalProps = {};
        if (type === 'range') {
            additionalProps.min = 0.1;
            additionalProps.max = 100;
            additionalProps.step = 0.1;
        }

        return (
            <Row className="field-container">
                <Col md={4}>
                    <label htmlFor={id}>{label}</label>
                </Col>
                <Col md={6}>
                    <OverlayTrigger trigger={['hover', 'focus']}
                                    placement="right"
                                    overlay={this.getPopoverError(error)}
                    >
                        {type !== 'textarea' ?
                            <input type={type}
                                   value={value}
                                   className={className}
                                   placeholder={label}
                                   onChange={(event) => this.onChange(event, id)}
                                   id={id}
                                   name={id}
                                   autoComplete="on"
                                   {...additionalProps}
                            /> :
                            <FormControl componentClass="textarea"
                                         placeholder={label}
                                         onChange={(event) => this.onChange(event, id)}
                                         id={id}
                                         value={value}
                            />
                        }
                    </OverlayTrigger>
                    {id === 'maxPrice' &&  <span>{`${value} руб.`}</span>}
                </Col>
            </Row>
        );
    }

    updateAreas(cityId) {
        const {cities} = this.state;
        let cityName = '';
        for (let i = 0; i < cities.length; i++) {
            if (cities[i]._id === cityId) {
                cityName = cities[i].name;
                break;
            }
        }
        Utils.getFromUrlWithBody('http://localhost:3000/cities/areas', { cityName })
            .then(areas => {
                this.setState({
                    areas,
                    areaSend: areas[0]._id,
                    areaReceipt: areas[0]._id
                });
            });
    }

    onChangeCity(id, event) {
        const value = event.target.value;
        this.setState({ [id]: value }, this.updateAreas(value));
    }

    onChangeSelect(id, event) {
        const value = event.target.value;
        this.setState({ [id]: value });
    }

    renderSelect(id, label, array, callback) {
        return (
            <Row className="field-container">
                <Col md={4}>
                    <label htmlFor={id}>{label}</label>
                </Col>
                <Col md={6}>
                    <FormControl componentClass="select" onChange={callback.bind(this, id)}>
                        {array.map((elem, ind) =>
                            <option value={elem._id} key={ind}>{elem.name}</option>)
                        }
                    </FormControl>
                </Col>
            </Row>
        );
    }

    renderContactAndAddressFiled(type) {
        const {cities = [], areas = []} = this.state;
        const isCustomer = type === 'customer';
        const fioField = isCustomer ? 'fioCustomer' : 'fioRecipient';
        const phoneField = isCustomer ? 'phoneCustomer' : 'phoneRecipient';
        const citySelect = isCustomer ? 'citySend' : 'cityReceipt';
        const areaSelect = isCustomer ? 'areaSend' : 'areaReceipt';
        const streetField = isCustomer ? 'streetSend' : 'streetReceipt';
        const houseField = isCustomer ? 'houseSend' : 'houseReceipt';
        const apartamentField = isCustomer ? 'apartamentSend' : 'apartamentReceipt';

        return (
            <div>
                <h3>{isCustomer ? 'Отправитель' : 'Получатель'}</h3>
                {this.getInput(fioField, 'ФИО', 'text')}
                {this.getInput(phoneField, 'Контактный телефон', 'tel')}

                <h5>{`Адрес ${isCustomer ? 'отправления' : 'получения'}`}</h5>
                {this.renderSelect(citySelect, 'Город', cities, this.onChangeCity)}
                {this.renderSelect(areaSelect, 'Район', areas, this.onChangeSelect)}
                {this.getInput(streetField, 'Улица', 'text')}
                {this.getInput(houseField, 'Дом', 'text')}
                {this.getInput(apartamentField, 'Квартира (необязательно)', 'text')}
            </div>
        );
    }

    getDateToSend() {
        // const today = new Moment().format('DD');
        // const tomorrow = new Moment().add(1, 'days').format('DD');
        //
        // this.setState({ dateToSend: today });

        return [{
            _id: 'today',
            name: 'Сегодня'
        }, {
            _id: 'tomorrow',
            name: 'Завтра'
        }];
    }

    renderIntervals() {
        const {intervals = [], timeToSend = '', dateToSend} = this.state;
        const now = new Moment().format('HH');
        const isToday = dateToSend === 'today';
        const filteredIntervals = isToday ? intervals.filter(elem => parseInt(now, 10) < parseInt(elem.end, 10) )
            : intervals;
        return (
            <Row className="field-container">
                <Col md={4}>
                    <label htmlFor="timeToSend">Интервал времени</label>
                </Col>
                <Col md={6}>
                    <Row>
                        <Col md={6}>
                            <span>c</span>
                            <FormControl componentClass="select" className="small-select"
                                         onChange={this.onChangeSelect.bind(this, 'timeToSend')}
                                         value={timeToSend}
                            >
                                {filteredIntervals.map((elem, ind) =>
                                    <option value={elem._id} key={ind}>{elem.start}</option>)
                                }
                            </FormControl>
                        </Col>
                        <Col md={6}>
                            <span>до</span>
                            <FormControl componentClass="select" className="small-select"
                                         disabled
                                         value={timeToSend}>
                                {filteredIntervals.map((elem, ind) =>
                                    <option value={elem._id} key={ind}>{elem.end}</option>)
                                }
                            </FormControl>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    renderInfoLoad() {
        const {datesToSend = [], weights} = this.state;
        const modWeights = weights.map(elem => ({
            _id: elem._id,
            name: `${elem.name} (${elem.character})`
        }));
        return (
            <div>
                <h4>Время отправки</h4>
                {this.renderSelect('dateToSend', 'Дата', datesToSend, this.onChangeSelect)}
                {this.renderIntervals()}
                <br />
                {this.getInput('maxPrice', 'Максимальная цена за час работы', 'range')}
                {this.renderSelect('weight', 'Вес', modWeights, this.onChangeSelect)}
                {this.getInput('description', 'Краткое описание заказа', 'textarea')}
            </div>
        );
    }

    render() {
        const {isShowModal, onClose, idUser} = this.props;
        return (
            <Modal show={isShowModal}>
                <Modal.Header>
                    <Modal.Title>Создание заказа</Modal.Title>
                </Modal.Header>

                <Modal.Body className="modal-order">
                    {this.renderContactAndAddressFiled('customer')}
                    <br />
                    {this.renderContactAndAddressFiled('recipient')}
                    <br />
                    {this.renderInfoLoad()}
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="danger" onClick={onClose}>Назад</Button>
                    <Button bsStyle="success" onClick={this.onClickButton}>Добавить</Button>
                </Modal.Footer>

            </Modal>
        );
    };

}
