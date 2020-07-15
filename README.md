# Predição de tempo de UTI para pacientes com SRAG

## Identificar um problema de negócio a ser resolvido com técnicas de Machine Learning
- Prever o tempo em que um paciente vai ficar numa UTI é essencial para planejamento de recursos em hospitais. 

## Objetivo
Criar um aplicativoqAPI que dadas informações do paciente, preveja o tempo que este paciente pode ficar numa UTI caso necessite de uma.

## Classificação do problema
- Regressão Supervisionada 

## Amostragem
- A amostragem foi feita utilizando dados abertos do SUS: https://opendatasus.saude.gov.br/dataset/bd-srag-2020
- Acesso em 11/07/2020
- Há quase 400 mil registros, o arquivo .csv possui aproximadamente 670 megas

## Preparação dos dados
- Filtro no conjunto de dados considerando apenas aqueles com datas de entrada e saída na UTI.
- Criação da coluna de interesse através do cálculo do tempo de UTI a partir da data de entrada e data de saída.
- Separação de features entre categóricas, numéricas, datas e para ignorar.
- Uso de frequências na variável sigla da UF baseado na contagem de cada classe.
- Discretização das variáveis categóricas:
    - One Hot Encoding (default da biblioteca pycaret)
    - Resultou se mais de 668 colunas, necessário usar redução de dimensão  
- Imputação:
    - Para features categóricas utilizou-se a moda (default da biblioteca pycaret)
    - Para features numéricas utilizou-se a média (default da biblioteca pycaret)
- Normalização:
    - Utilizou-se zscore para normalização dos dados
- Redução de dimensão:
    - Utilizou-se a técnica de análise das componentes principais (PCA) linear com componentes suficientes para 90% de representatividade dos dados. Ao final trabalhou-se com 45 componentes.
- Balanceamento:
    - Por ser uma tarefa de regressão, a técnica mais indicada é a [SMOGN](http://proceedings.mlr.press/v74/branco17a/branco17a.pdf). Após utilizar a implementação em Python da técnica, não houve uma melhora significativa nos resultados. Dessa forma, optou-se por deixar o trabalho mais simples omitindo a técnica na apresentação.

## Escolha do modelo
- Testou-se 21 modelos utilizando as métricas MAE (erro absoluto médio), MSE (erro quadrático médio), RMSE (raíz do erro quadratico médio),	R2 (r2-score), RMSLE (log da raiz do erro quadrático médio) e MAPE (porcentagem absoluta média do erro) obtidas após uma validação cruzada com 10 folds.

![](/assets/escolha_modelo.jpg)

- Devido ao experimento, optou-se pelo Support Vector Machine.


## (Validação) Como medirá a qualidade?
- A qualidade será medida de acordo com o desempenho do modelo no conjunto de teste (30% das amostras), separado inicialmente. Para escolha do modelo foram utilizadas validações cruzadas com 10 folds.

## Overfitting
Para evitar overfitting, separou-se 30% os dados para teste do modelo.

## Integração a sistema
Será integrado a um sistema web. Nesse sistema é possível entrar com os dados do paciente e o mesmo retorna a previsão do tempo em que o usuário pode ficar numa UTI.

## Ferramentas utilizadas
O modelo será criado utilizando a linguagem Python e a biblioteca [pycaret](https://pycaret.org/). A API usando, também, Python e o framework Flask. Utilizou se o software Anaconda com a versão de Python 3.7.6 pra gerenciamentos de ambientes virtuais e versões de bibliotecas, Jupyter-notebook para preparação e exploração dos dados, treinamento e validação dos modelos, Visual Code Studio para criação de scripts e gerenciamentos de arquivos do sistema web.

## Text mining 
Não foram usadas técnicas de text mining. 

## Infraestrutura física para rodar
- i7-7500U 2.7GHz 2.9GHz 8GB RAM WINDOWS 10

## Sistema analítico
O sistema oferece em protótipo uma API para extração automatizada de informações, bem como uma interface para checagem iterativa, manual e individual de perfis de pacientes. Não foi gerado um sistema analítico, mas de posse das características dos pacientes de determinado hostpital, é possivel através da API prever tempos de pacientes em UTI, planejar processos e administrar recursos.

## Preparação do ambiente
```bash
conda create -n myvenv
conda install -c anaconda jupyter
conda install -c anaconda pandas
pip install pycaret
conda install -c anaconda flask
git clone https://github.com/leandrocl2005/ml-puc-2020-covid.git
cd ml-puc-2020-covid
```

## Preprocessamento e modelagem
- Baixe o conjunto de dados aqui: https://opendatasus.saude.gov.br/dataset/bd-srag-2020
- Abra o notebook de nome `preprocessamento_e_modelagem.ipynb`
- Ao executá-lo, dois arquivos serão gerados:
    - `data_V1.csv`
    - `svm_model_12072020.pkl`
- Coloque o arquivo `svm_model_12072020.pkl` na pasta backend

## Rodando o backend
```bash
cd backend
python app.py
``` 
Backend roda na porta 5000 em modo de debug.

## Rodando o frontend
```bash
cd frontend
npm i
node app.js
``` 
Frontend roda na porta 8000. Basta ir no navegador e digitar `http://localhost:8000`

## Orientação
- Professor Eder Balbino
- Disciplina de Machine Learning
- Curso de MBA em Ciência de Dados e Big data - PUC MINAS (Uberlândia-MG)

## Referências
- https://pycaret.org/
- https://opendatasus.saude.gov.br/dataset/bd-srag-2020
- Branco, P., Torgo, L., Ribeiro, R. (2017). "SMOGN: A Pre-Processing Approach for Imbalanced Regression". Proceedings of Machine Learning Research, 74:36-50.http://proceedings.mlr.press/v74/branco17a/branco17a.pdf

