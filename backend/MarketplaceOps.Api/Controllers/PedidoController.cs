using Microsoft.AspNetCore.Mvc;
using MarketplaceOps.Core.Entities;
using MarketplaceOps.Core.Interfaces.Services;

namespace MarketplaceOps.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PedidoController(IPedidoService service) : ControllerBase
{
    [HttpGet("cliente/{usuarioId}")]
    public async Task<IActionResult> ObterPorCliente(int usuarioId)
    {
        var result = await service.ObterPedidosPorClienteAsync(usuarioId);
        return Ok(result);
    }

    [HttpGet("suporte")]
    public async Task<IActionResult> ObterSuporte()
    {
        var result = await service.ObterTicketsSuporteAsync();
        return Ok(result);
    }

    [HttpGet("dashboard/status")]
    public async Task<IActionResult> ObterContagemStatus()
    {
        var result = await service.ObterContagemPedidosPorStatusAsync();
        return Ok(result);
    }

    [HttpPut("{id}/endereco")]
    public async Task<IActionResult> AtualizarEndereco(int id, [FromBody] string novoEndereco)
    {
        await service.AtualizarEnderecoAsync(id, novoEndereco);
        return Ok();
    }

    [HttpPost("{id}/cancelar")]
    public async Task<IActionResult> Cancelar(int id, [FromQuery] int produtoId)
    {
        await service.CancelarPedidoEDevolverEstoqueAsync(id, produtoId);
        return Ok();
    }

    [HttpPost("comprar/{produtoId}")]
    public async Task<IActionResult> Comprar([FromBody] Pedido pedido, int produtoId)
    {
        await service.RealizarCompraComBaixaDeEstoqueAsync(pedido, produtoId);
        return Ok();
    }
}
