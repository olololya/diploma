import React, {Component} from 'react';
import {
    Row,
    Col,
    Table,
    Panel,
    Accordion,
    ListGroup,
    ListGroupItem,
    Checkbox,
    Button
} from 'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory, Link } from 'react-router';
import {userActions} from '../../actions/userActions';
import {messageActions} from '../../actions/messageActions';
import * as Utils from '../../utils';

import './styles.scss';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
            users: [],
            openTransportInfo: false
        };

        Utils.updateBindings(this, ['renderTransport', 'renderAreas', 'renderAreasGroups', 'onChangeAreaItem',
            'onEditAreas'
        ]);
    }

    componentWillMount() {
        const {id} = this.props.params;
        Utils.getFromUrlGET(`http://localhost:3000/users/profile/${id}`).then(data => {
            const userInfo = {...data.user};
            if (data.profile) {
                userInfo.areas = data.profile.areas;
                userInfo.transport = data.profile.transport;
                userInfo.price = data.profile.price;
            }
            //this.setState({ userInfo });
            this.setState({
                userInfo: {
                    ...userInfo,
                    transport: [{
                        type: 'Легковой',
                        model: 'Audi 80',
                        number: '33333',
                        color: 'Серебристый',
                        capacity: '100',
                        maxDimensions: { width: 100, height: 100, length: 100},
                        date: '2017'
                    }, {
                        type: 'Легковой',
                        model: 'Audi 80',
                        number: '33333',
                        color: 'Серебристый',
                        capacity: '100',
                        maxDimensions: { width: 100, height: 100, length: 100},
                        date: '2017'
                    }, {
                        type: 'Легковой',
                        model: 'Audi 80',
                        number: '33333',
                        color: 'Серебристый',
                        capacity: '100',
                        maxDimensions: { width: 100, height: 100, length: 100},
                        date: '2017'
                    }]
                }
            });
        });

        Utils.getFromUrlGET('http://localhost:3000/areas').then(allAreas => {
            this.setState({ allAreas });
        });

        Utils.getFromUrlGET('http://localhost:3000/cities').then(cities => {
            this.setState({ cities });
        });

        Utils.getFromUrlGET('http://localhost:3000/users').then(users => {
            this.setState({ users });
        });
    }

    renderListOfUsers(users) {
        if (users.length) {
            const {currentUserId} = this.props;
            return users.map((user, index) => {
                if (user._id === currentUserId) {
                    return null;
                }
                return (
                    <Row key={index} >
                        <Link to={`/personal_area/messages/${user._id}`}>
                            <Col md={8} mdOffset={2} className="user-container">
                                {`${user.secondName} ${user.firstName}`}
                            </Col>
                        </Link>
                    </Row>
                );
            });
        }

        return 'Список пуст';
    }

    renderRowInfo(text, data) {
        return (
            <Row>
                <Col md={2}>{text}</Col>
                <Col md={4}>{data}</Col>
            </Row>
        );
    }

    renderTableRow(element, index) {
        const {type, number, model, color, date, capacity, maxDimensions} = element;
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{number}</td>
                <td>{type}</td>
                <td>{model}</td>
                <td>{color}</td>
                <td>{capacity}</td>
                <td>{maxDimensions.width}</td>
                <td>{maxDimensions.height}</td>
                <td>{maxDimensions.length}</td>
                <td>{date}</td>
            </tr>
        );
    }

    renderTransport() {
        const {transport = []} = this.state.userInfo;
        const isTransport = transport.length > 0;
        const bsStyle = isTransport ? 'success' : 'danger';

        return (
            <Panel header="Транспорт" eventKey="1" className="transport-panel" bsStyle={bsStyle}>
              {isTransport &&
                  <Table responsive>
                      <thead>
                      <tr>
                          <th rowSpan="2">#</th>
                          <th rowSpan="2">Номер</th>
                          <th rowSpan="2">Тип</th>
                          <th rowSpan="2">Марка</th>
                          <th rowSpan="2">Цвет</th>
                          <th rowSpan="2">Грузоподъемность</th>
                          <th colSpan="3">Максимальные габариты</th>
                          <th rowSpan="2">Год выпуска</th>
                      </tr>
                      <tr>
                          <th>Ширина</th>
                          <th>Высота</th>
                          <th>Длина</th>
                      </tr>
                      </thead>
                      <tbody>
                        {transport.map((element, index) => this.renderTableRow(element, index))}
                      </tbody>
                  </Table>
              }
              <Button>Добавить транспорт</Button>
            </Panel>
        );
    }

    onChangeAreaItem(item) {
        const {areas = []} = this.state.userInfo;
        const index = areas.indexOf(item._id);
        if (index === -1) {
            areas.push(item._id);
        } else {
            areas.splice(index, 1);
        }

        this.setState({ userInfo: {
            ...this.state.userInfo,
            areas
        }});
    }

    renderListGroupItem(item, index) {
        const {areas = []} = this.state.userInfo;
        let isChecked = areas.indexOf(item._id) !== -1;
        return (
            <ListGroupItem key={index}>
                <Checkbox checked={isChecked} onChange={() => this.onChangeAreaItem(item)}>
                    {item.name}
                </Checkbox>
            </ListGroupItem>
        );
    }

    renderAreasGroups(elem, index) {
        const {allAreas = []} = this.state;

        const isAllAreas = allAreas.length > 0;
        const filteredAreas = !isAllAreas ? null : allAreas.filter(item => item.city === elem._id);

        return (
          <div key={index}>
              {filteredAreas && filteredAreas.length ?
                  <div>
                      <span>{elem.name}</span>
                      <ListGroup fill>
                          {filteredAreas.map((elem, index) => this.renderListGroupItem(elem, index))}
                      </ListGroup>
                  </div> : null
              }
          </div>
        );
    }

    onEditAreas() {
        const {currentUserId} = this.props;
        const {areas} = this.state.userInfo;
        Utils.getFromUrlWithBody('http://localhost:3000/users/areas', {id: currentUserId, areas});
    }

    renderAreas() {
        const {userInfo, cities = []} = this.state;
        const {areas = []} = userInfo;
        const isCities = cities.length > 0;
        const isAreas = areas.length > 0;
        const bsStyle = isAreas ? 'success' : 'danger';

        return (
            <Panel header="Районы обслуживания" eventKey="2" className="areas-panel" bsStyle={bsStyle}>
                {isCities && cities.map((elem, index) => this.renderAreasGroups(elem, index))}
                <Button onClick={this.onEditAreas}>Редактировать</Button>
            </Panel>
        );
    }

    render() {
        const {userInfo, users = [], cities = null} = this.state;
        const {_id, firstName = '', secondName = '', lastName = '', type, dateRegistration, login, email,
            bDate = 'Не указано', place = 'Не указано', numOrders = '0', rating = 'Не определено',
            transport = null, price = null
        } = userInfo;
        const typeText = type === 'customer' ? 'Заказчик' : 'Курьер';
        const {currentUserId} = this.props;

        return (
            <Row style={{ height: '100%' }}>
                <Row>
                    <Col md={12} className="profile-container">
                        <Row className="profile-title">
                            <Col md={12}>
                                <h3>{`${firstName} ${secondName} ${lastName}`}</h3>
                                <span>{typeText}</span>
                                <br />
                                {_id !== currentUserId ?
                                    <Link to={`/personal_area/messages/${_id}`}>Написать сообщение</Link>
                                    : null
                                }
                            </Col>
                        </Row>
                        {this.renderRowInfo('Логин', login)}
                        {this.renderRowInfo('Email', email)}
                        {this.renderRowInfo('Дата регистрации', dateRegistration)}
                        {this.renderRowInfo('Дата рождения', bDate)}
                        {this.renderRowInfo('Местонахождение', place)}
                        {this.renderRowInfo('Количество заказов', numOrders)}
                        {this.renderRowInfo('Рейтинг', rating)}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Accordion>
                            {transport && this.renderTransport()}
                            {cities && this.renderAreas()}
                        </Accordion>
                    </Col>
                </Row>
                {/*<Row>*/}
                    {/*{this.renderListOfUsers(users)}*/}
                {/*</Row>*/}
            </Row>
        );
    }
}


const mapStateToProps = state => ({
    currentUserId: state.users.currentUser.id,
    errorMessage: state.users.errorMessage
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    messageActions: bindActionCreators(messageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
