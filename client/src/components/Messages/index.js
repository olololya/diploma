import React, {Component} from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import {messageActions} from '../../actions/messageActions';

class Messages extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.messageActions.getMessages(this.props.params.id);
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <h1>Messages</h1>
                </Col>
            </Row>
        );
    }
}


const mapStateToProps = state => ({
    messages: state.messages.messages,
    errorMessage: state.messages.errorMessage
});

const mapDispatchToProps = dispatch => ({
    messageActions: bindActionCreators(messageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
