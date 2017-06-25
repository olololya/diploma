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
    Panel
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory, Link } from 'react-router';
import {messageActions} from '../../actions/messageActions';
import {userActions} from '../../actions/userActions';
import * as Utils from '../../utils';
import OrderForm from './OrderForm';

import './styles.scss';

class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: null,
            orders: [],
            isShowModal: false
        };

        Utils.updateBindings(this, [
            'checkFilledInfo', 'updateOrders'
        ]);
    }

    updateOrders(props) {
        const {currentUserId, currentUserType} = props;
        Utils.getFromUrlGET(`/order/user/${currentUserType}/${currentUserId}`).then(orders => {
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

    renderTable(status) {

    }

    closeModal() {
        this.setState({ isShowModal: false });
    }

    showModal() {
        this.setState({ isShowModal: true });
    }

    addOrder(order) {
        console.log(order);
    }

    render() {
        const {profile, isShowModal} = this.state;
        const {currentUserId, currentUserType} = this.props;
        const isCustomer = currentUserType === 'customer';

        return (
            <Row className="orders-main-container">
                <OrderForm isShowModalTransport={isShowModal}
                           onClose={this.closeModal}
                           onSubmit={this.addOrder}
                           idUser={currentUserId}
                />
                <Col md={12}>
                    {profile && this.checkFilledInfo()}
                    {isCustomer && <Button onClick="">Создать заказ</Button>}
                    <Accordion>
                        <Panel eventKey="1" header="Не начатые">{this.renderTable('open')}</Panel>
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
