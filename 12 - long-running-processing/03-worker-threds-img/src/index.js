import { createServer } from 'http'
import { parse, fileURLToPath } from 'url'
import { Worker } from 'worker_threads'

// ver sobre "piscina" faz worker pool
import { dirname } from 'path'

// https://sharp.pixelplumbing.com/install#worker-threads
import sharp from 'sharp'

const currentFolder = dirname(fileURLToPath(import.meta.url))
const workerFileName = 'worker.js'

async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentFolder}/${workerFileName}`); // , { workerData }
    worker.postMessage(images)
    worker.once('message', resolve)
    worker.once('error', reject)
    worker.once('exit', (code) => {
      if (code !== 0) return reject(new Error(`Thread ${worker.threadId} stopped with exit code ${code}`));
      console.log(`Thread ${worker.threadId} exited!`)
    })
    /* Terminando a worker thread manualmente após 500ms
    setTimeout(() => {
      worker.terminate().then(() => {
        console.log('Worker thread terminated.');
      }).catch((error) => {
        console.error('Failed to terminate worker thread:', error);
      });
    }, 500);
    */
  })
}

async function handler(request, response) {
  if (request.url.includes('joinImages')) {
    const { query: { background, img: image } } = parse(request.url, true);
    const imageBase64 = await joinImages({ image, background });

    response.writeHead(200, { 'Content-Type': 'text/html' });

    response.end(`<img style="width: 100%;height: 100%" src="data:image/jpeg;base64,${imageBase64}" />`);

    return;
  }

  return response.end('ok')
}

//
createServer(handler)
  .listen(3000, () => console.log('running at 3000'))