import { CheckSquareOutlined } from "@ant-design/icons/lib/icons";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import styled from "styled-components";
import ContentsFollow from "../../components/ContentsFollow";
import CustomFooter from "../../components/CustomFooter";
import CustomHeader from "../../components/CustomHeader";

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

export default function ContentsSelection(props) {
    const contentsList = ["THE IDOLM@STER", "BanG Dream!", "ラブライブ!"];

    return (
        <div>
            <Layout>
                <Header><CustomHeader /></Header>
                <Content>
                    <Outer>
                        <h1><CheckSquareOutlined />  あなたの好きなコンテンツを教えてください</h1>
                        <ContentsFollow contentsList={contentsList} />
                    </Outer>
                </Content>
                <Footer><CustomFooter /></Footer>
            </Layout>
            

        </div>
    )
}