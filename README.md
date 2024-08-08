# StudentsFront

StudentsFront é uma aplicação front-end desenvolvida em React, projetada para gerenciar informações de estudantes. Ela permite login de usuários e oferece operações CRUD (criar, ler, atualizar e deletar) para estudantes. A aplicação usa a API de backend hospedada em `https://localhost:7111`.

## Tecnologias Utilizadas

- **React**: ^18.1.0
- **TypeScript**: ^4.6.3
- **Chakra UI**: ^2.8.2 para componentes de interface de usuário estilizados
- **Axios**: ^1.7.3 para requisições HTTP
- **React Router DOM**: ^6.26.0 para gerenciamento de rotas
- **Recharts**: ^2.12.7 para gráficos
- **Framer Motion**: ^6.2.9 para animações

## Estrutura do Projeto

### Componentes

- **Login**: Tela de login que autentica usuários.
- **StudentList**: Exibe a lista de estudantes.
- **StudentForm**: Formulário para criar ou atualizar informações de estudantes.

### Funcionalidades

- **Login de Usuário**: Permite que usuários façam login na aplicação.
- **Listar Estudantes**: Exibe uma lista de todos os estudantes após o login.
- **Adicionar Estudante**: Permite adicionar um novo estudante à lista.
- **Atualizar Estudante**: Permite atualizar as informações de um estudante existente.
- **Excluir Estudante**: Permite deletar um estudante da lista.

## Instalação

Para rodar este projeto localmente, siga estas etapas:

1. **Clone o repositório:**

2. **Instale as dependências**
 yarn install
3. **Inicie a aplicação**
yarn start

## Scripts Disponíveis

- **yarn start:** Inicia o servidor de desenvolvimento.
- **yarn buildt:** Cria o build para produção.
- **yarn eject:**  Ejeção de configurações padrão do Create React App.

## Configuração da API

A aplicação está configurada para se comunicar com uma API de backend localizada em <https://localhost:7111>. A URL base da API está hardcoded no arquivo services/api.ts. Certifique-se de que o backend está em execução nesta URL para que a aplicação funcione corretamente.
