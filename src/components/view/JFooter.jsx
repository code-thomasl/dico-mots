import React from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarText
  } from 'reactstrap';

export default function JFooter() {
    return (
        <div className="fixed-bottom">  
            <Navbar color="dark" dark expand="sm">
                <NavbarBrand>
                    <span className="author-name">Thomas L.</span>
                </NavbarBrand>
                <NavbarText>
                    <span className="about-github">Projet Dic o mots</span>
                </NavbarText>

            </Navbar>
        </div>
    )
}
