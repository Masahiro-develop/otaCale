import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import CustomFooter from "../../components/CustomFooter";
import CustomHeader from "../../components/CustomHeader";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "./Main.css"
import swal from 'sweetalert';
import ReactLoading from "react-loading";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase";
import { useAuthContext } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Outer = styled.div`
    min-height: 100%;
`;

const Inner = styled.div`
    min-height: 65vh;
    max-width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 3em auto;
`;

const Comment = styled.h1`
    text-align: center;
`;

export default function Main(props) {

    const [events, setEvents] = useState([]);
    const [pushEvents, setPushEvents] = useState([]);

    const [isContentsLoading, setIsContentsLoading] = useState(true);
    const [isEventsLoading, setIsEventLoading] = useState(true);

    const calendarRef = useRef(null);

    const { user } = useAuthContext();

    const navigate = useNavigate();

    
    useEffect(() => {
        document.title = "カレンダー";
        if (user) {
            let copyEvents = [];
            const contentsRef = ref(database, "/users/" + user.uid + "/likeContent");
            onValue(contentsRef, (snapshot) => {
                const likeContents = snapshot.val();
                const categories = Object.keys(likeContents);
                for (const index in categories) {
                    const category = categories[index]
                    const subCategories = likeContents[category]
                    for (const index in subCategories) {
                        const subCategory = subCategories[index]
                        onValue(ref(database, "/events/" + category + "/" + subCategory), (snapshot) => {
                            const event = snapshot.val();
                            if (event != null) {
                                copyEvents = { ...copyEvents, ...event }
                                setPushEvents(Object.values(copyEvents));
                            }
                        });
                        if (index == subCategories.length - 1) {
                            setIsEventLoading(false);
                        }
                    }
                    if (index == categories.length - 1) {
                        setIsContentsLoading(false);
                    }
                }
            })
        } else {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        setEvents(pushEvents);
    }, [pushEvents])


    return (
        <Outer>
            <Layout>
                <Header><CustomHeader /></Header>
                <Content>
                    <Inner>
                        {
                            isContentsLoading || isEventsLoading
                                ?
                                <ReactLoading type={"spin"} color={"#30475E"} />
                                :
                                <div style={isContentsLoading && isEventsLoading ? { display: "none" }: {}}>
                                    <Comment>イベントクリックで詳細を開きます</Comment>
                                    <FullCalendar
                                        
                                        locale={"ja"}
                                        plugins={[dayGridPlugin]}
                                        initialView="dayGridMonth"
                                        dayCellContent={(e) => { e.dayNumberText = e.dayNumberText.replace('日', ''); }}
                                        events={events}
                                        eventDisplay="block"
                                        eventContent={(eventContent) => <div><b>{eventContent.event.title}</b></div>}
                                        eventClick={(info) => {
                                            info.jsEvent.preventDefault()
                                            const startDate = new Date(info.event.startStr).toLocaleString();
                                            let endDate = "";
                                            if (info.event.endStr != "") {
                                            endDate = new Date(info.event.endStr).toLocaleString();
                                            }
                                            swal({
                                                title: info.event.title,
                                                text:
                                                    `ジャンル: ${info.event.extendedProps.category} ${info.event.extendedProps.subCategory}\n日時: ${startDate} ~ ${ startDate != endDate ? endDate : ""}`,
                                                buttons: {
                                                    cancel: "閉じる",
                                                    defeat: "公式サイトを開く"
                                                }
                                            })
                                                .then((value) => { value === "defeat" && window.open(info.event.url) })
                                        }}
                                        buttonText={{ today: "今日" }}
                                        aspectRatio={"1"}
                                        contentHeight={"auto"}
                                        ref={calendarRef}
                                    />
                                </div>
                        }
                    </Inner>
                </Content>
                <Footer><CustomFooter /></Footer>
            </Layout>
        </Outer>
    )
}