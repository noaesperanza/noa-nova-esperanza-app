import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toast';
import { FloatingAIAssistant } from './components/FloatingAIAssistant';
import Home from './pages/Home';
import LabPEC from './pages/LabPEC';
import MedCannLab from './pages/MedCannLab';
import AdminDashboard from './pages/AdminDashboard';
import AreaPaciente from './pages/AreaPaciente';
import AreaProfissional from './pages/AreaProfissional';
import AreaAluno from './pages/AreaAluno';
import Login from './pages/Login';
import AvatarDemo from './pages/AvatarDemo';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/labpec" element={<LabPEC />} />
        <Route path="/avatar-demo" element={<AvatarDemo />} />
        <Route path="/medcann-lab/*" element={<MedCannLab />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/paciente/*" element={<AreaPaciente />} />
        <Route path="/profissional/*" element={<AreaProfissional />} />
        <Route path="/aluno/*" element={<AreaAluno />} />
      </Routes>
      <FloatingAIAssistant />
      <Toaster />
    </Router>
  );
}

export default App;
