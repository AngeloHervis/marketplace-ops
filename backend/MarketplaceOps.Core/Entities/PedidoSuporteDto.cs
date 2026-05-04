namespace MarketplaceOps.Core.Entities;

public class PedidoSuporteDto
{
    public int PedidoId { get; set; }
    public string NomeCliente { get; set; } = string.Empty;
    public string EmailCliente { get; set; } = string.Empty;
    public string NomeProduto { get; set; } = string.Empty;
    public DateTime DataPedido { get; set; }
}
