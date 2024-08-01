import React, { useState } from 'react';
import {
Navbar,
NavbarBrand,
Nav,
NavItem,
NavLink,
UncontrolledDropdown,
DropdownToggle,
DropdownMenu,
DropdownItem,
} from 'reactstrap';
import Logout from './logout';
import { useAuth } from '../context/authContext';

const NavBar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const toogleModal = () => setIsModalOpen(!isModalOpen)
	const {loggedIn, username} = useAuth()

	return (
		<>
			<Navbar color='info' expand='lg' fixed='top' container='fluid'>
				<NavbarBrand href="/">The Name</NavbarBrand>
				<Nav className="me-auto" navbar>
					<NavItem>
						<NavLink href="/components/">Components</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="https://github.com/reactstrap/reactstrap">
							GitHub
						</NavLink>
					</NavItem>
					<NavItem>
						{loggedIn &&
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								{username}
							</DropdownToggle>
							<DropdownMenu end>
								<DropdownItem>Option 1</DropdownItem>
								<DropdownItem>Option 2</DropdownItem>
								<DropdownItem divider />
								<DropdownItem style={{color: 'red'}} onClick={toogleModal}>Logout</DropdownItem>
								<Logout isOpen={isModalOpen} toggle={toogleModal}/>
							</DropdownMenu>
						</UncontrolledDropdown>}
					</NavItem>
				</Nav>
			</Navbar>
	  </>
	);
}

export default NavBar