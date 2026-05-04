namespace MarketplaceOps.Core.Entities;

public class AvaliacaoDetalheDto
{
    public int AvaliacaoId { get; set; }
    public string NomeUsuario { get; set; } = string.Empty;
    public string Comentario { get; set; } = string.Empty;
    public int Nota { get; set; }
}
