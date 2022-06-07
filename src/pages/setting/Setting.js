import CustomFooter from "../../components/CustomFooter";
import CustomHeader from "../../components/CustomHeader";
import styled from 'styled-components';
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { ref, remove } from "firebase/database";
import { database } from "../../firebase";
import { getAuth, deleteUser } from "firebase/auth";

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

    const auth = getAuth();

    const user = auth.currentUser;

    const userRef = ref(database, `/users/${user.uid}`);

    const deleteUserPopUp = () => {
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
                    remove(userRef)
                    navigate('/createAcount')
                }).catch((error) => {
                    console.log(error);
                    if (error.code === 'auth/requires-recent-login') {
                        alert('ログインから時間が経っているため、一旦ログアウトし、ログインし直してから実行してください。')
                    }
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
                    <StyledButton size="large" onClick={deleteUserPopUp}>退会</StyledButton>
                </ButtonGroup>
            </Inner>
            <CustomFooter />
        </Outer>
    );
};