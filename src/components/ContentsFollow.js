import { Checkbox, Dropdown, Menu, Button } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import "../components/components.css"

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

const StyledButton = styled(Button)`
    text-align: left;
    margin: 10px;
    padding-bottom: 25px;
    border-radius: 8px;
    box-shadow: 5px 5px 0px 0 #7AB5F0;
    border: solid #30475E;
`;

export default function ContentsFollow(props) {

    const categories = Object.keys(props.contentsList);

    const [isVisible0, setIsVisible0] = useState(false);
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    const array = [0, 1, 2];

    function handleChange(e) {
        const index = e.target.id;
        eval("setIsVisible" + index + "(!isVisible" + index + ");");
        const result = array.filter(number => number != index);
        result.forEach((number) => eval("setIsVisible" + number + "(false);"));
    };
    
    function createMenu(subCategory) {
        return (
            <Menu>
                {subCategory.map((contentsName, index) =>
                    <Menu.Item key={index}>
                        <Checkbox>{contentsName}</Checkbox>
                    </Menu.Item>
                )}
            </Menu>
        );
    }
    return (
        <Outer>
            {
                categories.map((category, index) =>
                    <Dropdown overlay={createMenu(props.contentsList[category])} visible={eval("isVisible" + index)} key={index}>
                        <StyledButton id={index} onClick={handleChange}><div id={index}>{category} ▽</div></StyledButton>
                    </Dropdown>
                )
            }
        </Outer>
    )
};

