import React, {Component} from 'react';
import {
    Row,
    Col,
    Table,
    Panel,
    Accordion,
    ListGroup,
    ListGroupItem,
    Popover,
    OverlayTrigger,
    Checkbox,
    Button
} from 'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory, Link } from 'react-router';
import {userActions} from '../../actions/userActions';
import {messageActions} from '../../actions/messageActions';
import TransportForm from './TransportForm';
import * as Utils from '../../utils';

import './styles.scss';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
            users: [],
            openTransportInfo: false,
            isCurrentUserProfile: false,
            isShowModalTransport: false,
            allTransport: [],
            types: [],
            errorPrice: null
        };

        Utils.updateBindings(this, ['renderTransport', 'renderAreas', 'renderAreasGroups', 'onChangeAreaItem',
            'onEditAreas', 'updateInfo', 'onClickAddTransport', 'closeModalTransport', 'addTransport',
            'renderAreasInline', 'deleteTransport', 'onChangePrice', 'changeRowInfo', 'renderPriceField'
        ]);
    }

    updateInfo(props) {
        const {params, currentUserId} = props;
        Utils.getFromUrlGET(`http://localhost:3000/users/profile/${params.id}`).then(data => {
            const userInfo = {...data.user};
            const isCurrentUserProfile = currentUserId === data.user._id;
            if (data.profile) {
                userInfo.areas = data.profile.areas;
                userInfo.transports = data.profile.transport;
                userInfo.price = data.profile.price;
            }
            this.setState({
                isCurrentUserProfile,
                userInfo
            });
        });

        Utils.getFromUrlGET('http://localhost:3000/transports').then(allTransports => {
            this.setState({ allTransports });
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

    componentWillMount() {
        this.updateInfo(this.props);

        Utils.getFromUrlGET('http://localhost:3000/transport_types').then(types => {
            this.setState({ types });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps, this.props)) {
            this.updateInfo(nextProps);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const {userInfo} = this.state;
        if (userInfo && nextState.userInfo) {
            if (!_.isEqual(userInfo.transports, nextState.userInfo.transports) ||
                !_.isEqual(userInfo.areas, nextState.userInfo.areas)) {
                this.updateInfo(nextProps);
            }
        }
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

    getPopoverError(error) {
        return error ? <Popover id="popover-error" title="Ошибка!">{error}</Popover> : <div />;
    }

    changeRowInfo() {
        const {currentUserId} = this.props;
        const {userInfo} = this.state;
        if (parseFloat(userInfo.price) > 0.1) {
            Utils.getFromUrlWithBody('http://localhost:3000/users/price', {id: currentUserId, price: userInfo.price})
                .then(price => {
                    this.setState({ userInfo: {
                        ...this.state.userInfo,
                        price
                    }})
                });
        } else {
            this.setState({
                errorPrice: 'Цена должна быть не менее 0.1 руб.'
            });
        }
    }

    onChangePrice(event) {
        const price = event.target.value;
        const newState = {};
        if (typeof parseFloat(price) !== 'number') {
            return;
        }
        newState.userInfo = {
            ...this.state.userInfo,
            price
        };

        if (this.state.errorPrice) {
            newState.errorPrice = null;
        }

        this.setState(newState);
    }

    renderPriceField() {
        const {userInfo, errorPrice} = this.state;
        const className= `form-control ${errorPrice ? 'error-input' : ''}`;

        return (
            <div className="field-container">
                <OverlayTrigger trigger={['hover', 'focus']}
                                placement="right"
                                overlay={this.getPopoverError(errorPrice)}
                >
                    <input type="number"
                           min="0.1"
                           step="0.1"
                           className={className}
                           value={userInfo.price}
                           placeholder="Установите цену"
                           onChange={this.onChangePrice}
                    />
                </OverlayTrigger>
                <Button onClick={this.changeRowInfo}>Установить</Button>
            </div>
        );
    }

    renderRowInfo(text, data, isEditable = false) {
        const {isCurrentUserProfile, userInfo, errorPrice} = this.state;
        return (
            <Row className="row-info">
                <Col md={2}>{text}</Col>
                <Col md={4}>
                    <span className="info">{data}</span>
                    {isEditable ?
                        <div>
                            {isCurrentUserProfile ? this.renderPriceField()
                                : <span>{userInfo.price || 'Не указано'}</span>}
                        </div>
                        : null
                    }
                </Col>
            </Row>
        );
    }

    deleteTransport(id) {
        const {currentUserId} = this.props;
        const {userInfo} = this.state;
        const {transports = []} = userInfo;
        Utils.getFromUrlWithBody(`http://localhost:3000/transport/${id}`, {
            currentUserId,
            transports
        }).then(transports => {
            this.setState({
                userInfo: {
                    ...userInfo,
                    transports
                }
            });
        });
    }

    renderTableRow(element, index) {
        const {_id, number, type, model, color, capacity, maxDimensions, date} = element;
        const {types} = this.state;
        let typeName = '';
        for (let i = 0; i < types.length; i++) {
            if (type === types[i]._id) {
                typeName = types[i].name;
                break;
            }
        }
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{number}</td>
                <td>{typeName}</td>
                <td>{model}</td>
                <td>{color}</td>
                <td>{capacity}</td>
                <td>{maxDimensions.width}</td>
                <td>{maxDimensions.height}</td>
                <td>{maxDimensions.length}</td>
                <td>{date}</td>
                <td><Button className="button-trash" onClick={this.deleteTransport.bind(this, _id)}/></td>
            </tr>
        );
    }

    closeModalTransport() {
        this.setState({ isShowModalTransport: false });
    }

    onClickAddTransport() {
        this.setState({ isShowModalTransport: true });
    }

    renderTransport() {
        const {isCurrentUserProfile, userInfo, allTransports = []} = this.state;
        const {transports = []} = userInfo;
        const isTransport = transports.length > 0 && allTransports.length > 0;
        const bsStyle = isTransport ? 'success' : 'danger';

        return (
            <Panel header="Транспорт" eventKey="1" className="transport-panel" bsStyle={bsStyle}>
                {isTransport ?
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
                            <th rowSpan="2" />
                        </tr>
                        <tr>
                            <th>Ширина</th>
                            <th>Высота</th>
                            <th>Длина</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allTransports.map((element, index) => {
                            if (transports.indexOf(element._id) !== -1) {
                                return this.renderTableRow(element, index)
                            }
                        })}
                        </tbody>
                    </Table> : <Row><span>Нет транспорта</span></Row>
                }
                {isCurrentUserProfile && <Button onClick={this.onClickAddTransport}>Добавить транспорт</Button>}
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

    renderAreasInline(city, index) {
        const {areas = []} = this.state.userInfo;
        const {allAreas = []} = this.state;

        const filteredAreas = allAreas.filter(item => item.city === city._id);
        if (!filteredAreas.length) {
            return null;
        }

        return (
          <Row key={index}>
              <span>{`${city.name}: `}</span>
              {filteredAreas.map((elem, index) => {
                  if (areas.indexOf(elem._id) !== -1) {
                      return <span key={index}>{`${elem.name}; `}</span>
                  } else {
                      return null;
                  }
              })}
          </Row>
        );
    }

    renderAreas() {
        const {userInfo, cities = [], isCurrentUserProfile} = this.state;
        const {areas = []} = userInfo;
        const isCities = cities.length > 0;
        const isAreas = areas.length > 0;
        const bsStyle = isAreas ? 'success' : 'danger';

        return (
            <Panel header="Районы обслуживания" eventKey="2" className="areas-panel" bsStyle={bsStyle}>
                {isCurrentUserProfile ? <div>
                        {isCities && cities.map((elem, index) => this.renderAreasGroups(elem, index))}
                        <Button onClick={this.onEditAreas}>Редактировать</Button>
                    </div>
                    : isAreas && isCities ? cities.map((elem, index) => this.renderAreasInline(elem, index))
                        : <span>Районы не выбраны</span>
                }
            </Panel>
        );
    }

    addTransport(newTransport) {
        const {currentUserId} = this.props;
        const {userInfo} = this.state;
        const {transports = []} = userInfo;
        Utils.getFromUrlWithBody('http://localhost:3000/transport', {
            id: currentUserId,
            transports,
            newTransport
        }).then(transports => {
            this.setState({
                userInfo: {
                    ...userInfo,
                    transports
                }
            });
        });
    }

    render() {
        const {currentUserId} = this.props;
        const {userInfo, users = [], cities = null, isCurrentUserProfile, isShowModalTransport} = this.state;
        const {_id, firstName = '', secondName = '', lastName = '', type, dateRegistration, login, email,
            bDate = 'Не указано', place = 'Не указано', numOrders = '0', rating = 'Не определено',
            transports = null, price = null
        } = userInfo;
        const isCourier = type === 'courier';
        const typeText = isCourier ? 'Курьер' : 'Заказчик';

        return (
            <Row style={{ height: '100%' }}>
                <TransportForm isShowModalTransport={isShowModalTransport}
                               onClose={this.closeModalTransport}
                               onSubmit={this.addTransport}
                />
                <Row>
                    <Col md={12} className="profile-container">
                        <Row className="profile-title">
                            <Col md={12}>
                                <h3>{`${firstName} ${secondName} ${lastName}`}</h3>
                                <span>{typeText}</span>
                                <br />
                                {!isCurrentUserProfile ?
                                    <Link to={`/personal_area/messages/${_id}`}>Написать сообщение</Link>
                                    : null
                                }
                            </Col>
                        </Row>
                        {this.renderRowInfo('Логин', login)}
                        {this.renderRowInfo('Email', email)}
                        {this.renderRowInfo('Дата регистрации', dateRegistration)}
                        {this.renderRowInfo('Количество заказов', numOrders)}
                        {this.renderRowInfo('Рейтинг', rating)}
                        {isCourier && this.renderRowInfo('Цена за час работы, руб.', price, true)}
                    </Col>
                </Row>
                {isCourier &&
                    <Row>
                        <Col md={12}>
                            <Accordion>
                                {transports && this.renderTransport()}
                                {cities && this.renderAreas()}
                            </Accordion>
                        </Col>
                    </Row>
                }
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
