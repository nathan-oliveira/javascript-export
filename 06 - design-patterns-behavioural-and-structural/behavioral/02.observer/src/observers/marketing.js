export default class Marketing {
  update({ id, userName }) {
    // importante lembrar que o [update] é responsável por gerenciar seus erros/expections
    // não deve-se ter await no notify por que a responsabilidade do notify é só emitir eventos
    // só notificar todo mundo
    console.log(`[${id}]: [marketing] will send an welcome email to [${userName}]`)
  }
}