import React,{ useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Logo from '../../images/UpIcon.svg'
import { Container,InputWrapper,Title,ContactInfo,ContactIcon,ContactImg,Link } from './ContactElements'

function ContactPage() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
      setIsOpen(!isOpen);
    };

    return (
      <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} notTrans={true} />
        <Container>
          <InputWrapper>
            <Title>Contact Me</Title>
            <hr
              style={{
                color: "#000",
                height: "1px",
                width: "80%",
                margin: "20px",
              }}
            />
            <ContactInfo>
              <Link href="mailto:haidarah134@gmail.com">
                <ContactIcon className="fas fa-envelope" onClick="" />
              </Link>
              Contact me through email
            </ContactInfo>
            <ContactInfo>
              <Link href="https://github.com/haidarhalim134">
                <ContactIcon className="fab fa-github" />
              </Link>
              View my repositories at Github
            </ContactInfo>
            <ContactInfo>
              <ContactIcon>
                <Link href="https://www.upwork.com/freelancers/~0158b0e6a800daf390">
                  <ContactImg src={Logo} />
                </Link>
              </ContactIcon>
              Hire me at Upwork
            </ContactInfo>
          </InputWrapper>
        </Container>
      </>
    );
}

export default ContactPage
