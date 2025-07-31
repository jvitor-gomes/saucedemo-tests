# Sauce Demo - Testes Automatizados

Este projeto contém testes automatizados para o site [Sauce Demo](https://www.saucedemo.com/) utilizando Cypress. O objetivo é demonstrar a implementação de testes end-to-end para funcionalidades críticas do site, como login e fluxo de compras.

## Arquitetura do Projeto

O projeto segue o padrão Page Object Model (POM), que separa a lógica de teste da implementação dos elementos da página, tornando os testes mais legíveis, manuteníveis e reutilizáveis.

### Estrutura de Diretórios

```
saucedemo-tests/
├── cypress/
│   ├── e2e/                  # Arquivos de teste
│   │   ├── cart.cy.js        # Testes do carrinho de compras
│   │   └── login.cy.js       # Testes de login
│   ├── fixtures/             # Dados de teste
│   │   ├── checkout.json     # Dados para checkout
│   │   ├── productIndices.json # Índices de produtos para teste
│   │   ├── products.json     # Informações de produtos
│   │   └── users.json        # Credenciais de usuários
│   ├── pages/                # Classes Page Object
│   │   ├── CartPage.js       # Página do carrinho
│   │   ├── InventoryPage.js  # Página de inventário
│   │   └── LoginPage.js      # Página de login
│   ├── support/              # Arquivos de suporte
│   │   ├── commands.js       # Comandos personalizados
│   │   └── e2e.js            # Configuração dos testes e2e
│   └── utils/                # Utilitários
│       └── TestData.js       # Centralização dos dados de teste
├── cypress.config.js         # Configuração do Cypress
├── package.json              # Dependências e scripts
└── README.md                 # Documentação do projeto
```

### Padrões Utilizados

1. **Page Object Model (POM)**: Cada página do site tem sua própria classe que encapsula os elementos e ações possíveis naquela página.

2. **Fluent Interface**: Os métodos das classes Page Object retornam a própria instância (`return this`), permitindo encadear chamadas de método.

3. **Centralização de Dados**: Todos os dados de teste são centralizados em arquivos JSON na pasta `fixtures` e acessados através da classe `TestData`.

## Funcionalidades Testadas

### Login

- Login com sucesso usando credenciais válidas
- Tentativa de login com usuário bloqueado
- Tentativa de login com senha inválida

### Carrinho de Compras

- Adição de produtos ao carrinho
- Verificação do contador do carrinho
- Remoção de produtos do carrinho
- Navegação entre páginas (continuar comprando)
- Processo completo de checkout
- Verificação de preços (subtotal, impostos e total)

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/jvitor-gomes/saucedemo-tests/
cd saucedemo-tests
```

2. Instale as dependências:

```bash
npm install
```

## Executando os Testes

### Executar todos os testes em modo headless

```bash
npm test
```

### Abrir o Cypress Test Runner

```bash
npm run test:open
```

### Executar testes específicos

```bash
# Apenas testes de login
npm run test:login

# Apenas testes do carrinho
npm run test:cart
```

## Estrutura dos Testes

### Page Objects

As classes Page Object encapsulam os elementos e ações de cada página:

- **LoginPage**: Gerencia a página de login, incluindo preenchimento de credenciais e verificação de mensagens de erro.
- **InventoryPage**: Gerencia a página de inventário, incluindo seleção e adição de produtos ao carrinho.
- **CartPage**: Gerencia o carrinho de compras e o processo de checkout, incluindo preenchimento de informações e verificação de valores.

### Dados de Teste

Os dados de teste são organizados em arquivos JSON:

- **users.json**: Credenciais de diferentes tipos de usuários (padrão, bloqueado, problemático, etc.)
- **productIndices.json**: Índices dos produtos utilizados nos testes
- **checkout.json**: Informações para preenchimento do formulário de checkout
- **products.json**: Detalhes dos produtos, como nome e preço

### Utilitários

- **TestData.js**: Centraliza o acesso aos dados de teste, importando os arquivos JSON e disponibilizando-os para os testes.

## Boas Práticas Implementadas

1. **Reutilização de código**: Através do padrão Page Object e métodos auxiliares
2. **Isolamento de testes**: Cada teste começa com um estado limpo através do `beforeEach`
3. **Dados externalizados**: Separação entre código de teste e dados de teste
4. **Verificações explícitas**: Uso de asserções claras para validar o comportamento esperado
5. **Encadeamento de métodos**: Para melhor legibilidade do código
6. **Esperas inteligentes**: Uso de comandos do Cypress que aguardam automaticamente pelos elementos

<hr>
<div align="center"> <h3>< Contato ></h4> </div>
<div align="center"> 
👤 Autor: João Vitor Gomes <br>
📧 Email: bgomes.joaovitor@gmail.com
</div>