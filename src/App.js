import './App.css';
import Creation from './pages/creation/Creation';
// import Main from './pages/Main/Main';
// import ContentsSelection from './pages/contentsSelection/ContentsSelection';
// import CreateAcount from "./pages/createAcount/CreateAcount";
// import Login from './pages/Login/Login';
import jaJP from 'antd/lib/locale-provider/ja_JP';
import { ConfigProvider } from 'antd';

function App() {
    return (
        <div className="App">
        <ConfigProvider locale={jaJP}>
            {/* <CreateAcount /> */}
            {/* <Login /> */}
            {/* <ContentsSelection /> */}
            {/* <Main /> */}
            <Creation />
        </ConfigProvider>
        </div>
    ); 
}

export default App;
