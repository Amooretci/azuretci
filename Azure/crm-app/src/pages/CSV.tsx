import React, { useState, type ChangeEvent } from "react";

interface Student {
  id: number;
  name: string;
  email: string;
  attendance: string[];
}

interface Props {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export default function UploadCSV({ students, setStudents }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setError(null);
    setSuccessMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.trim().split("\n");

      let updatedStudents = [...students];

      try {
        lines.forEach((line) => {
          const [email, date] = line.split(",");
          if (!email || !date) throw new Error("Invalid CSV format");

          // Find student by email
          const idx = updatedStudents.findIndex((s) => s.email === email.trim());
          if (idx !== -1) {
            const student = updatedStudents[idx];
            // Add attendance if not already recorded
            if (!student.attendance.includes(date.trim())) {
              student.attendance.push(date.trim());
              updatedStudents[idx] = student;
            }
          }
        });

        setStudents(updatedStudents);
        setSuccessMsg("CSV processed successfully!");
      } catch (err) {
        setError("Error processing CSV: ensure it has 'email,date' per line.");
      }
    };

    reader.readAsText(file);
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ color: "#f4a261" }}>Upload Attendance CSV</h2>
      <p>CSV format: <code>studentEmail,date</code> per line</p>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
    </div>
  );
}
