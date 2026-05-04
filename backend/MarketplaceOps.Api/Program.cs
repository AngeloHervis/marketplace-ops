using Dapper;
using MarketplaceOps.Core.Enums;
using MarketplaceOps.Core.Interfaces.Repositories;
using MarketplaceOps.Core.Interfaces.Services;
using MarketplaceOps.Core.Services;
using MarketplaceOps.Infrastructure.Data;
using MarketplaceOps.Infrastructure.Repositories;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Dapper Type Handlers para salvar Enum como String
SqlMapper.AddTypeHandler(new EnumAsStringHandler<PedidoStatus>());
SqlMapper.AddTypeHandler(new EnumAsStringHandler<UsuarioRole>());

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// DI - Repositories
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IProdutoRepository, ProdutoRepository>();
builder.Services.AddScoped<IAvaliacaoRepository, AvaliacaoRepository>();
builder.Services.AddScoped<IPedidoRepository, PedidoRepository>();

// DI - Services
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IProdutoService, ProdutoService>();
builder.Services.AddScoped<IAvaliacaoService, AvaliacaoService>();
builder.Services.AddScoped<IPedidoService, PedidoService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
