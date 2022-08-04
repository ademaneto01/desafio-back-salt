<h1>Teste Ademar Envio Mensagens</h1>

**IMPORTANTE**
**Formato de data para envio de mensagem deve ser no seguinte formato: dia,mes,ano e horario. Exemplo: 04-08-2022 14:00**

<h2>REQUISITOS</h2>
<p>
Criar uma estrutura de dados(mongo)

importar/cadastrar contatos
nome, numero

Cadastrar envios 
	Estrutura:
		nome(string), 
		numero(string), 
		msg(string), 
		data_criado(datetime), 
		data_envio(datetime), 
		status(string)
listar envios com filtro de data
E envio de msgs na data
<p>

</
<h2>Resumo</h2> 

<p>
Boa parte do tempo que me foi dado passei tentando me conectar com o end point da salt, mas não obtive sucesso. até enviei um print do erro no grupo do teste, pois estou desconfiado que pode ser algum erro com a URL.
Então optei por seguir em frente, e me deparei com outro desafio. Tenho experiencia com banco de dados relacional, então criei todo o projeto com banco de dados relacional para não correr riscos de não conseguir enviar o desafio. e com o tempo que me sobrou estudei um pouco sobre mongo e realizei algumas implementaçoes. porem não consegui finalizar tudo a tempo, pois criei uma conta para o mongoose atlas e começou a dar muitos erros então tentei baixar o mongoDB e realizar a conexão, mas com isso ja me faltava menos de uma hora para entrega do desafio, e ficou apertado para conseguir realziar alterações nos endpoints para mongo.
Optei por entregar funcionando somente com banco de dados relacional, e deixei os arquivos com oque consegui implementar de mongo.

OBS: no endpoint de envio de mensagem, tratei a data com uma pratica não indicada, porem tive alguns problemas de lib e não estava conseguindo converter para timestamp e de timestamp tranformar para a informação que eu necessitou tilizar. utilizando getDate() por exemplo. então obtei por realizar essa manobra somente para a aplicação não quebrar.
</p>

**conclusão**

<p>
Embora não finalizei o desafio conforme eu desejava, estou feliz com o resultado. Pois coheci o mongoDB e gostei bastante. Para algumas implementações ele facilita muito o trabalho, e diminui bastante linhas de códigos. ja que com as querys precisa realizar muita linha de codigo relacionando tabelas para conseguir obter algum resultado. 
</p>
