// curl "localhost:3000?salary=3000&discount=15"
import http from 'http'

function netSalary({ discount, salary }) {
  const percent = (discount / 100)
  const cost = salary * percent
  const result = salary - cost;
  return result;
}

http.createServer((req, res) => {
  const url = req.url.replace('/', '');
  const params = new URLSearchParams(url);
  const data = Object.fromEntries(params)
  const result = netSalary(data)
  console.log(result)
  res.end(`O seu salario final é ${result}`)
})
.listen(3000, () => console.log('app running at 3000'))


// node inspect index.mjs
// setBreakpoint(13)
// count
// curl "localhost:3000?salary=3000&discount=15"
// exec req
// exec new URLSearchParams(req.url).get('salary')
// exec new URLSearchParams(req.url).get('discount')
// exec new URLSearchParams(req.url).get('/?salary')
// .save debug.log

// exec Object.fromEntries(params)
// ##restart é o r
// r
// clearBreakpoint(index.mjs, 13)
// breakpoint

// sb(16) ou setBreakpoint(16)
// count

// curl "localhost:3000?salary=3000&discount=15"

// repl
// data

