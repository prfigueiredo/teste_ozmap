# teste_ozmap
API RESTful - Express, MongoDB e Mongoose

1) Rotas das Operações CRUD:

Rotas como /users e /regions indicam as entidades principais (usuários e regiões).
Métodos HTTP (GET, POST, PUT, DELETE) são utilizados para representar operações CRUD específicas.

2) Uso de Verbos HTTP:

GET para recuperar recursos.
POST para criar novos recursos.
PUT para atualizar recursos existentes.
DELETE para excluir recursos.

3) Padrão de Nomes de Rota:

As rotas seguem um padrão lógico relacionado às entidades que estão sendo manipuladas (/users, /regions).

4) Utilização de Parâmetros de Rota:

Parâmetros de rota, como :userId e :regionId, são usados para identificar recursos específicos durante operações de atualização e exclusão.

5) Respostas em Formato JSON:

O middleware express.json() é configurado para permitir que o servidor interprete corpos de solicitação no formato JSON.
Conexão com Banco de Dados:

A conexão com o banco de dados MongoDB usando o Mongoose indica que os dados são persistentes e armazenados em um banco de dados.
