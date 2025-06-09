
interface Student {
  id: number;
  name: string;
  email: string;
  attendance: string[];
}

interface Props {
  student: Student | null;
}

export default function StudentProfile({ student }: Props) {
  if (!student) {
    return <p style={{ color: "#0077b6" }}>No student selected.</p>;
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ color: "#f4a261" }}>Student Profile</h2>
      <p>
        <strong>Name:</strong> {student.name}
      </p>
      <p>
        <strong>Email:</strong> {student.email}
      </p>

      <h3 style={{ color: "#0077b6" }}>Attendance</h3>
      {student.attendance.length === 0 ? (
        <p>No attendance records.</p>
      ) : (
        <ul>
          {student.attendance.map((date, i) => (
            <li key={i}>{date}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
