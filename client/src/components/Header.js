import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';


const Header = (props) => {
  const authText = props.userState.isLogin ? 'Выйти' : 'Войти';
  return (
    <Row className="header">
      <Col md={2} mdOffset={10}>
        <div className="header-navbar">
          <IndexLink to="/" className="link" activeClassName="link-active">Главная</IndexLink>
          <Link to="/auth" className="link" activeClassName="link-active">{authText}</Link>
        </div>
      </Col>
    </Row>);
};

const mapStateToProps = state => ({
  userState: state.users
});

export default connect(mapStateToProps)(Header);
