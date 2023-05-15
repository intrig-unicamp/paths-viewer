# Exemplos

Essa pasta contém conjuntos de dados de exemplo para facilitar os testes do PathsViewer. Os seguintes dados estão disponíveis:

- [Ônibus / Belo Horizonte](./belo_horizonte) ([fonte](https://ckan.pbh.gov.br/dataset/9c051f97-122a-427e-8997-4f0adcf5f93c/resource/a33650ce-2dc3-43b9-90bc-be74964763df/download/velocidade_nos_corredores.csv))

  Esse _dataset_ é sobre das coordenadas geográficas de ônibus da cidade de Belo Horizonte em corredores da cidade, coletados de agosto de 2019 a março de 2020. As informações disponíveis são: identificador do ônibus, código da linha do ônibus, via do corredor, sentido, latitude, longitude, data e hora.

- [Ônibus / Rio de Janeiro](./rio_de_janeiro) ([fonte](https://ieee-dataport.org/open-access/crawdad-coppe-ufrjriobuses))

  Similar ao anterior, nesse _dataset_ foram coletados dados de posição em tempo real enviados por mais de 12.000 ônibus, com granularidade de 1 minuto, da cidade do Rio de Janeiro. Contém as informações: data, hora, identificador do ônibus, linha do ônibus, latitude, longitude e velocidade.

- [Táxis / Roma](./rome) ([fonte](https://ieee-dataport.org/open-access/crawdad-romataxi))

  Esse _dataset_ contém 30 dias de dados das coordenadas geográficas de táxis da cidade de Roma, na Itália. As informações disponíveis são: data e hora, identificador do veículo, latitude e longitude.

- [Táxis / São Francisco](./san_francisco) ([fonte](https://ieee-dataport.org/open-access/crawdad-epflmobility))

  O _dataset_ de táxis em São Francisco, nos Estados Unidos, contém dados de coordenadas GPS de aproximadamente 500 veículos, coletados por 30 dias. O arquivo contém as informações de identificação do veículo, data, hora, latitude, longitude e se o táxi estava ocupado.

- [YouTube em 5G / São Paulo](./sao_paulo) ([fonte](https://ieee-dataport.org/documents/youtube-goes-5g-benchmarking-youtube-4g-vs-5g))

  Métricas de utilização do YouTube na rede 5G SA (StandAlone) e NSA (Non-StandAlone) na cidade de São Paulo foram coletadas pelo grupo de pesquisa e analisadas através do PathsViewer. O _dataset_ possui granularidade de 1 segundo e foi construído com o suporte da ferramenta [G-NetTrack](https://gyokovsolutions.com/g-nettrack/), que coleta métricas como data, hora, geolocalização, frequência do sinal, Indicador de Qualidade do Canal (Channel Quality Indicator - do inglês), tecnologia da rede (e.g. 5G, 4G, 3G), velocidade de download/upload, entre outras.

## Simulador de envio em tempo real
O _script_ [`realtime-sim.py`](./realtime-sim.py) faz o envio de dados históricos para a API do PathsViewer de forma como se fosse um dispositivo físico enviando dados em tempo real. Assim, é possível realizar o teste desse modo de operação.

Esse _script_ pode ser executado pelo terminal da seguinte forma:
```bash
python3 realtime-sim.py --endpoint https://paths-viewer.vercel.app/api/session/1773295143798 --city RIO_DE_JANEIRO
```

Para mais opções de utilização, consulte o comando de ajuda:
```bash
python3 realtime-sim.py --help
```
