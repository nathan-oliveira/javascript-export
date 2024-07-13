import { Writable, PassThrough } from 'stream'

import axios from 'axios'

const API_01 = 'http://localhost:3000'
const API_02 = 'http://localhost:4000'

const requests = await Promise.all([
  axios({
    method: 'get',
    url: API_01,
    responseType: 'stream',
  }),

  axios({
    method: 'get',
    url: API_02,
    responseType: 'stream',
  })
]);

const results = requests.map(({ data }) => data);

const output = Writable({
  write(chunk, enc, callback) {
    const data = chunk.toString().replace(/\n/, '')
    /*
    ?=-            -> ele faz procurar apartir do - e olhar para traz
    :"(?<name>.*)  -> ele procura dentro das apas e extrai somente o name
    */
    const name = data.math(/:"(?<name>.*)(?=-)/).groups.name
    callback()
  }
})

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    // impede que a stream feche sozinha
    current.pipe(prev, { end: false })

    // como colocamos end: false, vamos manipular manualmente quando o nosso current terminar. Quando ele terminar vamos verificar se todos no pipeline se encerraram, ele vai então forcar a cadeia anterior a se fechar
    current.on('end', () => items.every(s => s.ended) && prev.end())
    return prev;
  }, new PassThrough())
}

merge(results).pipe(output)

// result[0].pipe(output)
// result[1].pipe(output)

`typescript

import { Writable, PassThrough, Stream } from 'stream';
import axios from 'axios';

class StreamMerger {
  private API_01 = 'http://localhost:3000';
  private API_02 = 'http://localhost:4000';

  private async getStreams() {
    const requests = await Promise.all([
      axios({
        method: 'get',
        url: this.API_01,
        responseType: 'stream',
      }),
      axios({
        method: 'get',
        url: this.API_02,
        responseType: 'stream',
      })
    ]);

    return requests.map(({ data }) => data);
  }

  private createOutputStream() {
    return new Writable({
      write(chunk, enc, callback) {
        const data = chunk.toString().replace(/\n/, '');
        const match = data.match(/:"(?<name>.*?)(?=-)/);
        const name = match?.groups?.name;
        if (name) {
          console.log(name);
        }
        callback();
      }
    });
  }

  private mergeStreams(streams: Stream[]): PassThrough {
    return streams.reduce((prev, current, index, items) => {
      current.pipe(prev, { end: false });
      current.on('end', () => items.every(s => s.readableEnded) && prev.end());
      return prev;
    }, new PassThrough());
  }

  public async run() {
    const streams = await this.getStreams();
    const outputStream = this.createOutputStream();
    this.mergeStreams(streams).pipe(outputStream);
  }
}

(async () => {
  const streamMerger = new StreamMerger();
  await streamMerger.run();
})();
`


