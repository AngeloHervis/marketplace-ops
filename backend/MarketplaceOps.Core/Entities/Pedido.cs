using MarketplaceOps.Core.Enums;

namespace MarketplaceOps.Core.Entities;

public class Pedido
{
    public int Id { get; set; }
    public int UsuarioId { get; set; }
    public DateTime DataPedido { get; set; }
    public PedidoStatus Status { get; set; } = PedidoStatus.Pendente;
}
