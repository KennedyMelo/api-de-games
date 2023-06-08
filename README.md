# API de Games
Esta API fornece é utilizada para fornecer jogos com seus atributos (título, preço e ano), salvá-los, atualizá-los e deletá-los.
##Endpoints
### Get /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parâmetros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os games.

Exemplo de resposta:
```
[
	{
		"id": 1,
		"title": "Age of Empire",
		"year": 2010,
		"price": 25,
		"createdAt": "2023-06-05T19:40:26.000Z",
		"updatedAt": "2023-06-05T19:57:23.000Z"
	},
	{
		"id": 4,
		"title": "Warcraft",
		"year": 2010,
		"price": 25,
		"createdAt": "2023-06-05T19:44:02.000Z",
		"updatedAt": "2023-06-05T19:56:26.000Z"
	},
	{
		"id": 5,
		"title": "Terraria 2",
		"year": 2012,
		"price": 202,
		"createdAt": "2023-06-05T21:17:30.000Z",
		"updatedAt": "2023-06-05T23:34:31.000Z"
	},
	{
		"id": 6,
		"title": "Lol",
		"year": 2015,
		"price": 0,
		"createdAt": "2023-06-05T21:18:21.000Z",
		"updatedAt": "2023-06-05T21:18:21.000Z"
	},
	{
		"id": 9,
		"title": "craft",
		"year": 2022,
		"price": 222,
		"createdAt": "2023-06-07T03:03:50.000Z",
		"updatedAt": "2023-06-07T03:03:50.000Z"
	},
	{
		"id": 10,
		"title": "asdasd",
		"year": 2022,
		"price": 2222,
		"createdAt": "2023-06-07T03:21:33.000Z",
		"updatedAt": "2023-06-07T03:21:33.000Z"
	}
]
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{
	"err": "Token inválido"
}
```

### POST /auth
Esse endpoint é responsável por fazer o processo de login.
#### Parâmetros
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema com aquele determinado e-mail

Exemplo:
```
{
	"email": "kennedy@teste.com",
	"password": "123456"
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:
```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJrZW5uZWR5QHRlc3RlLmNvbSIsImlhdCI6MTY4NjE3NzIyMiwiZXhwIjoxNjg2MzUwMDIyfQ.LPt1CACFCpICczwWmhKwYydVv87KFOuPU-zX9WBeMZE"
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha ou e-mail incorretos.

Exemplo de resposta:
```
{
	"err": "Credenciais inválidas!"
}
```
