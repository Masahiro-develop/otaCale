import react from "react";
import styled from "styled-components";
import CustomFooter from "../../components/CustomFooter";


const Outer = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
    padding-top: 30px;
    position: relative;/*←相対位置*/
    padding-bottom: 213px;/*←footerの高さ*/
    box-sizing: border-box;/*←全て含めてmin-height:100vhに*/
`;

const Footer = styled.div`
    position: absolute;
    bottom: 0;
`;

const Inner = styled.div`
`;

export default function About() {



    return (
        <Outer>
            <Inner>
            hello
            </Inner>
            <Footer>
                <CustomFooter />
            </Footer>
        </Outer>
    )
}