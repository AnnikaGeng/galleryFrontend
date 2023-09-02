import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Home, Detail} from './screens'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
