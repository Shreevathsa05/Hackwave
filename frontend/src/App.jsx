import { Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header";
import { Home } from "./Components/Home";
import { Feature } from "./Components/Features";
import { Faq } from "./Components/Faq";
import { Login } from "./Pages/StudentLogin";
import { TeacherLogin } from "./Pages/Teacherlogin";

export const App = () => {
  return (
    <>
    
    

      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Feature />
              <Faq />
            </>
          }
        />

        <Route path="/studnetsignup" element={<Login />} />
        <Route path="/tecaherlogin" element={<TeacherLogin />}/>
      </Routes>
    </>
  );
};

export default App;
