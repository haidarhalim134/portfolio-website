import React from 'react'
import { FaBars } from 'react-icons/fa'
import { Nav,NavbarContainer,NavLogo,MobileIcon,NavMenu,NavItem,NavLinks,NavBtn,NavBtnLink } from './NavbarElements.js'

const Navbar = ({ toggle }) => {
    return (
        <>
            <Nav>
                <NavbarContainer> 
                    <NavLogo to='/'>
                        do
                    </NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to='Welcome'>Welcome</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='Experience'>Experience</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='Projects'>Projects</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to='/contact-me'>Contact Me</NavBtnLink>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar
