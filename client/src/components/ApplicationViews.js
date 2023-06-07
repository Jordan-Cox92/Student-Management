import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hello from "./Home";
import StudentList from "./Students/StudentList";
import Login from "./Login";
import Register from "./Register";
import { AddStudentForm } from "./Students/AddStudent";
import { StudentEditForm } from "./Students/StudentEditForm";
import { StudentDelete } from "./Students/StudentDelete";








export default function ApplicationViews({ isLoggedIn }) {
    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
                />

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="home" element={<Hello />} />
                <Route path="students" element={isLoggedIn ? <StudentList /> : <Navigate to="/login" />} />

                <Route path="students/students/add" element={<AddStudentForm />} />


                <Route path="student/edit/:studentId" element={<StudentEditForm />} />

                <Route path="student/delete/:studentId" element={< StudentDelete />} />




            </Route>
        </Routes>
    );
}
