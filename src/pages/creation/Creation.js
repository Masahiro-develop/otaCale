import { Button, Checkbox, DatePicker, TimePicker } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import ContentsFollow from "../../components/ContentsFollow";
import { contentsList } from "../../data";


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

    const [isCheckStartTime, setCheckStartTime] = useState(true);
    const [isCheckEnd, setCheckEnd] = useState(false);
    const [isCheckEndTime, setCheckEndTime] = useState(true);

    return (
        <Outer>
            <Text>登録するイベントのカテゴリー</Text>
            <ContentsFollow contentsList={contentsList} />
            <Text>※選択するカテゴリはひとつにしてください</Text>
            <Text>登録するイベントの開始日時</Text>
            <input type={"date"} />
            <CustomCheckbox onChange={(e) => setCheckStartTime(!e.target.checked)}>開始時間を指定する</CustomCheckbox>
            <input type={"time"} disabled={isCheckStartTime} step="900" />
            <CustomCheckbox onChange={(e) => setCheckEnd(e.target.checked)}>終了日時も設定する</CustomCheckbox>
            {isCheckEnd &&
                (
                    <EndTime>
                        <Text>登録するイベントの開始日時</Text>
                        <input type={"date"} />
                        <CustomCheckbox onChange={(e) => setCheckEndTime(!e.target.checked)}>終了時間を指定する</CustomCheckbox>
                        <input type={"time"} disabled={isCheckEndTime} step="900" />
                    </EndTime>
                )}
            <Text>情報源である公式URL</Text>
            <input type={"url"} />
            <CustomButton>送信</CustomButton>
        </Outer>
    )
}