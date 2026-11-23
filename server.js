const express = require("express");
const app = express();

app.use(express.json());

// Initial student records
let students = [
  {
    id: 201,
    rollNumber: "CSE2401",
    name: "Aarav Sharma",
    branch: "CSE",
    semester: 3,
    email: "aarav@example.com"
  },
  {
    id: 202,
    rollNumber: "ECE2402",
    name: "Diya Verma",
    branch: "ECE",
    semester: 3,
    email: "diya@example.com"
  },
  {
    id: 203,
    rollNumber: "CSE2403",
    name: "Kabir Singh",
    branch: "CSE",
    semester: 3,
    email: "kabir@example.com"
  }
];

let nextId = 204;

// Check all required fields and their data types
function isValidStudent(data) {
  return (
    data &&
    typeof data.rollNumber === "string" &&
    data.rollNumber.trim() !== "" &&
    typeof data.name === "string" &&
    data.name.trim() !== "" &&
    typeof data.branch === "string" &&
    data.branch.trim() !== "" &&
    typeof data.semester === "number" &&
    Number.isInteger(data.semester) &&
    typeof data.email === "string" &&
    data.email.trim() !== ""
  );
}

// 1. GET all students
app.get("/api/students", (req, res) => {
  res.status(200).json(students);
});

// 2. POST a new student
app.post("/api/students", (req, res) => {
  const data = req.body;

  if (!isValidStudent(data)) {
    return res.status(400).json({
      message: "Invalid student data. All fields are required."
    });
  }

  // Keep roll numbers unique
  const duplicateRollNumber = students.some(
    student =>
      student.rollNumber.toLowerCase() === data.rollNumber.trim().toLowerCase()
  );

  if (duplicateRollNumber) {
    return res.status(400).json({
      message: "Roll number already exists."
    });
  }

  const newStudent = {
    id: nextId++,
    rollNumber: data.rollNumber.trim(),
    name: data.name.trim(),
    branch: data.branch.trim(),
    semester: data.semester,
    email: data.email.trim()
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 3. Filter students by branch
// Keep this route before /api/students/:id
app.get("/api/students/filter", (req, res) => {
  const branch = req.query.branch;

  if (typeof branch !== "string" || branch.trim() === "") {
    return res.status(400).json({
      message: "Please provide a branch query parameter."
    });
  }

  const result = students.filter(
    student => student.branch.toLowerCase() === branch.trim().toLowerCase()
  );

  res.status(200).json(result);
});

// 4. GET student by ID
app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(404).json({ message: "Student not found." });
  }

  const student = students.find(student => student.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found." });
  }

  res.status(200).json(student);
});

// 5. PUT / update a student
app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(student => student.id === id);

  if (!Number.isInteger(id) || index === -1) {
    return res.status(404).json({ message: "Student not found." });
  }

  // PUT expects all required student fields
  if (!isValidStudent(req.body)) {
    return res.status(400).json({
      message: "Invalid student data. Send all required fields."
    });
  }

  const duplicateRollNumber = students.some(
    (student, studentIndex) =>
      studentIndex !== index &&
      student.rollNumber.toLowerCase() === req.body.rollNumber.trim().toLowerCase()
  );

  if (duplicateRollNumber) {
    return res.status(400).json({
      message: "Roll number already exists."
    });
  }

  const updatedStudent = {
    id: students[index].id,
    rollNumber: req.body.rollNumber.trim(),
    name: req.body.name.trim(),
    branch: req.body.branch.trim(),
    semester: req.body.semester,
    email: req.body.email.trim()
  };

  students[index] = updatedStudent;
  res.status(200).json(updatedStudent);
});

// 6. DELETE a student
app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(student => student.id === id);

  if (!Number.isInteger(id) || index === -1) {
    return res.status(404).json({ message: "Student not found." });
  }

  students.splice(index, 1);

  res.status(200).json({
    message: "Student deleted successfully."
  });
});

// Handle invalid JSON bodies
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON body." });
  }
  next(err);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
