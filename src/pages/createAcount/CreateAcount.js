import { Button, Input, Space } from "antd";
import React from "react";
import styled from "styled-components";

import logoImg from "../../images/オタカレロゴ正方形.png"

const Outer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

const StyledForm = styled.form`
    background-color: #30475E;
    max-width: 350px;
    padding: 15px;
    border-radius: 30px;
    display: inline-block;
`;

const StyledInput = styled(Input)`
    height: 3em;
    width: 95%;
    margin: 10px 0;
    border-radius: 5px;
`;

export default function CreateAcount(props) {

    return (
        <div>

            <Outer>
            <Space align="center">
                <Inner>
                    
                        <TitleImg src={logoImg} alt="ロゴ" />
                        <h1>オタカレへようこそ</h1>

                    <StyledForm>
                            <StyledInput type="email" placeholder="メールアドレス" />

                            <StyledInput type="password" placeholder="パスワード" />

                        <Button>登録</Button>
                    </StyledForm>

                </Inner>
                
            </Space>
            </Outer>

        </div>
    )
}