import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';

// Layouts Simples
function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="p-4 bg-white shadow flex justify-between">
        <h1 className="text-xl font-bold text-blue-600">MarketplaceOps</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Início</Link>
          <Link to="/cliente/dashboard" className="text-gray-600 hover:text-blue-600">Área do Cliente</Link>
          <Link to="/admin/dashboard" className="text-gray-600 hover:text-blue-600">Área Admin</Link>
        </div>
      </nav>
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}

function ClienteLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      <aside className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Painel Cliente</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/cliente/dashboard" className="hover:text-blue-300">Dashboard</Link>
          <Link to="/cliente/pedidos" className="hover:text-blue-300">Meus Pedidos</Link>
          <Link to="/" className="hover:text-blue-300 mt-8 text-sm">Voltar à Loja</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Administração</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/dashboard" className="hover:text-gray-400">Dashboard</Link>
          <Link to="/admin/produtos" className="hover:text-gray-400">Produtos</Link>
          <Link to="/admin/pedidos" className="hover:text-gray-400">Pedidos</Link>
          <Link to="/" className="hover:text-gray-400 mt-8 text-sm">Voltar à Loja</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

// Componentes Fictícios de Página
const Home = () => <div><h2 className="text-2xl font-bold">Bem-vindo ao MarketplaceOps!</h2><p>Página pública da loja.</p></div>;
const ClienteDashboard = () => <div><h2 className="text-2xl font-bold">Resumo da sua Conta</h2><p>Acompanhe suas compras e avaliações.</p></div>;
const ClientePedidos = () => <div><h2 className="text-2xl font-bold">Meus Pedidos</h2><p>Lista de pedidos do banco de dados (SQL).</p></div>;
const AdminDashboard = () => <div><h2 className="text-2xl font-bold">Painel de Controle</h2><p>Visão geral do sistema.</p></div>;
const AdminProdutos = () => <div><h2 className="text-2xl font-bold">Gerenciar Produtos</h2><p>Controle de estoque e catálogo.</p></div>;
const AdminPedidos = () => <div><h2 className="text-2xl font-bold">Gestão de Pedidos</h2><p>Controle de status (Pendente, Enviado, Cancelado).</p></div>;

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === Área Pública === */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* === Área do Cliente === */}
        <Route path="/cliente" element={<ClienteLayout />}>
          <Route path="dashboard" element={<ClienteDashboard />} />
          <Route path="pedidos" element={<ClientePedidos />} />
        </Route>

        {/* === Área do Admin === */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="produtos" element={<AdminProdutos />} />
          <Route path="pedidos" element={<AdminPedidos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
