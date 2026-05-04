namespace MarketplaceOps.Application;

using MarketplaceOps.Domain;

public interface IProdutoRepository
{
    Task<Produto> GetProdutoByIdAsync(int id);
    Task<IEnumerable<Produto>> GetProdutosEmEstoqueAsync();
    Task UpdatePrecoProdutoAsync(int id, decimal novoPreco);
}