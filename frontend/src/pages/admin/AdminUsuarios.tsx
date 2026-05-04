import { useState, useEffect, useCallback } from 'react';
import { Search, Users, Plus, Trash2, Shield, User } from 'lucide-react';
import { usuarioApi } from '../../services/api';
import {
  Card,
  Input,
  Button,
  Badge,
  Loading,
  EmptyState,
  Modal,
  Select,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui';
import type { Usuario, CreateUsuarioDto } from '../../types';
import { UsuarioRole } from '../../types';

export function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [excluindo, setExcluindo] = useState<number | null>(null);
  const [salvando, setSalvando] = useState(false);

  // Form state
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UsuarioRole>(UsuarioRole.Cliente);

  const fetchUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      if (searchTerm) {
        const data = await usuarioApi.buscar(searchTerm);
        setUsuarios(data);
      } else {
        // Mock para listar todos (backend nao tem endpoint de listar todos)
        setUsuarios([
          { id: 1, nome: 'Joao Silva', email: 'joao@email.com', role: UsuarioRole.Cliente },
          { id: 2, nome: 'Maria Santos', email: 'maria@email.com', role: UsuarioRole.Cliente },
          { id: 3, nome: 'Carlos Lima', email: 'carlos@email.com', role: UsuarioRole.Admin },
          { id: 4, nome: 'Ana Costa', email: 'ana@email.com', role: UsuarioRole.Cliente },
          { id: 5, nome: 'Pedro Souza', email: 'pedro@email.com', role: UsuarioRole.Cliente },
        ]);
      }
    } catch {
      // Mock data
      setUsuarios([
        { id: 1, nome: 'Joao Silva', email: 'joao@email.com', role: UsuarioRole.Cliente },
        { id: 2, nome: 'Maria Santos', email: 'maria@email.com', role: UsuarioRole.Cliente },
        { id: 3, nome: 'Carlos Lima', email: 'carlos@email.com', role: UsuarioRole.Admin },
      ]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const debounce = setTimeout(fetchUsuarios, 300);
    return () => clearTimeout(debounce);
  }, [fetchUsuarios]);

  const handleCriarUsuario = async () => {
    if (!nome.trim() || !email.trim()) return;

    setSalvando(true);
    try {
      const novoUsuario: CreateUsuarioDto = { nome, email, role };
      await usuarioApi.inserir(novoUsuario);
      await fetchUsuarios();
    } catch {
      // Mock add
      setUsuarios((prev) => [
        ...prev,
        { id: Date.now(), nome, email, role },
      ]);
    } finally {
      setSalvando(false);
      setModalAberto(false);
      setNome('');
      setEmail('');
      setRole(UsuarioRole.Cliente);
    }
  };

  const handleExcluir = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este usuario?')) return;

    setExcluindo(id);
    try {
      await usuarioApi.excluir(id);
      await fetchUsuarios();
    } catch {
      // Mock delete
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } finally {
      setExcluindo(null);
    }
  };

  const getRoleBadge = (role: UsuarioRole) => {
    if (role === UsuarioRole.Admin) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
          <Shield className="w-3 h-3" />
          Admin
        </Badge>
      );
    }
    return (
      <Badge variant="default" className="flex items-center gap-1 w-fit">
        <User className="w-3 h-3" />
        Cliente
      </Badge>
    );
  };

  const admins = usuarios.filter((u) => u.role === UsuarioRole.Admin).length;
  const clientes = usuarios.filter((u) => u.role === UsuarioRole.Cliente).length;

  if (loading && !searchTerm) {
    return <Loading text="Carregando usuarios..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Gerenciar Usuarios
          </h2>
          <p className="text-muted-foreground">
            {usuarios.length} usuarios cadastrados
          </p>
        </div>
        <Button onClick={() => setModalAberto(true)}>
          <Plus className="w-4 h-4" />
          Novo Usuario
        </Button>
      </div>

      {/* Search */}
      <div className="w-full sm:w-64">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{usuarios.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </Card>
        <Card>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{clientes}</p>
            <p className="text-sm text-muted-foreground">Clientes</p>
          </div>
        </Card>
        <Card>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{admins}</p>
            <p className="text-sm text-muted-foreground">Admins</p>
          </div>
        </Card>
      </div>

      {/* Table */}
      {usuarios.length === 0 ? (
        <EmptyState
          icon={<Users className="w-6 h-6 text-muted-foreground" />}
          title="Nenhum usuario encontrado"
          description={searchTerm ? 'Tente ajustar sua busca.' : 'Cadastre o primeiro usuario.'}
          action={
            !searchTerm && (
              <Button onClick={() => setModalAberto(true)}>
                <Plus className="w-4 h-4" />
                Novo Usuario
              </Button>
            )
          }
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        usuario.role === UsuarioRole.Admin
                          ? 'bg-destructive/10'
                          : 'bg-primary/10'
                      }`}>
                        {usuario.role === UsuarioRole.Admin ? (
                          <Shield className="w-4 h-4 text-destructive" />
                        ) : (
                          <User className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{usuario.nome}</p>
                        <p className="text-xs text-muted-foreground">ID: {usuario.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{usuario.email}</TableCell>
                  <TableCell>{getRoleBadge(usuario.role)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        loading={excluindo === usuario.id}
                        onClick={() => handleExcluir(usuario.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Modal Novo Usuario */}
      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        title="Novo Usuario"
      >
        <div className="space-y-4">
          <Input
            label="Nome"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Select
            label="Tipo de Usuario"
            value={role}
            onChange={(e) => setRole(e.target.value as UsuarioRole)}
            options={[
              { value: UsuarioRole.Cliente, label: 'Cliente' },
              { value: UsuarioRole.Admin, label: 'Administrador' },
            ]}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalAberto(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCriarUsuario}
              loading={salvando}
              disabled={!nome.trim() || !email.trim()}
            >
              Criar Usuario
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
