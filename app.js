new Vue({
	el: '#game',
	data: {
    vidaJogador: 100,
    ataqueJogador: 10,
    magiaJogador: 20,
    vidaMonstro: 100,
    ataqueMonstro: 15,
    magiaMonstro: 12,
    cura: 15,
    iniciado: false,
    logs: [],
    mensagemFinal: null
  },
  methods: {
    iniciarJogo() {
      this.iniciado = true
      this.reiniciar()
    },
    atacar() {
      var ataqueJogadorAtual = numeroRandom(this.ataqueJogador)
      this.vidaMonstro = Math.max(this.vidaMonstro - ataqueJogadorAtual, 0)

      var ataqueMonstroAtual = numeroRandom(this.ataqueMonstro)
      this.vidaJogador = Math.max(this.vidaJogador - ataqueMonstroAtual, 0)

      registraLog(`Jogador atingiu monstro com ${ataqueJogadorAtual} de ataque!`, 'blue')
      registraLog(`Monstro atingiu jogador com ${ataqueMonstroAtual} de ataque!`, 'red')

      this.final()
    },
    atacarMagia() {
      var magiaJogadorAtual = numeroRandom(this.magiaJogador)
      this.vidaMonstro = Math.max(this.vidaMonstro - magiaJogadorAtual, 0)

      var magiaMonstroAtual = numeroRandom(this.magiaMonstro)
      this.vidaJogador = Math.max(this.vidaJogador - magiaMonstroAtual, 0)

      registraLog(`Jogador atingiu monstro com ${magiaJogadorAtual} de magia!`, 'blue')
      registraLog(`Monstro atingiu jogador com ${magiaMonstroAtual} de magia!`, 'red')

      this.final()
    },
    curar() {
      var curaJogadorAtual = numeroRandom(this.cura)
      this.vidaJogador = Math.min(this.vidaJogador + curaJogadorAtual, 100)

      var ataqueMonstroAtual = numeroRandom(this.ataqueMonstro)
      this.vidaJogador = Math.max(this.vidaJogador - ataqueMonstroAtual, 0)

      registraLog(`Jogador curou ${curaJogadorAtual} de vida!`, cor)
      registraLog(`Monstro atingiu jogador com ${ataqueMonstroAtual} de ataque!`, 'green')
    },
    desistirJogo() {
      this.iniciado = false
      this.reiniciar()
    },
    barraCor(valor) {
      if (valor >= 60) {
        return 'green'
      } else if (valor > 20 && valor < 60) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    numeroRandom(value) {
      return Math.round(Math.random() * value)
    },
    registraLog(mensagem, cor) {
      this.logs.unshift({ mensagem, cor })
    },
    final() {
      if (this.vidaJogador <= 0) {
        this.mensagemFinal = { texto: 'Você perdeu a batalha :(', cor: 'red' }
        this.iniciado = false
        return
      }

      if (this.vidaMonstro <= 0) {
        this.mensagemFinal = { texto: 'Você ganhou a batalha :)', cor: 'green' }
        this.iniciado = false
        return
      }
    },
    reiniciar() {
      this.vidaJogador = 100
      this.vidaMonstro = 100
      this.logs = []
      this.mensagemFinal = null
    }
  },
});