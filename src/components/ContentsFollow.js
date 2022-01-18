import { Checkbox, Col, Row } from "antd";
import React from "react";
import styled from "styled-components";

const Outer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 13px;
    padding: 15px;
    width: 350px;
    border: solid #30475E;
    border-radius: 15px;
`;

const CustomCheckBox = styled(Checkbox)`
    margin: 20px 0;
    font-size: 2em;
`;

export default function ContentsFollow(props) {
    return (
        <Outer>
            <Row>
                {props.contentsList.map((content, index) =>
                    <Col span={24}>
                        <CustomCheckBox key={index}>
                            {content}
                        </CustomCheckBox>
                    </Col>
                )}
            </Row>
        </Outer>
    )
};