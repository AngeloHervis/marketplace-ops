import { useState, useEffect } from 'react';
import { Star, Trash2, Plus, Package } from 'lucide-react';
import { avaliacaoApi, produtoApi } from '../../services/api';
import {
  Card,
  CardContent,
  Button,
  Loading,
  EmptyState,
  Modal,
  Input,
  Select,
  StarRating,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui';
import type { AvaliacaoDetalheDto, Produto, CreateAvaliacaoDto } from '../../types';

const USUARIO_DEMO_ID = 1;

interface AvaliacaoExtended extends AvaliacaoDetalheDto {
  produtoNome?: string;
}

export function ClienteAvaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoExtended[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [excluindo, setExcluindo] = useState<number | null>(null);
  const [salvando, setSalvando] = useState(false);
  
  // Form state
  const [produtoId, setProdutoId] = useState('');
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');

  const fetchData = async () => {
    try {
      const produtosData = await produtoApi.obterComEstoque();
      setProdutos(produtosData);
      
      // Para demo, carregamos avaliacoes mockadas
      setAvaliacoes([
        { avaliacaoId: 1, nomeUsuario: 'Voce', nota: 5, comentario: 'Produto excelente!', produtoNome: 'Notebook Pro' },
        { avaliacaoId: 2, nomeUsuario: 'Voce', nota: 4, comentario: 'Muito bom, recomendo.', produtoNome: 'Mouse Gamer RGB' },
        { avaliacaoId: 3, nomeUsuario: 'Voce', nota: 5, comentario: 'Qualidade incrivel!', produtoNome: 'Monitor 27" 4K' },
      ]);
    } catch {
      setProdutos([
        { id: 1, nome: 'Notebook Pro', preco: 4999.99, estoque: 15 },
        { id: 2, nome: 'Mouse Gamer RGB', preco: 199.99, estoque: 50 },
        { id: 3, nome: 'Teclado Mecanico', preco: 349.99, estoque: 30 },
      ]);
      setAvaliacoes([
        { avaliacaoId: 1, nomeUsuario: 'Voce', nota: 5, comentario: 'Produto excelente!', produtoNome: 'Notebook Pro' },
        { avaliacaoId: 2, nomeUsuario: 'Voce', nota: 4, comentario: 'Muito bom, recomendo.', produtoNome: 'Mouse Gamer RGB' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCriarAvaliacao = async () => {
    if (!produtoId || !comentario.trim()) return;

    setSalvando(true);
    try {
      const novaAvaliacao: CreateAvaliacaoDto = {
        produtoId: parseInt(produtoId),
        usuarioId: USUARIO_DEMO_ID,
        nota,
        comentario,
      };
      await avaliacaoApi.inserir(novaAvaliacao);
      await fetchData();
    } catch {
      // Mock add
      const produto = produtos.find((p) => p.id === parseInt(produtoId));
      setAvaliacoes((prev) => [
        ...prev,
        {
          avaliacaoId: Date.now(),
          nomeUsuario: 'Voce',
          nota,
          comentario,
          produtoNome: produto?.nome || 'Produto',
        },
      ]);
    } finally {
      setSalvando(false);
      setModalAberto(false);
      setProdutoId('');
      setNota(5);
      setComentario('');
    }
  };

  const handleExcluir = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta avaliacao?')) return;

    setExcluindo(id);
    try {
      await avaliacaoApi.excluir(id);
      await fetchData();
    } catch {
      // Mock delete
      setAvaliacoes((prev) => prev.filter((a) => a.avaliacaoId !== id));
    } finally {
      setExcluindo(null);
    }
  };

  if (loading) {
    return <Loading text="Carregando avaliacoes..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Minhas Avaliacoes
          </h2>
          <p className="text-muted-foreground">
            Gerencie suas avaliacoes de produtos
          </p>
        </div>
        <Button onClick={() => setModalAberto(true)}>
          <Plus className="w-4 h-4" />
          Nova Avaliacao
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{avaliacoes.length}</p>
              <p className="text-sm text-muted-foreground">Total de Avaliacoes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {avaliacoes.length > 0
                  ? (avaliacoes.reduce((acc, a) => acc + a.nota, 0) / avaliacoes.length).toFixed(1)
                  : '0'}
              </p>
              <p className="text-sm text-muted-foreground">Media das Notas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List */}
      {avaliacoes.length === 0 ? (
        <EmptyState
          icon={<Star className="w-6 h-6 text-muted-foreground" />}
          title="Nenhuma avaliacao"
          description="Voce ainda nao avaliou nenhum produto."
          action={
            <Button onClick={() => setModalAberto(true)}>
              <Plus className="w-4 h-4" />
              Criar Avaliacao
            </Button>
          }
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead>Comentario</TableHead>
                <TableHead className="text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {avaliacoes.map((avaliacao) => (
                <TableRow key={avaliacao.avaliacaoId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                        <Package className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{avaliacao.produtoNome}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StarRating rating={avaliacao.nota} readonly size="sm" />
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {avaliacao.comentario}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        loading={excluindo === avaliacao.avaliacaoId}
                        onClick={() => handleExcluir(avaliacao.avaliacaoId)}
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

      {/* Modal Nova Avaliacao */}
      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        title="Nova Avaliacao"
      >
        <div className="space-y-4">
          <Select
            label="Produto"
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
            options={[
              { value: '', label: 'Selecione um produto' },
              ...produtos.map((p) => ({ value: p.id.toString(), label: p.nome })),
            ]}
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nota
            </label>
            <StarRating rating={nota} onChange={setNota} size="lg" />
          </div>

          <Input
            label="Comentario"
            placeholder="Conte sua experiencia com o produto..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalAberto(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCriarAvaliacao}
              loading={salvando}
              disabled={!produtoId || !comentario.trim()}
            >
              Publicar Avaliacao
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
