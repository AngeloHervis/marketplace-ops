using Microsoft.AspNetCore.Mvc;
using MarketplaceOps.Core.Interfaces.Services;

namespace MarketplaceOps.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutoController(IProdutoService service) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> ObterComEstoque()
    {
        var result = await service.ObterProdutosComEstoqueAsync();
        return Ok(result);
    }

    [HttpGet("buscar")]
    public async Task<IActionResult> Buscar([FromQuery] string termo)
    {
        var result = await service.BuscarPorNomeAsync(termo);
        return Ok(result);
    }

    [HttpGet("dashboard/media-avaliacoes")]
    public async Task<IActionResult> ObterNotaMedia()
    {
        var result = await service.ObterNotaMediaPorProdutoAsync();
        return Ok(result);
    }

    [HttpPut("{id}/preco")]
    public async Task<IActionResult> AtualizarPreco(int id, [FromBody] decimal novoPreco)
    {
        await service.AtualizarPrecoAsync(id, novoPreco);
        return Ok();
    }
}
