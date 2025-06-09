
interface Student {
  id: number;
  name: string;
  email: string;
}

interface Props {
  students: Student[];
  onSelectStudent: (id: number) => void;
}

export default function Home({ students, onSelectStudent }: Props) {
  return (
    <div>
      <h2 style={{ color: "#f4a261" }}>Student List</h2>
      {students.length === 0 ? (
        <p>No students registered.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {students.map((student) => (
            <li
              key={student.id}
              onClick={() => onSelectStudent(student.id)}
              style={{
                cursor: "pointer",
                backgroundColor: "#0077b6",
                color: "white",
                marginBottom: 6,
                padding: 10,
                borderRadius: 4,
              }}
            >
              {student.name} - {student.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
