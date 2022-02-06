import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import styled from "styled-components";
import CustomFooter from "../../components/CustomFooter";
import CustomHeader from "../../components/CustomHeader";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "./Main.css"
import swal from 'sweetalert';

const Outer = styled.div`
    min-height: 80vh;
    max-width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 10% auto;
`;

const CustomCalendar = styled(FullCalendar)`
    height: 80%;
`;

const events = [
    {
        "title": '何かのライブ',
        "category": "THE IDOLM@STER",
        "subCategory": "シンデレラガールズ",
        "url": "https://idolmaster-official.jp/live_event/cinderella10th/information/okinawa.php", 
        "start": "2022-02-10T18:00",
        "end": "2022-02-10T21:00",
        "backgroundColor": '#378006',
    },
    {
        "title": '何かのライブの抽選',
        "category": "THE IDOLM@STER",
        "subCategory": "シンデレラガールズ",
        "url": "https://idolmaster-official.jp/live_event/cinderella10th/information/okinawa.php", 
        "start": "2022-02-26",
        "end": "2022-02-31",
    },
]

export default function Main(props) {

    return (
        <div>
            <Layout>
                <Header><CustomHeader /></Header>
                <Content>
                    <Outer>
                        <h1>イベントクリックで詳細を開きます</h1>
                        <CustomCalendar
                            locale={"ja"}
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            dayCellContent={(e) => { e.dayNumberText = e.dayNumberText.replace('日', ''); }}
                            events={events}
                            eventDisplay="block"
                            eventContent={(eventContent)=><div><b>{eventContent.event.title}</b></div>}
                            eventClick={(info) => {
                                info.jsEvent.preventDefault()
                                const startDate = new Date(info.event.startStr);
                                const endDate = new Date(info.event.endStr)
                                swal({
                                    title: info.event.title,
                                    text:
                                        `ジャンル: ${info.event.extendedProps.category} ${info.event.extendedProps.subCategory}
                                        日時: ${startDate.getMonth() + 1}月 ${startDate.getDate()}日 ${startDate.getHours()}時 ~ ${endDate.getMonth() + 1}月 ${endDate.getDate()}日 ${endDate.getHours()}時`,
                                    buttons: {
                                        cancel: "閉じる",
                                        defeat: "公式サイトを開く"
                                    }
                                })
                                .then((value)=>{value === "defeat" && window.open(info.event.url)})
                            }}
                            buttonText={{ today: "今日" }}
                            height={"auto"}
                        />
                    </Outer>
                </Content>
                <Footer><CustomFooter /></Footer>
            </Layout>
        </div>
    )
}
// var tooltip = new (info.el, {
//     title: info.event.extendedProps.description,
//     placement: 'top',
//     trigger: 'hover',
//     container: 'body'
// });