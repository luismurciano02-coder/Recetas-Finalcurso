import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecetaList from './components/RecetaList';
import RecetaDetail from './components/RecetaDetail';
import RecetaForm from './components/RecetaForm';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecetaList />} />
        <Route path="/receta/:id" element={<RecetaDetail />} />
        <Route path="/nueva" element={<RecetaForm />} />
        <Route path="/editar/:id" element={<RecetaForm />} />
      </Routes>
    </>
  );
}

export default App;
