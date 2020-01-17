import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18next';
import DarkModeToggle from '../controller/DarkModeToggle';

const handleClick = (lang) => {
  i18n.changeLanguage(lang)
}

const JNavBar = (props) => {
  const [isOpen, setIsOpen, dropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/">Dic o mots</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/about">{t('About.1')}</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Changer l'ordre
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <i className="fas fa-globe-europe"></i> Langue
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={()=>handleClick('en')}>
                  English
                </DropdownItem>
                <DropdownItem onClick={()=>handleClick('fr')}>
                  French
                </DropdownItem>
                <DropdownItem onClick={()=>handleClick('es')}>
                  Spanish
                </DropdownItem>
                <DropdownItem onClick={()=>handleClick('it')}>
                  Italian
                </DropdownItem>
                <DropdownItem  onClick={()=>handleClick('zh-CN')}>
                  Mandarin Chinese
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

          </Nav>
          <Nav>
            <NavItem>
                <NavLink href="https://github.com/code-thomasl/"><i className="fab fa-github"></i> GitHub</NavLink>
            </NavItem>
            <DarkModeToggle />
            </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default JNavBar;
