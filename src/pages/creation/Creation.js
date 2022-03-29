import { Button, Checkbox, DatePicker, TimePicker } from "antd";
import { onValue, orderByChild, push, query, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import swal from "sweetalert";
import { database } from "../../firebase";
import ContentsFollow from "../../components/ContentsFollow";
import { contentsList, contentsColor } from "../../data";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Outer = styled.div`
    min-height: 100vh;
    padding: 5% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    `;

const Text = styled.div`
    color: #F5F5F5;
    margin: 20px 0;
    font-size: 2em;
    `;

const TextField = styled.input`
    width: 50%;
`;

const Select = styled.select`
    font-size: 2em;
`;

const CustomCheckbox = styled(Checkbox)`
    color: #F5F5F5;
    font-size: 2em;
    margin: 20px 0;
    `;

const CustomButton = styled(Button)`
    margin: 20px 0;
`;

const EndTime = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default function Creation(props) {

    const [isCheckStartTime, setCheckStartTime] = useState(false);
    const [isCheckEnd, setCheckEnd] = useState(false);
    const [isCheckEndTime, setCheckEndTime] = useState(false);
    
    const [title, setTitle] = useState("");
    const [forMailTitle, setForMailTitle] = useState("");
    const [eventType, setEventType] = useState("抽選応募");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [url, setUrl] = useState("");
    
    const [checkedList, setCheckedList] = useState([]);

    const navigate = useNavigate();

    function setCalendar(calendar) {
        return new Promise((resolve) => {
            const eventsRef = ref(database, "/events/" + calendar["category"] + "/" + calendar["subCategory"]);
            // onValue(eventsRef, (snapshot) => {
            //     let registeredEvent = snapshot.val();
            //     if (registeredEvent === null) {
            //         registeredEvent = {};
            //     }
            //     registeredEvent[calendar["title"]] = calendar;
            //     set(eventsRef, registeredEvent);
            //     return resolve(registeredEvent)
            // });
            push(eventsRef, calendar);
            resolve(calendar)
        });
    };
    
    function submitEvent() {
        if (title === "" || eventType === "" || checkedList.length !== 1 || startDate === "" || url === "") {
            alert("入力ミスがあります。修正してください");
        } else {
            const category = checkedList[0][0];
            const subCategory = checkedList[0][1];
            const color = contentsColor[subCategory];
            const start = new Date(isCheckStartTime ? startDate + "T" + startTime : startDate);
            
            const submitCalender = {
                "title": title,
                "forMailTitle": forMailTitle,
                "eventType": eventType,
                "category": category,
                "subCategory": subCategory,
                "url": url,
                "start": start.getTime(),
                "end": isCheckEnd ? isCheckEndTime ? endDate + "T" + endTime : endDate : start.getTime(),
                "backgroundColor": color,
            }
            swal({
                title: title,
                text: "カテゴリー: " + category + " " + subCategory + "\n日時: " + new Date(submitCalender["start"]).toLocaleString() + " ~ " + new Date(submitCalender["end"]).toLocaleString() + "\nURL: " + url + "\nこれで送信しますか？",
                buttons: {
                    cancel: "閉じる",
                    defeat: "送信"
                }
            })
            .then((value) => {
                if (value === "defeat") {
                    setCalendar(submitCalender).then(event => {  
                        console.log("event submit success")
                        console.log(event);
                        navigate("/");
                    })
                }
                });
        }
    }

    return (
        <Outer>
            <Text>イベントタイトル</Text>
            <TextField type={"text"} onChange={(e) => setTitle(e.target.value)} />
            <Text>メール配信用のイベント名を入力してください</Text>
            <TextField type={"text"} onChange={(e) => setForMailTitle(e.target.value)} />
            <Text>イベントの種類を選んでください</Text>
            <Select onChange={(e) => setEventType(e.target.value)}>
                <option value="抽選応募">抽選応募</option>
                <option value="ライブ">ライブ</option>
            </Select>
            <Text>登録するイベントのカテゴリー</Text>
            <ContentsFollow contentsList={contentsList} checkedList={checkedList} setCheckedList={setCheckedList} />
            <Text>※選択するカテゴリはひとつにしてください</Text>
            <Text>登録するイベントの開始日時</Text>
            <input type={"date"} onChange={(e) => setStartDate(e.target.value)} />
            <CustomCheckbox onChange={(e) => setCheckStartTime(e.target.checked)}>開始時間を指定する</CustomCheckbox>
            <input type={"time"} onChange={(e) => setStartTime(e.target.value)} disabled={!isCheckStartTime} />
            <CustomCheckbox onChange={(e) => setCheckEnd(e.target.checked)}>終了日時も設定する</CustomCheckbox>
            {isCheckEnd &&
                (
                    <EndTime>
                        <Text>登録するイベントの開始日時</Text>
                        <input type={"date"} onChange={(e) => setEndDate(e.target.value)} />
                        <CustomCheckbox onChange={(e) => setCheckEndTime(e.target.checked)}>終了時間を指定する</CustomCheckbox>
                        <input type={"time"} onChange={(e) => setEndTime(e.target.value)} disabled={!isCheckEndTime} />
                    </EndTime>
                )}
            <Text>情報源である公式URL</Text>
            <TextField type={"url"} onChange={(e) => setUrl(e.target.value)} />
            <CustomButton onClick={submitEvent}>送信</CustomButton>
        </Outer>
    )
}