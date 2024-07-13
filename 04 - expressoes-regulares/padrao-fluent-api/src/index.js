'use strict';

const { readFile } = require('fs').promises
const { join } = require('path')
const pdf = require('pdf-parse')

;(async () => {
  const dataBuffer = readFile(join(__dirname, './../docs/contrato.pdf'))
  const data = await pdf(dataBuffer)
  // console.log(data.text) // npm start | tee text.txt
})()

// " ?<= " pega todos o texto que está na frente
// [contratante|contratada] => um ou outro (e tem a flag no frim da expressao pra pegar maiusculo e minusculo)
// :\s{1} => vai procurar o caracter literal do dois pontos seguindo de um espaço
// " (?!\s)  " => pega tudo que não tem espaço na frente (negative look around)
// .*\n => pega qualquer coisa até o primeiro \n
// .*? => (non greety) esse ? faz que ele pare na primeira reccorrencia, assim ele evita ficar em loop
// $ => informar que a pesquisa acaba no fim da linha
// g - global - se vai continuar procurando em todas as linhas
// m - multiline - procurar em mais de uma linha
// i - insensitive

// Case Sensitive são linguagens que diferenciam maiúsculo de minúsculo. linguagens são assim. Case Insensitive já não diferencia.


// /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$/gmi

