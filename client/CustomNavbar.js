import React from 'react';

import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';


export default class CustomNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.selectedTabId = 1;
    }

    render() {
        return (
            <header className="site-header">
                <Navbar className="blue">
                    <Nav>
                        <NavItem eventKey={1} href="/" isActive={ this.isActive(1) }  onClick={ this.setActiveTab.bind(this, 1) }>
                            Home
                        </NavItem>
                        <NavItem eventKey={2} href="#" isActive={ this.isActive(2) }  onClick={ this.setActiveTab.bind(this, 2) }>
                            Charts
                        </NavItem>
                        <NavItem eventKey={3} href="#" isActive={ this.isActive(3) }  onClick={ this.setActiveTab.bind(this, 3) }>
                            About
                        </NavItem>
                    </Nav>
                </Navbar>
            </header>
        );
    }

    isActive(id) {
        console.log(`isActive(${id})`);
        return this.selectedTabId === id;
    }

    setActiveTab(selectedTabId) {
        console.log(`this.selectedTabId = ${this.selectedTabId}`);
        this.setState({ selectedTabId });
    }
}
