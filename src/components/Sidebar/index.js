import React from 'react'
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SidebarLinkTo,
  SideBtnWrap,
  SidebarRoute,
} from "./SidebarElements.js";
function Sidebar({ isOpen,toggle,remove,homePage }) {
    return (
      <SidebarContainer onClick={toggle} remove={remove} isOpen={isOpen}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          {homePage ? (
            <SidebarMenu>
              <SidebarLink
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
                to="welcome"
                onClick={toggle}
              >
                Welcome
              </SidebarLink>
              <SidebarLink
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
                to="projects"
                onClick={toggle}
              >
                Projects
              </SidebarLink>
            </SidebarMenu>
          ) : (
            <SidebarMenu>
              <SidebarLinkTo to="/#welcome" onClick={toggle}>
                Welcome
              </SidebarLinkTo>
              <SidebarLinkTo to="/#projects" onClick={toggle}>
                Projects
              </SidebarLinkTo>
            </SidebarMenu>
          )}
          <SideBtnWrap>
            <SidebarRoute to="/contact-me">Contact Me</SidebarRoute>
          </SideBtnWrap>
        </SidebarWrapper>
      </SidebarContainer>
    );
}

export default Sidebar
