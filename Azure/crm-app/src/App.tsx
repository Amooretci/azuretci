import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import RegisterStudent from "./pages/RegisterStudent";
import StudentProfile from "./pages/StudentProfile";
import Attendance from "./pages/Attendance";
import CSV from "./pages/CSV";
import Profile from "./pages/Profile";

import EllipsisMenu from "./components/EllipsisMenu";

interface Student {
  id: number;
  name: string;
  email: string;
  attendance: string[];
  photoUrl?: string;
  grades?: { [subject: string]: string };
}

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  const navigate = useNavigate();

  const selectStudent = (id: number) => {
    setSelectedStudentId(id);
    navigate("/student-profile");
  };

  return (
    <div style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          backgroundColor: "#0077b6", // blue
          color: "white",
        }}
      >
        <h1 style={{ margin: 0 }}>CRM-app</h1>
        <EllipsisMenu
          menuItems={[
            { label: "Home", onClick: () => navigate("/") },
            { label: "Register Student", onClick: () => navigate("/register") },
            { label: "Attendance", onClick: () => navigate("/attendance") },
            { label: "CSV", onClick: () => navigate("/csv") },
            { label: "Profile", onClick: () => navigate("/profile") },
          ]}
        />
      </header>

      <main style={{ padding: "1rem 2rem" }}>
        <Routes>
          <Route path="/" element={<Home students={students} onSelectStudent={selectStudent} />} />
          <Route path="/register" element={<RegisterStudent students={students} setStudents={setStudents} />} />
          <Route
            path="/student-profile"
            element={
              <StudentProfile
                student={students.find((s) => s.id === selectedStudentId) ?? null}
              />
            }
          />
          <Route path="/attendance" element={<Attendance students={students} />} />
          <Route path="/csv" element={<CSV students={students} setStudents={setStudents} />} />
          <Route path="/profile" element={<Profile student={students.find((s) => s.id === selectedStudentId) ?? null}
            students={students}
            setStudents={setStudents}
          />
  }
/>
        </Routes>
      </main>
    </div>
  );
}
