namespace MarketplaceOps.Application;

using MarketplaceOps.Domain;

public interface IAvaliacaoRepository
{
    Task<IEnumerable<Avaliacao>> GetAvaliacoesByProdutoIdAsync(int produtoId);
    Task AddAvaliacaoAsync(Avaliacao avaliacao);
    Task DeleteAvaliacaoAsync(int id);
}