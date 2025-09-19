import { useState } from 'react';
import { registerParent, type ParentRegistrationRequest } from '../api/client';

export default function ParentRegisterPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', cellNumber: '', idNumber: '', address: '',
    childFirstName: '', childLastName: '', childDob: '', gender: '', classGroup: '', allergies: '', medicalNotes: '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setMsg(null); setErr(null);
    const payload: ParentRegistrationRequest = {
      firstName: form.firstName,
      lastName: form.lastName,
      idNumber: form.idNumber || undefined,
      cellNumber: form.cellNumber || undefined,
      email: form.email,
      address: form.address || undefined,
      children: [{
        firstName: form.childFirstName,
        lastName: form.childLastName,
        dateOfBirth: form.childDob || undefined,
        gender: form.gender || undefined,
        classGroup: form.classGroup || undefined,
        allergies: form.allergies || undefined,
        medicalNotes: form.medicalNotes || undefined,
      }],
    };
    try {
      const res = await registerParent(payload);
      setMsg(`Registered parent #${res.id} with ${res.children?.length ?? 0} child(ren).`);
      setForm({
        firstName: '', lastName: '', email: '', cellNumber: '', idNumber: '', address: '',
        childFirstName: '', childLastName: '', childDob: '', gender: '', classGroup: '', allergies: '', medicalNotes: '',
      });
    } catch (e: any) {
      setErr(e.message || 'Failed to register');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <h2>Register Parent + Child</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}>
        <input name="firstName" placeholder="Parent First Name *" value={form.firstName} onChange={onChange} required />
        <input name="lastName"  placeholder="Parent Last Name *"  value={form.lastName}  onChange={onChange} required />
        <input name="email"     placeholder="Email *"              value={form.email}     onChange={onChange} required />
        <input name="cellNumber"placeholder="Cell Number"          value={form.cellNumber}onChange={onChange} />
        <input name="idNumber"  placeholder="ID Number"            value={form.idNumber}  onChange={onChange} />
        <input name="address"   placeholder="Address"              value={form.address}   onChange={onChange} />

        <div style={{ gridColumn: '1 / -1', marginTop: 12, fontWeight: 600 }}>First Child</div>
        <input name="childFirstName" placeholder="Child First Name *" value={form.childFirstName} onChange={onChange} required />
        <input name="childLastName"  placeholder="Child Last Name *"  value={form.childLastName}  onChange={onChange} required />
     <input
       name="childDob"
       type="date"                               // ← calendar picker
       value={form.childDob}
       onChange={onChange}
     />

     <select
       name="gender"                             // ← dropdown
       value={form.gender}
       onChange={onChange}
     >
       <option value="">Select gender…</option>
       <option value="Male">Male</option>
       <option value="Female">Female</option>
     </select>
        <input name="classGroup"     placeholder="Class Group"     value={form.classGroup} onChange={onChange} />
        <input name="allergies"      placeholder="Allergies"       value={form.allergies}  onChange={onChange} />
        <input name="medicalNotes"   placeholder="Medical Notes"   value={form.medicalNotes} onChange={onChange} />

        <div style={{ gridColumn: '1 / -1', marginTop: 12 }}>
          <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Register'}</button>
        </div>
      </form>

      {msg && <div style={{ color: 'green', marginTop: 10 }}>{msg}</div>}
      {err && <pre style={{ color: 'crimson', marginTop: 10 }}>{err}</pre>}
    </div>
  );
}
