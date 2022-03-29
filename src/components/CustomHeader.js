import { Button, Row, Col } from "antd";
import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import avatorImg from "../images/iconLogo.png";
import { getAuth } from "firebase/auth";

const StyledHeader = styled.div`
    width: 100%;
    padding: 15px 1.5em;
`;

const Logo = styled.img`
    height: 6em;
    border-radius: 5px;
`;

const CustomButton = styled(Button)`
    width: 100%;
    height: 70%;
    margin: 10px;
    background-color: #30475E;
    color: white;
    border-radius: 5px;
`;

export default function CustomHeader(props) {
    const auth = getAuth();
    const navigate = useNavigate();
    return (
        <StyledHeader>
            <Row align="middle" justify="space-around">
                <Col span={9} md={18}>
                    <Logo src={avatorImg} />
                </Col>
                <Col span={7} md={2}>
                    <CustomButton><Link to={"/contentsSelection"}>設定</Link></CustomButton>
                </Col>
                <Col span={7} md={2}>
                    <CustomButton onClick={() => {
                        auth.signOut();
                        navigate("/login");
                    }}>ログアウト</CustomButton>
                </Col>
            </Row>
        </StyledHeader>
    )
}