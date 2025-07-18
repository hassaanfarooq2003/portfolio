import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import About from './components/About'
import Contact from './components/Contact'
function App() {
  return (
    <>
    <div className="bg-black text-white min-h-screen">
      <Header />
        <Sidebar />
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-16">
        <MainContent />
        <About />
        <Contact />
      </main>
    </div>
    </>
  )
}

export default App

