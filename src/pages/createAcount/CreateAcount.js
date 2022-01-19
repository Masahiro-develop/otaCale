import { Button, Input, Space } from "antd";
import React from "react";
import styled from "styled-components";

import logoImg from "../../images/iconLogo.png"

const Outer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F5F5F5;
`;

const Inner = styled.div`
    height: 100%;
    margin: auto;
    text-align: center;
`;

const TitleImg = styled.img`
    margin: 20px auto;
    width: 150px;
    height: 150px;
    border-radius: 30px;
`;

const Title = styled.h1`
    font-weight: 900;
`;

const StyledForm = styled.form`
    display: inline-block;
    max-width: 350px;
    padding: 15px;
    border-radius: 20px;
    box-shadow: 13px 13px 0px 0 #7AB5F0;
    border: solid #30475E;
`;

const StyledInput = styled(Input)`
    height: 3em;
    width: 95%;
    margin: 10px 0;
    border-radius: 5px;
`;

const StyledSpace = styled(Space)`
    display: contents;
`;

const RegistrationLink = styled.h2`
    margin-top: 25px;
`;

export default function CreateAcount(props) {

    return (
        <div>

            <Outer>
            <StyledSpace align="center">
                <Inner>
                    
                        <TitleImg src={logoImg} alt="ロゴ" />
                        <Title>オタカレへようこそ</Title>

                    <StyledForm>
                            <StyledInput type="email" placeholder="メールアドレス" />

                            <StyledInput type="password" placeholder="パスワード" />

                        <Button type="primary">登録</Button>
                    </StyledForm>

                </Inner>
                <RegistrationLink>ログインはこちら</RegistrationLink>
            </StyledSpace>
            </Outer>

        </div>
    )
}