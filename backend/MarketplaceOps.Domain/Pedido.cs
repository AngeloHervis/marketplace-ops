namespace MarketplaceOps.Domain;

public class Pedido
{
    public int Id { get; set; }
    public int UsuarioId { get; set; }
    public DateTime DataPedido { get; set; }
    public string Status { get; set; } = string.Empty; // Pendente, Enviado, Cancelado
}