import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
function App() {
  return (
    <>
    <div className="bg-black text-white min-h-screen">
      <Header />
        <Sidebar />
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-16">
        <div id="about"><MainContent /></div>
        <div id="projects"><About /></div>
        <div id="experience"><Experience /></div>
        <div id="contact"><Contact /></div>
      </main>
    </div>
    </>
  )
}

export default App

