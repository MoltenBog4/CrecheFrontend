import { useEffect, useState } from 'react';
import { listParents, addChild, type ParentSummary, type ChildRegistrationRequest } from '../api/client';

export default function ChildRegisterPage() {
  const [parents, setParents] = useState<ParentSummary[]>([]);
  const [parentId, setParentId] = useState<number | ''>('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', dateOfBirth: '', gender: '', classGroup: '', allergies: '', medicalNotes: '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    listParents().then(setParents).catch(e => setErr(e.message));
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === 'parentId') setParentId(value ? Number(value) : '');
    else setForm(f => ({ ...f, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (parentId === '') { setErr('Please select a parent'); return; }
    setSaving(true); setMsg(null); setErr(null);

    const payload: ChildRegistrationRequest = {
      firstName: form.firstName,
      lastName: form.lastName,
      dateOfBirth: form.dateOfBirth || undefined,
      gender: form.gender || undefined,
      classGroup: form.classGroup || undefined,
      allergies: form.allergies || undefined,
      medicalNotes: form.medicalNotes || undefined,
    };

    try {
      const res = await addChild(Number(parentId), payload);
      setMsg(`Added child #${res.id} to parent ${parentId}`);
      setForm({ firstName: '', lastName: '', dateOfBirth: '', gender: '', classGroup: '', allergies: '', medicalNotes: '' });
      setParentId('');
    } catch (e: any) {
      setErr(e.message || 'Failed to add child');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <h2>Add Child to Existing Parent</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}>
        <select name="parentId" value={parentId} onChange={onChange} required style={{ gridColumn: '1 / -1' }}>
          <option value="">Select parent…</option>
          {parents.map(p => (
            <option key={p.id} value={p.id}>
              #{p.id} — {p.firstName} {p.lastName} ({p.email})
            </option>
          ))}
        </select>

        <input name="firstName"   placeholder="Child First Name *" value={form.firstName}   onChange={onChange} required />
        <input name="lastName"    placeholder="Child Last Name *"  value={form.lastName}    onChange={onChange} required />
        <input name="dateOfBirth" placeholder="Date of Birth (YYYY-MM-DD)" value={form.dateOfBirth} onChange={onChange} />
        <input name="gender"      placeholder="Gender"       value={form.gender}      onChange={onChange} />
        <input name="classGroup"  placeholder="Class Group"  value={form.classGroup}  onChange={onChange} />
        <input name="allergies"   placeholder="Allergies"    value={form.allergies}   onChange={onChange} />
        <input name="medicalNotes"placeholder="Medical Notes"value={form.medicalNotes}onChange={onChange} />

        <div style={{ gridColumn: '1 / -1', marginTop: 12 }}>
          <button type="submit" disabled={saving || parentId === ''}>{saving ? 'Saving…' : 'Add Child'}</button>
        </div>
      </form>

      {msg && <div style={{ color: 'green', marginTop: 10 }}>{msg}</div>}
      {err && <pre style={{ color: 'crimson', marginTop: 10 }}>{err}</pre>}
    </div>
  );
}
