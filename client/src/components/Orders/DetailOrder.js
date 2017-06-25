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
import { Link } from 'react-router';
import * as Utils from '../../utils.js';
import * as _ from 'lodash';
import Moment from 'moment';

export default class DetailOrder extends Component {

    constructor(props) {
        super(props);

        Utils.updateBindings(this, [
            'getLinkUser',
        ]);
    }

    componentWillMount() {
        const {order} = this.props;
        this.setState({ order });
    }

    renderRowInfo(text, data) {
        return (
            <Row>
                <Col md={4}>{text}</Col>
                <Col md={6}>{data}</Col>
            </Row>
        );
    }

    getLinkUser(id) {
        const {getUserName} = this.props;
        return (
            <Link to={`/personal_area/profile/${id}`}>
                <Col className="user-name">{getUserName(id)}</Col>
            </Link>
        );
    }

    render() {
        const {
            isShowModal, onClose, order, getAddressString, getDateName, getIntervalName, getWeightName, currentUserType,
            onRespond
        }= this.props;
        const isCustomer = currentUserType === 'customer';
        const {
            _id, dateCreation, customerId, courierId = null, description, maxPrice, weight, dateToSend, timeToSend,
            sendAddress = {}, receiptAddress = {}, recipientInfo = {}, phoneCustomer
        } = order;

        return (
            <Modal show={isShowModal}>
                <Modal.Header>
                    <Modal.Title>Просмотр заказа</Modal.Title>
                </Modal.Header>

                <Modal.Body className="modal-order">
                    {this.renderRowInfo('Заказчик', this.getLinkUser(customerId))}
                    {this.renderRowInfo('Телефон заказчика', phoneCustomer)}
                    {courierId && this.renderRowInfo('Курьер', this.getLinkUser(courierId))}
                    {this.renderRowInfo('Получатель', recipientInfo.fio)}
                    {this.renderRowInfo('Телефон получателя', recipientInfo.phone)}
                    {this.renderRowInfo('Адрес отправки', getAddressString(sendAddress, true))}
                    {this.renderRowInfo('Адрес получения', getAddressString(receiptAddress, true))}
                    {this.renderRowInfo('Дата отправки', getDateName(dateToSend))}
                    {this.renderRowInfo('Время отправки', getIntervalName(timeToSend))}
                    {this.renderRowInfo('Вес заказа', getWeightName(weight))}
                    {this.renderRowInfo('Максимальная цена (руб/час)', maxPrice)}
                    {this.renderRowInfo('Описание', description)}
                    {this.renderRowInfo('Дата создания заказа', dateCreation)}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={onClose}>Закрыть</Button>
                    {!isCustomer && status === 'open' && <Button onClick={onRespond}>Откликнуться</Button>}
                </Modal.Footer>
            </Modal>
        );
    };

}
