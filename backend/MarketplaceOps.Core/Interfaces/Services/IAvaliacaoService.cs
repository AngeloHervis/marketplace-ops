using MarketplaceOps.Core.Entities;

namespace MarketplaceOps.Core.Interfaces.Services;

public interface IAvaliacaoService
{
    Task<IEnumerable<AvaliacaoDetalheDto>> ObterDetalhesComUsuarioAsync(int produtoId);
    Task InserirAsync(Avaliacao avaliacao);
    Task ExcluirAsync(int avaliacaoId);
}
