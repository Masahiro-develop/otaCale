import { CopyrightOutlined } from "@ant-design/icons/lib/icons";
import React from "react";
import styled from "styled-components";

import logo from "../images/whiteLogo.png"

const Outer = styled.div`
    text-align: center;
    background-color: #30475E;
    padding: 20px;
    `;

const Logo = styled.img`
    width: 80%;
    margin: 15px;
    `;

const CopyRight = styled.h3`
    margin: 20px;
    color: #F5F5F5;
`;

export default function CustomFooter(props) {
    return (
        <Outer>
            <Logo src={logo} />
            <CopyRight>
                Masahiro Hayashi <CopyrightOutlined />2021
            </CopyRight>
        </Outer>
    )
}