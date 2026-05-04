import { useState, useEffect, useCallback } from 'react';
import { Search, Package, ShoppingCart, Star } from 'lucide-react';
import { produtoApi, avaliacaoApi, pedidoApi } from '../../services/api';
import {
  Input,
  Button,
  Card,
  CardContent,
  Badge,
  Loading,
  EmptyState,
  Modal,
  StarRating,
} from '../../components/ui';
import type { Produto, AvaliacaoDetalheDto, CreatePedidoDto } from '../../types';
import { PedidoStatus } from '../../types';

export function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoDetalheDto[]>([]);
  const [loadingAvaliacoes, setLoadingAvaliacoes] = useState(false);
  const [comprando, setComprando] = useState(false);

  const fetchProdutos = useCallback(async () => {
    try {
      setLoading(true);
      const data = searchTerm
        ? await produtoApi.buscar(searchTerm)
        : await produtoApi.obterComEstoque();
      setProdutos(data);
    } catch {
      // Para demo, usar dados mockados
      setProdutos([
        { id: 1, nome: 'Notebook Pro', preco: 4999.99, estoque: 15 },
        { id: 2, nome: 'Mouse Gamer RGB', preco: 199.99, estoque: 50 },
        { id: 3, nome: 'Teclado Mecanico', preco: 349.99, estoque: 30 },
        { id: 4, nome: 'Monitor 27" 4K', preco: 2499.99, estoque: 8 },
        { id: 5, nome: 'Headset Wireless', preco: 599.99, estoque: 25 },
        { id: 6, nome: 'Webcam Full HD', preco: 299.99, estoque: 40 },
      ]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const debounce = setTimeout(fetchProdutos, 300);
    return () => clearTimeout(debounce);
  }, [fetchProdutos]);

  const handleOpenDetails = async (produto: Produto) => {
    setSelectedProduto(produto);
    setLoadingAvaliacoes(true);
    try {
      const data = await avaliacaoApi.obterDetalhes(produto.id);
      setAvaliacoes(data);
    } catch {
      // Mock data
      setAvaliacoes([
        { avaliacaoId: 1, nomeUsuario: 'Joao Silva', nota: 5, comentario: 'Excelente produto!' },
        { avaliacaoId: 2, nomeUsuario: 'Maria Santos', nota: 4, comentario: 'Muito bom, recomendo.' },
      ]);
    } finally {
      setLoadingAvaliacoes(false);
    }
  };

  const handleComprar = async (produto: Produto) => {
    setComprando(true);
    try {
      const pedido: CreatePedidoDto = {
        usuarioId: 1, // Demo user
        dataPedido: new Date().toISOString(),
        status: PedidoStatus.Pendente,
      };
      await pedidoApi.comprar(pedido, produto.id);
      alert('Pedido realizado com sucesso!');
      fetchProdutos();
    } catch {
      alert('Pedido simulado com sucesso! (Backend nao conectado)');
    } finally {
      setComprando(false);
    }
  };

  const calcularMediaAvaliacoes = () => {
    if (avaliacoes.length === 0) return 0;
    const soma = avaliacoes.reduce((acc, av) => acc + av.nota, 0);
    return Math.round((soma / avaliacoes.length) * 10) / 10;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground">
            Explore nosso catalogo de produtos
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

      {/* Products Grid */}
      {loading ? (
        <Loading text="Carregando produtos..." />
      ) : produtos.length === 0 ? (
        <EmptyState
          icon={<Package className="w-6 h-6 text-muted-foreground" />}
          title="Nenhum produto encontrado"
          description="Tente ajustar sua busca ou volte mais tarde."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <Card key={produto.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant={produto.estoque > 10 ? 'success' : produto.estoque > 0 ? 'warning' : 'destructive'}>
                    {produto.estoque > 0 ? `${produto.estoque} em estoque` : 'Esgotado'}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {produto.nome}
                </h3>
                <p className="text-2xl font-bold text-primary mb-4">
                  R$ {produto.preco.toFixed(2).replace('.', ',')}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleOpenDetails(produto)}
                  >
                    <Star className="w-4 h-4" />
                    Avaliacoes
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={produto.estoque === 0 || comprando}
                    onClick={() => handleComprar(produto)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Comprar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Avaliacoes */}
      <Modal
        isOpen={!!selectedProduto}
        onClose={() => setSelectedProduto(null)}
        title={`Avaliacoes - ${selectedProduto?.nome || ''}`}
        size="lg"
      >
        {loadingAvaliacoes ? (
          <Loading text="Carregando avaliacoes..." />
        ) : avaliacoes.length === 0 ? (
          <EmptyState
            icon={<Star className="w-6 h-6 text-muted-foreground" />}
            title="Nenhuma avaliacao"
            description="Este produto ainda nao possui avaliacoes."
          />
        ) : (
          <div className="space-y-4">
            {/* Summary */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">
                  {calcularMediaAvaliacoes()}
                </p>
                <StarRating rating={Math.round(calcularMediaAvaliacoes())} readonly size="sm" />
                <p className="text-xs text-muted-foreground mt-1">
                  {avaliacoes.length} {avaliacoes.length === 1 ? 'avaliacao' : 'avaliacoes'}
                </p>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {avaliacoes.map((avaliacao) => (
                <div
                  key={avaliacao.avaliacaoId}
                  className="p-4 bg-card border border-border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">
                      {avaliacao.nomeUsuario}
                    </span>
                    <StarRating rating={avaliacao.nota} readonly size="sm" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {avaliacao.comentario}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
