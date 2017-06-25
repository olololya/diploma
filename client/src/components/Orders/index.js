import React, {Component} from 'react';
import {
    Row,
    Col,
    Well,
    Alert,
    Tab,
    Nav,
    NavItem,
    Accordion,
    Panel,
    Table,
    Button
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory, Link } from 'react-router';
import {messageActions} from '../../actions/messageActions';
import {userActions} from '../../actions/userActions';
import * as Utils from '../../utils';
import OrderForm from './OrderForm';
import DetailOrder from './DetailOrder';

import Moment from 'moment';

import './styles.scss';

class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: null,
            orders: [],
            isShowModal: false,
            isShowModalOrder: false,
            detailOrder: {}
        };

        Utils.updateBindings(this, [
            'checkFilledInfo', 'updateOrders', 'showModal', 'closeModal', 'addOrder', 'renderTableRow', 'renderTable',
            'showModalDetailOrder', 'closeModalDetailOrder', 'getWeightName', 'getIntervalName', 'getAddressString',
            'getUserName'
        ]);
    }

    updateOrders(props) {
        const {currentUserId, currentUserType} = props;
        Utils.getFromUrlGET(`http://localhost:3000/order/user/${currentUserType}/${currentUserId}`).then(orders => {
            this.setState({ orders});
        });
    }

    componentWillReceiveProps(nextProps) {
        this.updateOrders(nextProps);
    }

    componentWillMount() {
        Utils.getFromUrlGET(`http://localhost:3000/users/profile/${this.props.currentUserId}`).then(data => {
            if (data.profile) {
                this.setState({ profile: data.profile });
            }
        });

        Utils.getFromUrlGET('http://localhost:3000/weights').then(weights => {
            this.setState({ weights });
        });

        Utils.getFromUrlGET('http://localhost:3000/intervals').then(intervals => {
            this.setState({ intervals });
        });

        Utils.getFromUrlGET('http://localhost:3000/areas').then(areas => {
            this.setState({ areas });
        });

        Utils.getFromUrlGET('http://localhost:3000/cities').then(cities => {
            this.setState({ cities });
        });

        Utils.getFromUrlGET('http://localhost:3000/users').then(users => {
            this.setState({ users });
        });

        this.updateOrders(this.props);
    }

    checkFilledInfo() {
        const {areas, transport, price} = this.state.profile;
        const errors = [];
        if (!areas.length) {
            errors.push('районы обслуживания');
        }
        if (!transport.length) {
            errors.push('транспорт');
        }
        if (!price) {
            errors.push('цену обслуживания (руб/час)');
        }

        if (errors.length) {
            return (
                <Alert bsStyle="danger">
                    <p>Для начала работы необходимо заполнить следующие поля в профиле:</p>
                    <ul>{errors.map((elem, ind) => <li key={ind}>{elem}</li>)}</ul>
                </Alert>
            );
        }
        return null;
    }

    closeModalDetailOrder() {
        this.setState({
            isShowModalOrder: false,
            detailOrder: {}
        });
    }

    showModalDetailOrder(order) {
        this.setState({
            isShowModalOrder: true,
            detailOrder: order
        });
    }

    getWeightName(weight) {
        const {weights = []} = this.state;
        for (let i = 0; i < weights.length; i++) {
            if (weight === weights[i]._id) {
                return weights[i].character;
            }
        }
    }

    getIntervalName(interval) {
        const {intervals = []} = this.state;
        for (let i = 0; i < intervals.length; i++) {
            if (interval === intervals[i]._id) {
                return `с ${intervals[i].start} до ${intervals[i].end}`;
            }
        }
    }

    getDateName(dateToSend) {
        const date = new Moment().format('DD.MM.YYY');
        if (dateToSend === 'tomorrow') {
            date.add(1, 'days');
        }

        return date;
    }

    getAddressString(address, full = false) {
        const {cities = [], areas = []} = this.state;
        let cityName = '', areaName = '';

        for (let i = 0; i < cities.length; i++) {
            if (address.city === cities[i]._id) {
                cityName = cities[i].name;
                break;
            }
        }

        for (let i = 0; i < areas.length; i++) {
            if (address.area === areas[i]._id) {
                areaName = areas[i].name;
                break;
            }
        }

        const apartament = address.apartament ? `, кв. ${address.apartament}` : '';

        return !full ? `г. ${cityName}, район ${areaName}`
            : `г. ${cityName}, район ${areaName}, ул. ${address.street}, д. ${address.house}${apartament}`;
    }

    getUserName(id) {
        const {users = []} = this.state;
        for (let i = 0; i < users.length; i++) {
            if (id === users[i]._id) {
                return `${users[i].firstName} ${users[0].secondName} ${users[0].lastName || ''}`;
            }
        }
    }

    renderTableRow(element, index) {
        const {
            _id, dateCreation, customerId, courierId = null, description, maxPrice, weight, dateToSend, timeToSend,
            sendAddress, receiptAddress, recipientInfo, phoneCustomer
        } = element;

        return (
            <tr key={index} className="order-row" onClick={this.showModalDetailOrder.bind(this, element)}>
                <td>{index + 1}</td>
                <td>
                    <Link to={`/personal_area/profile/${customerId}`}>
                        <Col className="user-name">{this.getUserName(customerId)}</Col>
                    </Link>
                </td>
                {courierId &&
                    <td>
                        <Link to={`/personal_area/profile/${courierId}`}>
                            <Col className="user-name">{this.getUserName(courierId)}</Col>
                        </Link>
                    </td>}
                {/*<td>{phoneCustomer}</td>*/}
                {/*<td>{recipientInfo.fio}</td>*/}
                {/*<td>{recipientInfo.phone}</td>*/}
                <td>{this.getAddressString(sendAddress)}</td>
                <td>{this.getAddressString(receiptAddress)}</td>
                <td>{this.getDateName(dateToSend)}</td>
                <td>{this.getIntervalName(timeToSend)}</td>
                <td>{this.getWeightName(weight)}</td>
                {/*<td>{description}</td>*/}
                {/*<td>{maxPrice}</td>*/}
                {/*<td>{dateCreation}</td>*/}
            </tr>
        );
    }

    renderTable(status) {
        const {currentUserType} = this.props;
        const {orders = []} = this.state;
        const filteredOrders = orders.filter(order => order.status === status);

        return (
            <Table responsive>
                <thead>
                    <tr>
                        {/*<th>#</th>*/}
                        {/*<th>Заказчик</th>*/}
                        {/*<th>Телефон заказчика</th>*/}
                        {/*<th>Получатель</th>*/}
                        {/*<th>Телефон получателя</th>*/}
                        {/*<th>Адрес отправки</th>*/}
                        {/*<th>Адрес получения</th>*/}
                        {/*<th>Дата отправки</th>*/}
                        {/*<th>Время отправки</th>*/}
                        {/*<th>Вес</th>*/}
                        {/*<th>Описание</th>*/}
                        {/*<th>Максимальная цена (руб/час)</th>*/}
                        {/*<th>Дата создания</th>*/}
                        <th>#</th>
                        <th>Заказчик</th>
                        <th>Адрес отправки</th>
                        <th>Адрес получения</th>
                        <th>Дата отправки</th>
                        <th>Время отправки</th>
                        <th>Вес</th>
                    </tr>
                </thead>
                <tbody>
                {filteredOrders.map((element, index) => this.renderTableRow(element, index))}
                </tbody>
            </Table>
        );
    }

    closeModal() {
        this.setState({ isShowModal: false });
    }

    showModal() {
        this.setState({ isShowModal: true });
    }

    addOrder(order) {
        const {orders} = this.state;
        Utils.getFromUrlWithBody('http://localhost:3000/orders', order).then(() => {
            orders.push(order);
            this.setState({ orders });
        });
    }

    onRespond() {

    }

    render() {
        const {profile, isShowModal, isShowModalOrder, detailOrder = {}} = this.state;
        const {currentUserId, currentUserType} = this.props;
        const isCustomer = currentUserType === 'customer';

        return (
            <Row className="orders-main-container">
                <OrderForm isShowModal={isShowModal}
                           onClose={this.closeModal}
                           onSubmit={this.addOrder}
                           idUser={currentUserId}
                />
                <DetailOrder isShowModal={isShowModalOrder}
                             order={detailOrder}
                             getUserName={this.getUserName}
                             getAddressString={this.getAddressString}
                             getDateName={this.getDateName}
                             getIntervalName={this.getIntervalName}
                             getWeightName={this.getWeightName}
                             onClose={this.closeModalDetailOrder}
                             currentUserType={currentUserType}
                             onResponse={this.onResponse}
                />
                <Col md={12}>
                    {profile && this.checkFilledInfo()}
                    {isCustomer && <Button className="create" onClick={this.showModal}>Создать заказ</Button>}
                    <Accordion>
                        <Panel eventKey="1" header="Не начатые" className="table-panel">{this.renderTable('open')}</Panel>
                        <Panel eventKey="2" header="В процессе">{this.renderTable('in progress')}</Panel>
                        <Panel eventKey="3" header="Ожидающие подтверждения">{this.renderTable('wain confirm')}</Panel>
                        <Panel eventKey="4" header="Завершенные">{this.renderTable('done')}</Panel>
                    </Accordion>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    currentUserId: state.users.currentUser.id,
    currentUserType: state.users.currentUser.type,
    messages: state.messages.messages,
    errorMessage: state.messages.errorMessage,
    notification: state.messages.notification
});

const mapDispatchToProps = dispatch => ({
    messageActions: bindActionCreators(messageActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
