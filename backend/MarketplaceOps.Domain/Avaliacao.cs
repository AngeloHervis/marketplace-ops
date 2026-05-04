namespace MarketplaceOps.Domain;

public class Avaliacao
{
    public int Id { get; set; }
    public int ProdutoId { get; set; }
    public int UsuarioId { get; set; }
    public int Nota { get; set; } // 1 a 5
    public string Comentario { get; set; } = string.Empty;
}