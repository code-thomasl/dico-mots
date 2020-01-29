import React from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarText
  } from 'reactstrap';
import { useTranslation } from 'react-i18next';


export default function JFooter() {
    const { t, i18n } = useTranslation();

    return (
        <div className="fixed-bottom">  
            <Navbar color="dark" dark expand="sm">
                <NavbarBrand>
                    <span className="author-name">Thomas L.</span>
                </NavbarBrand>
                <NavbarText>
                    <span className="about-github">{t('Footer.1')}</span>
                </NavbarText>

            </Navbar>
        </div>
    )
}
