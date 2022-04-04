import { CopyrightOutlined } from "@ant-design/icons/lib/icons";
import { Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import logo from "../images/whiteLogo.png"

const Outer = styled.div`
    text-align: center;
    background-color: #30475E;
    padding: 20px;
    `;

const Logo = styled.img`
    width: 90%;
    margin: 15px;
    `;

const CopyRight = styled.h3`
    margin: 20px;
    color: #F5F5F5;
`;

const Link = styled.a`
    margin: 10px 0;
`;

export default function CustomFooter(props) {
    const navigate = useNavigate()
    return (
        <Outer>
            <Row justify="center">
                <Col span={24} md={12}>
                    <Logo src={logo} />
                </Col>
            </Row>
            <CopyRight>
                Masahiro Hayashi <CopyrightOutlined />2021<br />
                <Row justify="space-around">
                    <Col><Link href="#" onClick={() => window.open("/termsOfUse")}>利用規約</Link></Col>
                    <Col><Link href="#" onClick={()=>navigate("/about")}>OtaCaleとは</Link></Col>
                    <Col><Link href="#" onClick={()=>navigate("/")}>ホームへ戻る</Link></Col>
                </Row>
            </CopyRight>
        </Outer>
    )
}