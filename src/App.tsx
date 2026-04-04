import { ContactsEditor } from './components/ContactsEditor'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Contact Book</h1>
        <p>Manage your contacts efficiently</p>
      </header>

      <main className="app-content">
        <ContactsEditor />
      </main>

      <footer className="app-footer">
        <p>© 2026 Contact Book App. Built with React, TypeScript and Vite.</p>
      </footer>
    </div>
  )
}

export default App
