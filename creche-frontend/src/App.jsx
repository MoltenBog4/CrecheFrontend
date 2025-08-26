// src/App.jsx
import RegistrationForm from './components/RegistrationForm'

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, Arial, sans-serif' }}>
      <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <h1>Little Stars Crèche</h1>
      </header>
      <RegistrationForm />
    </div>
  )
}
