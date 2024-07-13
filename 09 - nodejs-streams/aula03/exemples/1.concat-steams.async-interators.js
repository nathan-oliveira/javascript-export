import { pipeline } from 'stream/promises'

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

// writable stream
async function* output(stream){
  for await (const chunk of stream) {
    const name = chunk.math(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${chunk}`)
  }
}

// passthrough stream
async function* merge(streams) {
  for (const readable of streams) {

    readable.setEncoding('utf8')  // faz trabalhar com objectMode para não precisar trabalhar com buffer
    for await (const chunk of readable) {
      for (const line of chunk.trim().split(/\n/)) {
        yield line
      }
    }
  }
}

await pipeline(merge(results), output)


// typescript

// import { pipeline } from 'stream/promises';
// import axios from 'axios';

// class StreamPipeline {
//   private API_01 = 'http://localhost:3000';
//   private API_02 = 'http://localhost:4000';

//   private async getStreams() {
//     const requests = await Promise.all([
//       axios({
//         method: 'get',
//         url: this.API_01,
//         responseType: 'stream',
//       }),
//       axios({
//         method: 'get',
//         url: this.API_02,
//         responseType: 'stream',
//       })
//     ]);

//     return requests.map(({ data }) => data);
//   }

//   private async * output(stream: AsyncIterable<string>) {
//     for await (const chunk of stream) {
//       const match = chunk.match(/:"(?<name>.*?)(?=-)/);
//       const name = match?.groups?.name;
//       if (name) {
//         console.log(`[${name.toLowerCase()}] ${chunk}`);
//       }
//     }
//   }

//   private async * merge(streams: AsyncIterable<string>[]) {
//     for (const readable of streams) {
//       readable.setEncoding('utf8');
//       for await (const chunk of readable) {
//         for (const line of chunk.trim().split(/\n/)) {
//           yield line;
//         }
//       }
//     }
//   }

//   public async run() {
//     try {
//       const streams = await this.getStreams();
//       await pipeline(this.merge(streams), this.output.bind(this));
//     } catch (error) {
//       console.error('StreamPipeline error:', error.message);
//     }
//   }
// }

// (async () => {
//   const streamPipeline = new StreamPipeline();
//   await streamPipeline.run();
// })();
