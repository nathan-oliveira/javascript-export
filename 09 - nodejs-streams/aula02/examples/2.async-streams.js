import { pipeline } from 'stream/promises'
import { setTimeout } from 'timers/promises'

async function * myCustomReadable() {
  yield Buffer.from('this is my')
  await setTimeout(100)
  yield Buffer.from('custom readable')
}

async function * myCustomTransform(stream) {

  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, '_')
  }

}

async function * myCustomDuplex(stream) {
  let bytesRead = 0
  const wholeString = []
  for await (const chunk of stream) {
    console.log('[duplex writable]', chunk)
    bytesRead += chunk.length;
    wholeString.push(chunk)
  }

  yield `wholeString ${wholeString.join()}`
  yield `bytesRead ${bytesRead}`
}

async function * myCustomWritable(stream) {

  for await (const chunk of stream) {
    console.log('[writable]', chunk)
  }

}

try {
  const controller = new AbortController();

  // caso precisa cancelar um fluxo
  // setImmediate(() => controller.abort())
  await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomDuplex,
    myCustomWritable,
    { signal: controller.signal },
  )
} catch (error) {
  console.error('StreamPipeline ', error.message)
}




// TYPESCRIPT
// import { pipeline } from 'stream/promises';
// import { setTimeout } from 'timers/promises';

// class StreamPipeline {
//   async * myCustomReadable() {
//     yield Buffer.from('this is my');
//     await setTimeout(100);
//     yield Buffer.from('custom readable');
//   }

//   async * myCustomTransform(stream: AsyncIterable<Buffer>) {
//     for await (const chunk of stream) {
//       yield chunk.toString().replace(/\s/g, '_');
//     }
//   }

//   async * myCustomDuplex(stream: AsyncIterable<Buffer | string>) {
//     let bytesRead = 0;
//     const wholeString: (Buffer | string)[] = [];
//     for await (const chunk of stream) {
//       console.log('[duplex writable]', chunk);
//       bytesRead += chunk.length;
//       wholeString.push(chunk);
//     }

//     yield `wholeString ${wholeString.join('')}`;
//     yield `bytesRead ${bytesRead}`;
//   }

//   async * myCustomWritable(stream: AsyncIterable<string>) {
//     for await (const chunk of stream) {
//       console.log('[writable]', chunk);
//     }
//   }

//   public async run() {
//     try {
//       const controller = new AbortController();
//       await pipeline(
//         this.myCustomReadable.bind(this),
//         this.myCustomTransform.bind(this),
//         this.myCustomDuplex.bind(this),
//         this.myCustomWritable.bind(this),
//         { signal: controller.signal },
//       );
//     } catch (error) {
//       console.error('StreamPipeline ', error.message);
//     }
//   }
// }

// (async () => {
//   const streamPipeline = new StreamPipeline();
//   await streamPipeline.run();
// })();

