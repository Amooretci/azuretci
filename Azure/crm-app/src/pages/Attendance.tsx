
interface Student {
  id: number;
  name: string;
  attendance: string[];
}

interface Props {
  students: Student[];
}

export default function Attendance({ students }: Props) {
  return (
    <div>
      <h2 style={{ color: "#f4a261" }}>Attendance Overview</h2>
      {students.length === 0 ? (
        <p>No students registered.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 16,
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0077b6", color: "white" }}>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Student</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Attendance Dates</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>{student.name}</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>
                  {student.attendance.length > 0
                    ? student.attendance.join(", ")
                    : "No attendance"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
