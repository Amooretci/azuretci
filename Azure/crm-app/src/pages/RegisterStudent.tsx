import React, { useState, type FormEvent } from "react";

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

export default function RegisterStudent({ students, setStudents }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill in all fields.");
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      name,
      email,
      attendance: [],
    };

    setStudents([...students, newStudent]);
    setName("");
    setEmail("");
    alert("Student Registered!");
  };

  return (
    <form onSubmit={handleRegister} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2 style={{ color: "#f4a261" }}>Register New Student</h2>
      <div style={{ marginBottom: 10 }}>
        <label>Name:</label>
        <input
          style={{ width: "100%", padding: 8, marginTop: 4 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Email:</label>
        <input
          type="email"
          style={{ width: "100%", padding: 8, marginTop: 4 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          required
        />
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "#f4a261", // orange
          border: "none",
          padding: "10px 20px",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          borderRadius: 4,
        }}
      >
        Register
      </button>
    </form>
  );
}
