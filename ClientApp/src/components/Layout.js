import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import {  NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="h-100 container">
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
        <div>
            <NavLink tag={Link} className="text-dark" to="/Administration">Administrace</NavLink>
        </div>
      </div>
    );
  }
}
