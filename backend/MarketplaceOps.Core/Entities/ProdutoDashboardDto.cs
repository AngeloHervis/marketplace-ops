namespace MarketplaceOps.Core.Entities;

public class ProdutoDashboardDto
{
    public int ProdutoId { get; set; }
    public string NomeProduto { get; set; } = string.Empty;
    public decimal NotaMedia { get; set; }
}
