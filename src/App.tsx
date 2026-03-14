import { useState } from 'react'
import './index.css'
import { Landing } from './pages/Landing'
import { Dashboard } from './pages/Dashboard'
import { StudentDetail } from './pages/StudentDetail'

type View =
  | { name: 'landing' }
  | { name: 'dashboard' }
  | { name: 'student'; id: string }

export default function App() {
  const [view, setView] = useState<View>({ name: 'landing' })

  if (view.name === 'landing') {
    return <Landing onEnter={() => setView({ name: 'dashboard' })} />
  }

  if (view.name === 'student') {
    return (
      <StudentDetail
        studentId={view.id}
        onBack={() => setView({ name: 'dashboard' })}
      />
    )
  }

  return (
    <Dashboard
      onStudentSelect={(id) => setView({ name: 'student', id })}
    />
  )
}
