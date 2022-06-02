import CustomFooter from "../../components/CustomFooter";
import CustomHeader from "../../components/CustomHeader";
import styled from 'styled-components';
import { Button } from "antd";
import { useAuthContext } from "../../AuthContext/AuthContext";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Outer = styled.div`
    height: 100vh;
    background-color: #F5F5F5;
    `;

const Inner = styled.div`
    min-height: 80%;
    padding: 20% 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
`;

const StyledButton = styled(Button)`
    margin: 15px 0;
    min-width: 150px;
    background-color: #30475E;
    color: white;
`;

const ButtonGroup = styled.div`
    font-size: 2em;
    display: grid;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 13px 13px 0px 0 #7AB5F0;
    border: solid #30475E;
`;

export default function Setting(props) {

    const navigate = useNavigate();

    const { user } = useAuthContext();

    const deleteUser = () => {
        swal({
            title: '退会',
            text:
                '一度退会するとアカウントが削除され、元には戻せません。よろしいですか？',
            buttons: {
                cancel: "キャンセル",
                defeat: "退会する"
            }
        }).then((value) => {
            if (value == 'defeat') {
                deleteUser(user).then(() => {
                    navigate('/createAcount')
                }).catch((error) => {
                    console.log(error);
                });
            }
        })
    };


    return (
        <Outer>
            <CustomHeader />
            <Inner >
                <ButtonGroup>
                    設定
                    <StyledButton size="large" onClick={() => navigate('/contentsSelection')}>コンテンツ再選択</StyledButton>
                    <StyledButton size="large" onClick={deleteUser}>退会</StyledButton>
                </ButtonGroup>
            </Inner>
            <CustomFooter />
        </Outer>
    );
};