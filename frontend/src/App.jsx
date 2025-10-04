import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import { Header } from "./Components/Header";
import { Home } from "./Components/Home";
import { Feature } from "./Components/Features";
import { Faq } from "./Components/Faq";
import { Footer } from "./Components/Footer";

// Pages
import { Login } from "./pages/StudentLogin";
import { TeacherLogin } from "./pages/Teacherlogin";
import { Studentdash } from "./pages/Studentdashboard";
import { TeacherDash } from "./pages/Teacherdashboard";

// AI Exam/Quiz Pages
import CreateExam from "./pages/CreateExam";
import Quiz from "./pages/Quiz";
import Analysis from "./pages/Analysis";

// Context
import { ExamProvider } from "./components/ExamContext";

export const App = () => {
  const [studentRoutes, setStudentRoutes] = useState([]);
  const [teacherRoutes, setTeacherRoutes] = useState([]);

  useEffect(() => {
    // ✅ Student dashboard routes
    const studentData = [
      { path: "dashboard", name: "Dashboard", element: <h1 className="text-white">Student Dashboard</h1> },
      { path: "courses", name: "Courses", element: <h2 className="text-white">Courses Page</h2> },
      { path: "assignments", name: "Assignments", element: <h3 className="text-white">Assignments Page</h3> },
      { path: "messages", name: "Messages", element: <h4 className="text-white">Messages Page</h4> },
      { path: "upcoming", name: "Upcoming", element: <h5 className="text-white">Upcoming Page</h5> },
    ];
    setStudentRoutes(studentData);

    // ✅ Teacher dashboard routes
    const teacherData = [
      { path: "students", name: "Students", element: <h1 className="text-white">Students List</h1> },
      { path: "create-task", name: "Create Task", element: <CreateExam />},
      { path: "assign-task", name: "Assigned Task", element:<ShowAll /> },
      { path: "messages", name: "Messages", element: <h4 className="text-white">Teacher Messages</h4> },
    ];
    setTeacherRoutes(teacherData);
  }, []);

  return (
    <ExamProvider>
      <Routes>
        {/* 🌍 Public Home Page */}
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

        {/* 🔑 Auth Pages */}
        <Route path="/studentsignup" element={<Login />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />

        {/* 🎓 Student Dashboard Routes */}
        <Route path="/studentdashboard" element={<Studentdash routes={studentRoutes} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          {studentRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* 🧑‍🏫 Teacher Dashboard Routes */}
        <Route path="/teacherdashboard" element={<TeacherDash routes={teacherRoutes} />}>
          <Route index element={<Navigate to="students" replace />} />
          {teacherRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* 🤖 AI Dynamic Quiz System */}
        <Route path="/create/:examId" element={<CreateExam />} />
        <Route path="/quiz/:examId" element={<Quiz />} />
        <Route path="/analysis/:examId" element={<Analysis />} />

        {/* 🚫 Fallback Route (404 Page) */}
        <Route
          path="*"
          element={
            <div className="h-screen flex flex-col items-center justify-center text-white bg-gray-900">
              <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
              <p className="text-gray-400">The page you’re looking for doesn’t exist.</p>
              <a href="/" className="mt-4 text-blue-400 underline">
                Go Back Home
              </a>
            </div>
          }
        />
      </Routes>
    </ExamProvider>
  );
};

export default App;
