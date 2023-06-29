import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AuthRoute from "./Routes/AuthRoute";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/dashboard" element={<AuthRoute/>}>
         <Route path="mainpage" element={<MainPage/>}/>
      </Route>
      <Route path="/register" element={<Register/>}/>
      <Route path= "/login" element={<Login/>}/>
      <Route path="/*" element={<PageNotFound/>}/>
    </Routes>
  );
}




export default App;
