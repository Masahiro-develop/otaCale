import { CheckSquareOutlined } from "@ant-design/icons/lib/icons";
import { Button } from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import { get, onValue, push, ref, set } from "firebase/database";
import React, { useState } from "react";
import styled from "styled-components";
import ContentsFollow from "../../components/ContentsFollow";
import CustomFooter from "../../components/CustomFooter";
import CustomHeader from "../../components/CustomHeader";
import { contentsList } from "../../data";
import {useAuthContext} from "../../AuthContext/AuthContext"
import { database } from "../../firebase";
import { useNavigate } from "react-router-dom";
import cryptoJs from "crypto-js";

const Outer = styled.div`
    height: 80vh;
    width: fit-content;
    max-width: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
`;

const SendButton = styled(Button)`
    margin: 10px;
`;

export default function ContentsSelection(props) {

    const [checkedList, setCheckedList] = useState([]);

    const navigate = useNavigate();

    const { user } = useAuthContext();

    function submitContents() {
        const submitLikeContent = {};
        checkedList.forEach((content) => {
            if (submitLikeContent[content[0]] === undefined) {
                submitLikeContent[content[0]] = [content[1]];
            } else {
                submitLikeContent[content[0]].push(content[1]);
            };
        });
        const cryptedEmail = cryptoJs.AES.encrypt(user.email, process.env.REACT_APP_FIREBASE_SECRET_KEY).toString();
        const setData = {
            likeContent: submitLikeContent,
            email: cryptedEmail
        }
        const contentsRef = ref(database, "/users/" + user.uid);
        set(contentsRef, setData);
        navigate("/");
    }

    return (
        <div>
            <Layout>
                <Header><CustomHeader /></Header>
                <Content>
                    <Outer>
                        <h1><CheckSquareOutlined />  あなたの好きなコンテンツを教えてください</h1>
                        <ContentsFollow contentsList={contentsList} checkedList={checkedList} setCheckedList={setCheckedList} />
                        <SendButton type="primary" onClick={submitContents}>送信</SendButton>
                    </Outer>
                </Content>
                <Footer><CustomFooter /></Footer>
            </Layout>
            

        </div>
    )
}