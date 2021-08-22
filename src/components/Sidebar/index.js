import React from 'react'
import { SidebarContainer,Icon,CloseIcon,SidebarWrapper,SidebarMenu,SidebarLink,SideBtnWrap,SidebarRoute } from './SidebarElements.js'
function Sidebar({ isOpen,toggle }) {
    return (
        <SidebarContainer onClick={toggle} isOpen={isOpen}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to='about' onClick={toggle}>
                        Welcome
                    </SidebarLink>
                    <SidebarLink to='Experience' onClick={toggle}>
                        Experience
                    </SidebarLink>
                    <SidebarLink to='Projects' onClick={toggle}>
                        Projects
                    </SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to='/contact-me'>
                        Contact Me
                    </SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
