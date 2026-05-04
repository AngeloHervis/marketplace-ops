using MarketplaceOps.Core.Entities;

namespace MarketplaceOps.Core.Interfaces.Repositories;

public interface IAvaliacaoRepository
{
    Task<IEnumerable<AvaliacaoDetalheDto>> ObterDetalhesComUsuarioAsync(int produtoId);
    Task InserirAsync(Avaliacao avaliacao);
    Task ExcluirAsync(int avaliacaoId);
}
