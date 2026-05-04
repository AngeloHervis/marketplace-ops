using MarketplaceOps.Core.Entities;
using MarketplaceOps.Core.Interfaces.Repositories;
using MarketplaceOps.Core.Interfaces.Services;

namespace MarketplaceOps.Core.Services;

public class AvaliacaoService(IAvaliacaoRepository repository) : IAvaliacaoService
{
    public Task<IEnumerable<AvaliacaoDetalheDto>> ObterDetalhesComUsuarioAsync(int produtoId) => repository.ObterDetalhesComUsuarioAsync(produtoId);

    public Task InserirAsync(Avaliacao avaliacao) => repository.InserirAsync(avaliacao);

    public Task ExcluirAsync(int avaliacaoId) => repository.ExcluirAsync(avaliacaoId);
}
