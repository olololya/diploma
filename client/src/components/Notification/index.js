import React, {Component} from 'react';
import './styles.scss';

export default class Notification extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {text} = this.props;
        let className = 'notification-not-visible';
        if (text) {
            className = 'notification';
        }

        return (
            <div className={className}>
                <span>{text}</span>
            </div>
        );
    }
}
