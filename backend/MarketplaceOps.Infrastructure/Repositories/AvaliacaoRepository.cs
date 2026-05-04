using MarketplaceOps.Core.Entities;
using MarketplaceOps.Core.Interfaces.Repositories;

namespace MarketplaceOps.Infrastructure.Repositories;

public class AvaliacaoRepository : IAvaliacaoRepository
{
    public async Task<IEnumerable<AvaliacaoDetalheDto>> ObterDetalhesComUsuarioAsync(int produtoId)
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }

    public Task InserirAsync(Avaliacao avaliacao)
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }

    public Task ExcluirAsync(int avaliacaoId)
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }
}
