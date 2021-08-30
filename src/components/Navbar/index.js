import React,{useState,useEffect} from 'react'
import { FaBars } from 'react-icons/fa'
import { Nav,NavbarContainer,NavLogo,MobileIcon,NavMenu,NavItem,NavLinks,NavLinksTo,NavBtn,NavBtnLink } from './NavbarElements.js'

const Navbar = ({ toggle,homePage,notTrans }) => {
    const [scrollNav, setScrollNav] = useState(notTrans);

    const changeNav = () => {
      if(window.scrollY >= 80){
        setScrollNav(true)
      } else {
        setScrollNav(notTrans);
      }
    }
    
    useEffect(()=>{
      window.addEventListener('scroll',changeNav)
    })

    return (
      <>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/">Home</NavLogo>
            <MobileIcon>
              <FaBars onClick={toggle} />
            </MobileIcon>
            {homePage ? (
              <NavMenu>
                <NavItem>
                  <NavLinks
                    to="welcome"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Welcome
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks
                    to="projects"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Projects
                  </NavLinks>
                </NavItem>
              </NavMenu>
            ) : (
              <NavMenu>
                <NavItem>
                  <NavLinksTo
                    to="/#welcome"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Welcome
                  </NavLinksTo>
                </NavItem>
                <NavItem>
                  <NavLinksTo
                    to="/#projects"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Projects
                  </NavLinksTo>
                </NavItem>
              </NavMenu>
            )}
            <NavBtn>
              <NavBtnLink to="/contact-me">Contact Me</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </>
    );
}

export default Navbar
