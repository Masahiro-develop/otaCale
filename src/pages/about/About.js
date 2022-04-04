import react from "react";
import styled from "styled-components";
import CustomFooter from "../../components/CustomFooter";
import smartphoneImage1 from "../../images/smartphoneScreenShot.png";
import smartphoneImage2 from "../../images/smartphoneScreenShot2.png";
import emailImage from "../../images/mailSample.png";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const Outer = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
    padding-top: 30px;
    position: relative;/*←相対位置*/
    padding-bottom: 3em;/*←footerの高さ*/
    box-sizing: border-box;/*←全て含めてmin-height:100vhに*/
    background-color: #F5F5F5;
`;

const Inner = styled.div`
    max-width: 90%;
    text-align: center;
`;

const Title = styled.h1`
    margin: 15px 0;
    width: 100%;
    color: #F5F5F5;
    background-color: #30475E;
    border-radius: 10px;
    font-size: 2.5em;
`;

const Content = styled.div`
    font-size: 1em;
    margin: 15px auto;
`;

const Heading = styled.div`
    margin: 15px auto;
    font-size: 1.5em;
    width: fit-content;
    border-bottom: 1px solid;
`;

const ContentsImage = styled.img`
    box-shadow: 0 10px 25px 0 #30475e;
    margin: 15px auto;
`;

const CustomButton = styled(Button)`
    background-color: #30475E;
    color: white;
    margin: 15px auto;
`;

const Footer = styled.div`
    width: 100%;
    height: 3em;
    position: absolute;
    bottom: 0;
`;

export default function About() {

    const navigate = useNavigate();

    return (
        <Outer>
            <Inner>
                <Title>
                    About
                </Title>
                <Heading>
                    OtaCaleについて
                </Heading>
                <Content>
                    あなたの現地参戦を全力で応募するサービスです。<br />
                    あなたの好きなコンテンツを選択するだけで、あなただけのカレンダーが作成されます。<br />
                    イベント当日や、抽選応募開始のタイミングにはメールにてお知らせします。
                </Content>
                <hr />
                <Row justify="space-around" align="middle">
                    <Col lg={10}>
                        <Heading>
                            ・実際に作成されるカレンダーの例
                        </Heading>
                        <ContentsImage src={smartphoneImage1} height="500" width="292" />
                        <Content>
                            各コンテンツのキーカラーで色をつけているので一目でどのコンテンツについての予定なのかがわかります。
                        </Content>
                    </Col>
                    <Col lg={10}>
                        <Heading>
                            ・直接公式ページへ移動できます。
                        </Heading>
                        <ContentsImage src={smartphoneImage2} height="500" width="292" />
                        <Content>
                            カレンダーを確認していて応募し忘れに気づいた時、ライブ当日に出演者の再確認がしたい時などに便利です。
                        </Content>
                    </Col>
                </Row>
                <Heading>
                    ・送信されるメールの例
                </Heading>
                <ContentsImage src={emailImage} height="230" width="328" />
                <Content>
                    定期的にカレンダーを確認しなくても、普段のメール確認のついでにライブのスケジュール管理もできちゃいます。
                </Content>
                <CustomButton size="large" shape="round" onClick={()=>{navigate("/createAcount")}}>登録</CustomButton>
                <hr />
                <Heading>
                    OtaCaleを作った理由
                </Heading>
                <Content>
                    2019年からライブやイベントのあり方が大きく変わり、延期や中止などに追い込まれてしまうものも多くありました。<br />
                    そうしてライブ、イベントが貴重になった今だからこそ、「ひとつひとつを大切にしたい。絶対に参加したい。」そんな思いからこのOtaCaleを作りました。<br />
                    あなたの現地参戦へ少しでも手助けになれば幸いです。
                </Content>
            </Inner>
            <Footer>
                <CustomFooter />
            </Footer>
        </Outer>
    )
}