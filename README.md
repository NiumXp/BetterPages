# BetterPages
Extensão para adicionar qualidade de vida ou melhorar certas páginas na web que foram mal projetadas.

### Features
- [x] Data de envio nas mensagens do Instagram
- [ ] Visualizador de thumbnail no YouTube

### Instalação
Clone o repositório do projeto e execute o arquivo de *build* na raiz do projeto da seguinte forma:
```bash
python3 build.py
```
> [!WARNING]
> Atualmente a extensão gerada só funciona no navegador Chrome.

Isso irá construir a extensão na pasta `extension/` do mesmo diretório de execução (*working directory*). Feito isso, acesse a página de extensões do seu navegador e carregue os arquivos.
- No Chrome, acesse a página de "Gerenciar Extensões", ative o "Modo do desenvolvedor" e clique em "Carregar sem compactação" para carregar os arquivos da extensão.
