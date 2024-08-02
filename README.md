# Aplicacao-Ecommerce
 Aplicação de e-commerce protótipa desenvolvida como um projeto pessoal para fins de estudo. Desenvolvida utilizando-se React, Flask(python) e MongoDB.

 ## Instruções
 Para utilizar a aplicação, basta instalar os requisitos da api, ao utilizar o comando "pip install -r requirements.txt" na pasta da api, bem como os requisitos do node.js, com o comando "npm install" na pasta do app.\n
 Após isto, é necessário realiziar a configuração do banco de dados no arquivo config.ini na pasta da api. Sendo necessário inserir o endereço do banco de dados MongoDB a ser utilizado e o nome do banco e das coleções destinadas ao registro de usuários, produtos e pedidos.
 Pode ser necessário também a alteração do campo "proxy" no arquivo package.json, na pasta do app, que deve conter o endereço que a api utilizará (por padrão defini como localhost:5000, mas se a api estiver utilizando outra porta ou estiver em outra rede, é necessário alterar).
 Com tudo isto feito, basta executar a api e o app.
