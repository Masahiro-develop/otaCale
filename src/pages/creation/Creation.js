import { Button, Checkbox, DatePicker, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import swal from "sweetalert";
import ContentsFollow from "../../components/ContentsFollow";
import { contentsList, contentsColor } from "../../data";


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
    
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [url, setUrl] = useState("");

    const [checkedList, setCheckedList] = useState([]);

    function handleChange(e) {
        const content = e.target.id
        if (e.target.checked) {
            const pushedList = [...checkedList, content]
            setCheckedList(pushedList);
        } else {
            setCheckedList(checkedList.filter((a) => a[1] != content[1]));
        }
    }

    useEffect(() => { console.log(checkedList); }, [checkedList])
    
    function submitEvent() {
        if (title == "" && checkedList.length != 1 && startDate == "" && url == "") {
            alert("入力ミスがあります。修正してください")
        } else {
            const category = checkedList[0][0];
            const subCategory = checkedList[0][1];
            const color = contentsColor[subCategory];

            const submitCalender = {
                "title": title,
                "category": category,
                "subCategory": subCategory,
                "url": url,
                "start": isCheckStartTime ? startDate + "T" + startTime : startDate,
                "end": isCheckEnd ? isCheckEndTime ? endDate + "T" + endTime : endDate  : "",
                "backgroundColor": color,
            }
            swal({
                title: title,
                text: "カテゴリー: " + category + " " + subCategory + " 日時: " + submitCalender["start"] + " ~ " + submitCalender["end"] + " URL: " + url + " これで送信しますか？",
                buttons: {
                    cancel: "閉じる",
                    defeat: "送信"
                }
            })
            .then((value)=>{value === "defeat" && console.log(submitCalender);})
        }
    }

    return (
        <Outer>
            <Text>イベントタイトル</Text>
            <TextField type={"text"} onChange={(e) => setTitle(e.target.value)} />
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