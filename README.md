# Back-end GoDev

Aplicação desenvolvida em NodeJS utilizando o framework AdonisJS.

- Regras de negocio ✅
- Autenticação ✅
- Validação de dados ✅
- API REST ✅
- Banco relacional PostgreSQL ✅

<br/>
<br/>

# Ambiente de desenvolvimento
<details>
  <summary>MacOS</summary>

  <br/>

  1. Abra o terminal e faça a instalação do Homebew
  - Digite o seguinte comando para instalar o Homebrew

  <br/>

  ````bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
  ````

  2. Depois de instaldo digite o seguinte comandos para instalar o NodeJS

  <br/>

  ````bash
  brew install node@14 watchman
  ````

  3. Definia a veriavél de ambiente do NodeJS

  <br/>

  ````bash
  export PATH=$PATH:/usr/local/opt/node@14/bin
  ````
</details>

<details>
  <summary>Windows</summary>

  <br/>

  1. Abra o PowerSell como administrador
  2. Execute o seguinte comando

  <br/>

  ````bash
  Set-ExecutionPolicy AllSigned
  ````

  3. Instale o Chocolatey

  <br/>

  ````bash
  Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
  ````

  4. Feche o PowerSheel e bara novamente e instale o nodeJS

  <br/>

  ````bash
  choco install -y nodejs-lts openjdk11
  ````

  5. Instale o yarn globalmente

  <br/>

  ````bash
  npm install --global yarn
  ````
  </details>

  <details>
  <summary>Ubuntu</summary>

  <br/>

  1. Abra o terminal e faça a instalação do Curl
  - No terminal digite o seguinte comando para instalar o curl

  <br/>

  ````bash
  sudo apt-get install curl
  ````

  2. Depois de instaldo digite os seguintes comando para instalar o NodeJS

  <br/>

  ````bash
  curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ````
</details>

  <br/>
  <br/>

  - Depois de configurar o SO...

  1. Instale o yarn globalmente

  <br/>

  ````bash
  sudo npm install --global yarn
  ````

  <br/>

  2. Instala o docker na máquina

  <br/>

  3. Crie um container com o postgreSQL

  <br/>

  ````bash
  docker run --name godev -e POSTGRES_PASSWORD=suaSenha -p 5432:5432 -d postgres
  ````

  <br/>


  4. Clone o projeto para sua máquina com o comando:

  <br/>

  ````bash
  git clone https://github.com/leoleite13k/go-dev-back.git
  ````

  <br/>

  5. Na pasta do projeto rode:

  <br/>

   ````bash
  yarn && yarn dev
  ````

  <br/>
  6. Agora basta copiar e renomear o arquivo .env.example para .env e inserir as credenciais e urls

  <br/>

  **Pronto! o projeto já está rodando ✨**

  <br/>

  **OBS: O arquivo com as requisições está em:** docs/insomnia/Insomnia_Go_Dev.json
