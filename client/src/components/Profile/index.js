import React, {Component} from 'react';
import {
    Row,
    Col,
    Tabs,
    Tab
} from 'react-bootstrap';

import './styles.scss';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row style={{ height: '100%' }}>
                <Col md={10} mdOffset={1} className="profile-container">


                    {this.props.children ? this.props.children :
                        <h1>Profile</h1>
                    }

                    <Row>
                        <Col md={12} className="tip">
                            <span>Личный кабинет. Здесь вы можете просматривать и управлять Вашими заказами,
                                использовать сервис "Личные сообщения",изменить профиль</span>
                        </Col>
                    </Row>
                </Col>

            </Row>
        );
    }
}

export default Profile;
