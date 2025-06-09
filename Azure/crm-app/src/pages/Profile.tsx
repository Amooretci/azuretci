import React, { useState, type ChangeEvent } from "react";

interface Student {
  id: number;
  name: string;
  email: string;
  attendance: string[];
  photoUrl?: string;
  grades?: { [subject: string]: string };
}

interface Props {
  student: Student | null;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export default function Profile({ student, students, setStudents }: Props) {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");

  if (!student) {
    return <p>No student selected.</p>;
  }

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const updatedStudents = students.map((s) =>
        s.id === student.id ? { ...s, photoUrl: result } : s
      );
      setStudents(updatedStudents);
    };
    reader.readAsDataURL(file);
  };

  const handleGradeSubmit = () => {
    if (!subject || !grade) return;

    const updatedStudents = students.map((s) =>
      s.id === student.id
        ? {
            ...s,
            grades: {
              ...s.grades,
              [subject]: grade,
            },
          }
        : s
    );
    setStudents(updatedStudents);
    setSubject("");
    setGrade("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ color: "#0077b6" }}>Student Profile</h2>

      {student.photoUrl && (
        <img
          src={student.photoUrl}
          alt="Profile"
          style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover" }}
        />
      )}
      <div>
        <label style={{ display: "block", margin: "1rem 0" }}>
          Upload Photo: <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        </label>
      </div>

      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>

      <div style={{ marginTop: "1rem" }}>
        <h3 style={{ color: "#023e8a" }}>Attendance</h3>
        {student.attendance.length > 0 ? (
          <ul>
            {student.attendance.map((date, i) => (
              <li key={i}>{date}</li>
            ))}
          </ul>
        ) : (
          <p>No attendance records.</p>
        )}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3 style={{ color: "#023e8a" }}>Grades</h3>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleGradeSubmit}>Add Grade</button>

        {student.grades && Object.keys(student.grades).length > 0 ? (
          <ul style={{ marginTop: "1rem" }}>
            {Object.entries(student.grades).map(([subj, grd]) => (
              <li key={subj}>
                <strong>{subj}:</strong> {grd}
              </li>
            ))}
          </ul>
        ) : (
          <p>No grades added.</p>
        )}
      </div>
    </div>
  );
}
