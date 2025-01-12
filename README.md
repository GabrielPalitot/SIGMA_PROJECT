# Rodando o Projeto

- Primeiro passo é criar um arquivo .env na raiz do projeto:
```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=sigma_db
```
- Depois é ter certeza que você tem o docker instalado

- Instale a extensão devcontainer no seu vscode (o provider é a microsoft)

- Use o comando da extensão do devcontainer "Reopen Folder in Devcontainer". Ele irá buildar um container de desenvolvimento para você.

- O container contém uma instância do postgres 15 e nodejs

- Depois de finalizado, para ter certeza que está tudo certo, rode `yarn start`