import { useState } from 'react'
import './index.css'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { StudentDetail } from './pages/StudentDetail'
import { Classroom } from './pages/Classroom'

type View =
  | { name: 'landing' }
  | { name: 'login'; role: 'teacher' | 'student' }
  | { name: 'dashboard' }
  | { name: 'student'; id: string }
  | { name: 'classroom' }

export default function App() {
  const [view, setView] = useState<View>({ name: 'landing' })

  if (view.name === 'landing') {
    return (
      <Landing
        onEnter={() => setView({ name: 'login', role: 'teacher' })}
        onEnterClassroom={() => setView({ name: 'login', role: 'student' })}
      />
    )
  }

  if (view.name === 'login') {
    return (
      <Login
        role={view.role}
        onSuccess={() => setView(view.role === 'teacher' ? { name: 'dashboard' } : { name: 'classroom' })}
        onBack={() => setView({ name: 'landing' })}
      />
    )
  }

  if (view.name === 'classroom') {
    return <Classroom onExit={() => setView({ name: 'landing' })} />
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
