import { useState, useEffect, useCallback } from 'react';
import { Search, Package, Edit, DollarSign } from 'lucide-react';
import { produtoApi } from '../../services/api';
import {
  Card,
  Input,
  Button,
  Badge,
  Loading,
  EmptyState,
  Modal,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui';
import type { Produto } from '../../types';

export function AdminProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalPreco, setModalPreco] = useState<Produto | null>(null);
  const [novoPreco, setNovoPreco] = useState('');
  const [atualizando, setAtualizando] = useState(false);

  const fetchProdutos = useCallback(async () => {
    try {
      setLoading(true);
      const data = searchTerm
        ? await produtoApi.buscar(searchTerm)
        : await produtoApi.obterComEstoque();
      setProdutos(data);
    } catch {
      // Mock data
      setProdutos([
        { id: 1, nome: 'Notebook Pro', preco: 4999.99, estoque: 15 },
        { id: 2, nome: 'Mouse Gamer RGB', preco: 199.99, estoque: 50 },
        { id: 3, nome: 'Teclado Mecanico', preco: 349.99, estoque: 30 },
        { id: 4, nome: 'Monitor 27" 4K', preco: 2499.99, estoque: 8 },
        { id: 5, nome: 'Headset Wireless', preco: 599.99, estoque: 25 },
        { id: 6, nome: 'Webcam Full HD', preco: 299.99, estoque: 40 },
        { id: 7, nome: 'SSD 1TB NVMe', preco: 449.99, estoque: 60 },
        { id: 8, nome: 'Memoria RAM 16GB', preco: 299.99, estoque: 35 },
      ]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const debounce = setTimeout(fetchProdutos, 300);
    return () => clearTimeout(debounce);
  }, [fetchProdutos]);

  const handleAtualizarPreco = async () => {
    if (!modalPreco || !novoPreco) return;

    const preco = parseFloat(novoPreco.replace(',', '.'));
    if (isNaN(preco) || preco <= 0) {
      alert('Insira um preco valido');
      return;
    }

    setAtualizando(true);
    try {
      await produtoApi.atualizarPreco(modalPreco.id, preco);
      await fetchProdutos();
    } catch {
      // Mock update
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === modalPreco.id ? { ...p, preco } : p
        )
      );
    } finally {
      setAtualizando(false);
      setModalPreco(null);
      setNovoPreco('');
    }
  };

  const getEstoqueBadge = (estoque: number) => {
    if (estoque === 0) return <Badge variant="destructive">Esgotado</Badge>;
    if (estoque < 10) return <Badge variant="warning">Baixo ({estoque})</Badge>;
    return <Badge variant="success">{estoque} unidades</Badge>;
  };

  if (loading) {
    return <Loading text="Carregando produtos..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Gerenciar Produtos
          </h2>
          <p className="text-muted-foreground">
            {produtos.length} produtos cadastrados
          </p>
        </div>
        <div className="w-full sm:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{produtos.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </Card>
        <Card>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {produtos.filter((p) => p.estoque > 10).length}
            </p>
            <p className="text-sm text-muted-foreground">Em Estoque</p>
          </div>
        </Card>
        <Card>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">
              {produtos.filter((p) => p.estoque > 0 && p.estoque <= 10).length}
            </p>
            <p className="text-sm text-muted-foreground">Estoque Baixo</p>
          </div>
        </Card>
      </div>

      {/* Table */}
      {produtos.length === 0 ? (
        <EmptyState
          icon={<Package className="w-6 h-6 text-muted-foreground" />}
          title="Nenhum produto encontrado"
          description="Tente ajustar sua busca."
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Preco</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead className="text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                        <Package className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{produto.nome}</p>
                        <p className="text-xs text-muted-foreground">ID: {produto.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-foreground">
                      R$ {produto.preco.toFixed(2).replace('.', ',')}
                    </span>
                  </TableCell>
                  <TableCell>{getEstoqueBadge(produto.estoque)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setModalPreco(produto);
                          setNovoPreco(produto.preco.toString().replace('.', ','));
                        }}
                      >
                        <Edit className="w-4 h-4" />
                        Editar Preco
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Modal Editar Preco */}
      <Modal
        isOpen={!!modalPreco}
        onClose={() => setModalPreco(null)}
        title={`Editar Preco - ${modalPreco?.nome || ''}`}
      >
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Preco atual</p>
            <p className="text-xl font-bold text-foreground">
              R$ {modalPreco?.preco.toFixed(2).replace('.', ',')}
            </p>
          </div>

          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              label="Novo Preco"
              type="text"
              placeholder="0,00"
              value={novoPreco}
              onChange={(e) => setNovoPreco(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalPreco(null)}>
              Cancelar
            </Button>
            <Button onClick={handleAtualizarPreco} loading={atualizando}>
              Salvar Alteracoes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
