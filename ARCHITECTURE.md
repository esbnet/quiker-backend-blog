# Arquitetura Clean Architecture + SOLID

## Estrutura de Pastas

```
src/
├── domain/                    # Camada de Domínio (Entities + Business Rules)
│   ├── entities/             # Entidades de negócio (futuro)
│   ├── repositories/         # Interfaces dos repositórios (contratos)
│   └── errors/              # Erros de domínio
│
├── application/              # Camada de Aplicação (Use Cases)
│   ├── use-cases/           # Casos de uso (regras de aplicação)
│   │   ├── user/
│   │   ├── post/
│   │   └── comment/
│   └── protocols/           # Interfaces de serviços externos
│
├── infrastructure/          # Camada de Infraestrutura (Implementações)
│   ├── database/
│   │   ├── prisma/         # Cliente Prisma
│   │   └── repositories/   # Implementações dos repositórios
│   ├── cryptography/       # Implementações de criptografia
│   ├── env/               # Configurações de ambiente
│   └── utils/             # Utilitários de infraestrutura
│
├── presentation/           # Camada de Apresentação (Controllers/HTTP)
│   ├── controllers/       # Controllers HTTP
│   ├── middlewares/       # Middlewares
│   └── routes/           # Definição de rotas
│
└── main/                  # Camada Main (Composition Root)
    ├── factories/        # Factories para injeção de dependência
    ├── config/          # Configurações da aplicação
    ├── @types/         # Definições de tipos TypeScript
    └── server.ts       # Entry point da aplicação
```

## Princípios SOLID Aplicados

### Single Responsibility Principle (SRP)
- Cada use case tem uma única responsabilidade
- Controllers apenas recebem requisições e delegam para use cases
- Repositórios apenas lidam com persistência de dados

### Open/Closed Principle (OCP)
- Use cases dependem de interfaces (repositories), não de implementações
- Fácil adicionar novos repositórios sem modificar use cases

### Liskov Substitution Principle (LSP)
- Implementações de repositórios (Prisma, In-Memory) são intercambiáveis
- Qualquer implementação de repository pode substituir outra

### Interface Segregation Principle (ISP)
- Interfaces de repositórios específicas por entidade
- Protocols separados por responsabilidade (cryptography, etc)

### Dependency Inversion Principle (DIP)
- Use cases dependem de abstrações (interfaces)
- Infraestrutura implementa as abstrações
- Injeção de dependência via factories

## Fluxo de Dependências

```
Presentation → Application → Domain
     ↓              ↓
Infrastructure ←────┘
```

- **Domain**: Não depende de nada (núcleo da aplicação)
- **Application**: Depende apenas do Domain
- **Infrastructure**: Implementa interfaces do Domain e Application
- **Presentation**: Depende de Application e usa Main para composição
- **Main**: Conhece todas as camadas e faz a composição

## Benefícios

1. **Testabilidade**: Use cases podem ser testados com repositórios in-memory
2. **Manutenibilidade**: Mudanças em uma camada não afetam outras
3. **Escalabilidade**: Fácil adicionar novos recursos seguindo o padrão
4. **Flexibilidade**: Trocar implementações (ex: Prisma por TypeORM) sem afetar regras de negócio
5. **Separação de Responsabilidades**: Cada camada tem seu propósito bem definido
