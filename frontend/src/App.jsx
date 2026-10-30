import { useEffect, useState } from 'react';
const API = 'http://localhost:8080/api/students';
const empty = { name: '', email: '', course: 'Computer Science', semester: 1 };

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function loadStudents() {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error('Could not load students. Is the backend running?');
      setStudents(await response.json());
    } catch (error) { setMessage(error.message); }
  }
  useEffect(() => { loadStudents(); }, []);

  function change(event) {
    const { name, value } = event.target;
    setForm(old => ({ ...old, [name]: name === 'semester' ? Number(value) : value }));
  }
  async function submit(event) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const response = await fetch(editingId ? `${API}/${editingId}` : API, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = response.status === 204 ? null : await response.json();
      if (!response.ok) throw new Error(data?.error || 'Request failed');
      setMessage(editingId ? 'Student updated successfully.' : 'Student added successfully.');
      setForm(empty); setEditingId(null); await loadStudents();
    } catch (error) { setMessage(error.message); }
    finally { setBusy(false); }
  }
  function edit(student) {
    setEditingId(student.id);
    setForm({ name: student.name, email: student.email, course: student.course, semester: student.semester });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  async function remove(id) {
    if (!window.confirm('Delete this student permanently?')) return;
    try {
      const response = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (!response.ok) { const data = await response.json(); throw new Error(data.error || 'Delete failed'); }
      setMessage('Student deleted successfully.'); await loadStudents();
    } catch (error) { setMessage(error.message); }
  }
  function cancelEdit() { setEditingId(null); setForm(empty); }

  return <main className="shell">
    <header><div className="eyebrow">FULL STACK DEVELOPMENT · PROJECT 3</div><h1>Student Database Manager</h1><p>Manage student records with React, Spring Boot and PostgreSQL.</p></header>
    <section className="panel">
      <h2>{editingId ? 'Update student' : 'Add a student'}</h2>
      <form onSubmit={submit}>
        <label>Full name<input name="name" value={form.name} onChange={change} placeholder="Enter full name" required maxLength="80" /></label>
        <label>Email address<input name="email" type="email" value={form.email} onChange={change} placeholder="student@example.com" required maxLength="120" /></label>
        <label>Course<input name="course" value={form.course} onChange={change} placeholder="e.g. Computer Science" required maxLength="80" /></label>
        <label>Semester<select name="semester" value={form.semester} onChange={change}>{[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}</select></label>
        <div className="actions"><button disabled={busy}>{busy ? 'Saving…' : editingId ? 'Save changes' : 'Add student'}</button>{editingId && <button type="button" className="secondary" onClick={cancelEdit}>Cancel</button>}</div>
      </form>
      {message && <p className="message" role="status">{message}</p>}
    </section>
    <section className="panel">
      <div className="list-heading"><h2>Student records</h2><span>{students.length} total</span></div>
      {students.length === 0 ? <p className="empty">No student records yet. Add the first student above.</p> : <div className="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Course</th><th>Sem</th><th>Actions</th></tr></thead><tbody>
        {students.map(s => <tr key={s.id}><td>{s.id}</td><td>{s.name}</td><td>{s.email}</td><td>{s.course}</td><td>{s.semester}</td><td className="row-actions"><button className="small secondary" onClick={() => edit(s)}>Edit</button><button className="small danger" onClick={() => remove(s.id)}>Delete</button></td></tr>)}
      </tbody></table></div>}
    </section>
    <footer>Project 3 · Database Integration · CRUD operations</footer>
  </main>;
}
