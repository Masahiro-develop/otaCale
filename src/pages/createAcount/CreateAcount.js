import { Button, Input, Space } from "antd";
import cryptoJs from "crypto-js";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { database } from "../../firebase";

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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    
    function createAcount() {
        console.log(email + password);
        const emailPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
        if (!emailPattern.test(email)) {
            alert("正しいメール形式で入力してください");
        } else if (password.length < 8) {
            alert("パスワードは8文字以上で入力してください");
        } else {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // サインイン後の処理
                    const user = userCredential.user;

                    const secretKey = process.env.REACT_APP_FIREBASE_SECRET_KEY;
                    const encryptedEmail = cryptoJs.AES.encrypt(user.email, secretKey).toString();

                    const userRef = ref(database, "/users/" + user.uid);
                    const submitUserData = {
                        email: encryptedEmail
                    };
                    console.log(submitUserData);
                    set(userRef, submitUserData)
                    navigate("/contentsSelection");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("errorCode: " + errorCode + " errorMessage: " + errorMessage);
                    if (error.code === "auth/email-already-in-use") {
                        alert("このメールアドレスは既に使用されています。")
                    }
                });
        }
    }

    return (
        <div>

            <Outer>
            <StyledSpace align="center">
                <Inner>
                        <TitleImg src={logoImg} alt="ロゴ" />
                        <Title>オタカレへようこそ</Title>
                    <StyledForm>
                            <StyledInput autoComplete="email" type="email" placeholder="メールアドレス" value={email} onChange={(e)=>setEmail(e.target.value)} />

                            <StyledInput autoComplete="new-password" type="password" placeholder="パスワード" value={password} onChange={(e)=>setPassword(e.target.value)} />

                        <Button type="primary" onClick={createAcount}>登録</Button>
                    </StyledForm>
                <RegistrationLink>ログインはこちら</RegistrationLink>
                </Inner>
            </StyledSpace>
            </Outer>

        </div>
    )
}