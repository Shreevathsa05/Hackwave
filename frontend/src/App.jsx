import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./Components/Header";
import { Home } from "./Components/Home";
import { Feature } from "./Components/Features";
import { Faq } from "./Components/Faq";
import { Login } from "./Pages/StudentLogin";
import { TeacherLogin } from "./Pages/Teacherlogin";
import { Footer } from "./Components/Footer";
import { Studentdash } from "./Pages/Studentdashboard";
import { TeacherDash } from "./Pages/Teacherdashboard";

export const App = () => {
  const [studentRoutes, setStudentRoutes] = useState([]);
  const [teacherRoutes, setTeacherRoutes] = useState([]);

  useEffect(() => {
   
    const studentData = [
      { path: "dashboard", name: "Dashboard", element: <h1 className="text-white">Student Dashboard</h1> },
      { path: "courses", name: "Courses", element: <h2 className="text-white">Courses Page</h2> },
      { path: "assignments", name: "Assignments", element: <h3 className="text-white">Assignments Page</h3> },
      { path: "messages", name: "Messages", element: <h4 className="text-white">Messages Page</h4> },
      { path: "upcoming", name: "Upcoming", element: <h5 className="text-white">Upcoming Page</h5> },
    ];
    setStudentRoutes(studentData);

  
    const teacherData = [
      { path: "students", name: "Students", element: <h1 className="text-white">Students List</h1> },
      { path: "create-task", name: "Create Task", element: <h2 className="text-white">Create Task Page</h2> },
      { path: "assign-task", name: "Assign Task", element: <h3 className="text-white">Assign Task Page</h3> },
      { path: "messages", name: "Messages", element: <h4 className="text-white">Teacher Messages</h4> },
    ];
    setTeacherRoutes(teacherData);
  }, []);

  return (
    <Routes>
      {/* Home page */}
      <Route
        path="/"
        element={
          <>
            <Header />
            <Home />
            <Feature />
            <Faq />
            <Footer />
          </>
        }
      />

      <Route path="/studnetsignup" element={<Login />} />
      <Route path="/teacherlogin" element={<TeacherLogin />} />


    
      <Route path="/studentdashboard" element={<Studentdash routes={studentRoutes} />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        {studentRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

    
      <Route path="/teacherdashboard" element={<TeacherDash routes={teacherRoutes} />}>
        <Route index element={<Navigate to="students" replace />} />
        {teacherRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default App;

