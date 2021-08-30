import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 700px;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const InputWrapper = styled.div`
    width: 400px;
    height: 500px;
    background: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Title = styled.h1`
  color: #01bf71;
  font-size: 48px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const ContactInfo = styled.div`
  width: 80%;
  height: 50px;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: #01bf71 1px solid;
  border-radius: 25px;
  padding: 10px;
  margin: 5px;
`;

export const ContactIcon = styled.div`
    width: auto;
    min-height: 50px;
    font-size: 25px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ContactImg = styled.img`
    height: 30px;
    width: 30px;
`

export const Link = styled.a`
    color: #000;
    border: 0;
    outline: none;
    text-decoration: none;
`