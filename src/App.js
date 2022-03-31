import './App.css';
import Creation from './pages/creation/Creation';
import Main from './pages/Main/Main';
import ContentsSelection from './pages/contentsSelection/ContentsSelection';
import CreateAcount from "./pages/createAcount/CreateAcount";
import Login from './pages/login/Login';
import jaJP from 'antd/lib/locale-provider/ja_JP';
import { ConfigProvider} from 'antd';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {useAuthContext, AuthProvider} from "./AuthContext/AuthContext"
import About from './pages/about/About';

function App() {

    function Auth({ children }) {
        const { user } = useAuthContext();
        if (user) {
          return <div>{children}</div>
        } else {
          return <Navigate to="/login" />
        }
      }
      

    return (
        <div className="App">
            <AuthProvider>
                <ConfigProvider locale={jaJP}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='about' element={<About />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/createAcount' element={<CreateAcount />} />
                            <Route path="/" element={<Main />} />
                            <Route path='/contentsSelection' element={<ContentsSelection />} />
                            <Route path='/614f2eaaffaf673b5cb5258a36e27c17905e85d3' element={<Creation />} />
                        </Routes>
                    </BrowserRouter>
                </ConfigProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
