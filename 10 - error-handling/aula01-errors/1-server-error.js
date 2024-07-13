import Http from 'http'

let count = 1;
async function handler (request, response) {
  count++;
  try {
    if (count % 2 === 0) await Promise.reject('error dentro do handler')

    for await (const data of request) {
      if (count % 2 !== 0) await Promise.reject('error dentro do for')
    }
  } catch (error) {
    console.log('a server error has happened', error)
    response.writeHead(500)
    response.write(JSON.stringify({ message: 'internal server error!' }))
  } finally {
    response.end()
  }

}

Http.createServer(handler).listen(3000, () => {
  console.log('running at 3000')
})
