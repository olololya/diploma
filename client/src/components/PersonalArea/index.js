import React, {Component} from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';

export default class PersonalArea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row style={{ height: '100%' }}>
                <Col md={10} mdOffset={1} className="center-container ">
                    <Row className="children-container">
                        {this.props.children}
                    </Row>
                    {/*<Row>*/}
                        {/*<Col md={12} className="tip">*/}
                            {/*<span>Личный кабинет. Здесь вы можете просматривать и управлять Вашими заказами,*/}
                                {/*использовать сервис "Личные сообщения",изменить профиль</span>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                </Col>
            </Row>
        );
    }
}
