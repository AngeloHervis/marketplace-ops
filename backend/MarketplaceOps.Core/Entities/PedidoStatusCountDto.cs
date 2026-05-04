using MarketplaceOps.Core.Enums;

namespace MarketplaceOps.Core.Entities;

public class PedidoStatusCountDto
{
    public PedidoStatus Status { get; set; }
    public int Quantidade { get; set; }
}
