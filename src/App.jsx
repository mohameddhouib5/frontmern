import { useState } from 'react'
import Listarticle from './components/articleRedux/Listarticle'
function App() {
const [count, setCount] = useState(0)

  return (
    <>
      <h1>Bienvenue dans mon site </h1>
        <Listarticle />
    </>
  )
}

export default App
