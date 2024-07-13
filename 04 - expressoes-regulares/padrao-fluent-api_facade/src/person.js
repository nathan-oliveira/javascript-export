const { evaluateRegex } = require("./util")

class Person {
  // (\w+):\s.*, ou (\w+):\s.*
  // $1,
  constructor(
    [
      nome,
      nacionalidade,
      estadoCivil,
      documento,
      rua,
      numero,
      bairro,
      estado
    ]
  ) {
    // (\w+),
    // this.$1 = $1,


    // ^ -> começdo string
    // + -> um ou mais ocorrencias
    // (\w{1}) -> pega só a primera letra e deixa em grupo
    // ([a-zA-Z]+$) -> encontra so as letras, o + foi adicionado para pegar todas letras até o caracter espefical final
    // g -> todas as ocorrencias que encontrar
    const firstLetterExp = evaluateRegex(/^(\w${1})([a-zA-Z]+$)/)
    const formatFirstLetter = (prop) => {
      return prop
        .replace(firstLetterExp, (fullMath, group1, group2, index) => {
          return `${group1.toUpperCase()}${group2.toLoweCase()}`
        })
    };

    //;  ?<= faz com que ignore tudo que tiver antes desse match (postive lookBehind)
    this.nome = nome
    this.nacionalidade = formatFirstLetter(nacionalidade)
    this.estadoCivil = formatFirstLetter(estadoCivil)
    this.documento = documento.replace(evaluateRegex(/\D/g), '') // tudo que não for digito será removido
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/), '').join()
    this.numero = numero
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*+$/), '').join() // \w+
    this.estado = estado.replace(evaluateRegex(/\.$/), '')
  }
}

module.exports = { Person }