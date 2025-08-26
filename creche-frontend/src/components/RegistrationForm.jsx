// src/components/RegistrationForm.jsx
import { useState } from 'react'
import { postJson } from '../lib/api'

export default function RegistrationForm() {
  const [parent, setParent] = useState({ fullName: '', email: '', phone: '' })
  const [children, setChildren] = useState([{ firstName: '', lastName: '', dateOfBirth: '', medicalNotes: '' }])
  const [status, setStatus] = useState(null) // { type: 'ok'|'err', msg: string }
  const [submitting, setSubmitting] = useState(false)

  const addChild = () => setChildren([...children, { firstName: '', lastName: '', dateOfBirth: '', medicalNotes: '' }])
  const removeChild = (i) => setChildren(children.filter((_, idx) => idx !== i))
  const updateChild = (i, field, value) => {
    const next = [...children]
    next[i][field] = value
    setChildren(next)
  }

  async function submit(e) {
    e.preventDefault()
    setStatus(null)
    setSubmitting(true)
    try {
      // basic client validation
      if (!parent.fullName || !parent.email || !parent.phone) throw new Error('Please fill all parent fields.')
      if (children.length === 0) throw new Error('Add at least one child.')
      for (const c of children) {
        if (!c.firstName || !c.lastName || !c.dateOfBirth) throw new Error('Please fill all child fields.')
      }

      const payload = {
        fullName: parent.fullName,
        email: parent.email,
        phone: parent.phone,
        children: children.map(c => ({
          firstName: c.firstName,
          lastName: c.lastName,
          dateOfBirth: c.dateOfBirth,      // "YYYY-MM-DD"
          medicalNotes: c.medicalNotes || null
        }))
      }

      await postJson('/registrations', payload)
      setStatus({ type: 'ok', msg: 'Registration submitted 🎉' })
      setParent({ fullName: '', email: '', phone: '' })
      setChildren([{ firstName: '', lastName: '', dateOfBirth: '', medicalNotes: '' }])
    } catch (err) {
      setStatus({ type: 'err', msg: err.message || 'Failed to submit' })
    } finally {
      setSubmitting(false)
    }
  }

  const field = { padding: '8px', border: '1px solid #ddd', borderRadius: 6 }

  return (
    <form onSubmit={submit} style={{ maxWidth: 720, margin: '24px auto', padding: 16 }}>
      <h2>Parent & Child Registration</h2>

      <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        <input style={field} required placeholder="Full name"
               value={parent.fullName} onChange={e => setParent({ ...parent, fullName: e.target.value })}/>
        <input style={field} required type="email" placeholder="Email"
               value={parent.email} onChange={e => setParent({ ...parent, email: e.target.value })}/>
        <input style={field} required placeholder="Phone"
               value={parent.phone} onChange={e => setParent({ ...parent, phone: e.target.value })}/>
      </div>

      <h3 style={{ marginTop: 18 }}>Child(ren)</h3>
      {children.map((c, i) => (
        <div key={i} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 12 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <input style={field} required placeholder="First name" value={c.firstName}
                   onChange={e => updateChild(i, 'firstName', e.target.value)}/>
            <input style={field} required placeholder="Last name" value={c.lastName}
                   onChange={e => updateChild(i, 'lastName', e.target.value)}/>
            <label>
              Date of birth:
              <input style={{ ...field, marginLeft: 8 }} required type="date" value={c.dateOfBirth}
                     onChange={e => updateChild(i, 'dateOfBirth', e.target.value)}/>
            </label>
            <textarea style={field} placeholder="Medical notes (optional)" value={c.medicalNotes}
                      onChange={e => updateChild(i, 'medicalNotes', e.target.value)}/>
          </div>
          {children.length > 1 && (
            <button type="button" onClick={() => removeChild(i)} style={{ marginTop: 8 }}>
              Remove child
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addChild}>+ Add another child</button>

      <div style={{ marginTop: 16 }}>
        <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
      </div>

      {status && (
        <p style={{ marginTop: 12, color: status.type === 'ok' ? 'green' : 'crimson' }}>
          {status.msg}
        </p>
      )}
    </form>
  )
}
