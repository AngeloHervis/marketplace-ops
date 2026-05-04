import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { ClienteLayout } from '../layouts/ClienteLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Paginas Publicas
import { HomePage } from '../pages/public/HomePage';
import { ProdutosPage } from '../pages/public/ProdutosPage';

// Paginas Cliente
import { ClienteDashboard } from '../pages/cliente/ClienteDashboard';
import { ClientePedidos } from '../pages/cliente/ClientePedidos';
import { ClienteAvaliacoes } from '../pages/cliente/ClienteAvaliacoes';

// Paginas Admin
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminProdutos } from '../pages/admin/AdminProdutos';
import { AdminPedidos } from '../pages/admin/AdminPedidos';
import { AdminUsuarios } from '../pages/admin/AdminUsuarios';
import { AdminSuporte } from '../pages/admin/AdminSuporte';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === Area Publica === */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
        </Route>

        {/* === Area do Cliente === */}
        <Route path="/cliente" element={<ClienteLayout />}>
          <Route path="dashboard" element={<ClienteDashboard />} />
          <Route path="pedidos" element={<ClientePedidos />} />
          <Route path="avaliacoes" element={<ClienteAvaliacoes />} />
        </Route>

        {/* === Area do Admin === */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="produtos" element={<AdminProdutos />} />
          <Route path="pedidos" element={<AdminPedidos />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="suporte" element={<AdminSuporte />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
