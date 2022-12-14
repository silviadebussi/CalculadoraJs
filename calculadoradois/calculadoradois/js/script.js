const operacaoInicialText = document.querySelector("#operacao-inicial");
const operacaoAtualText = document.querySelector("#operacao-atual");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculadora {
    constructor(operacaoInicialText, operacaoAtualText) {
        this.operacaoInicialText = operacaoInicialText;
        this.operacaoAtualText = operacaoAtualText;
        this.operacaoAtual = "";
    }


    addDigito(digito) {
        console.log(digito);

        if (digito === "." && this.operacaoAtualText.innerText.includes(".")) {
            return;
        }

        this.operacaoAtual = digito;
        this.atualizarDisplay();
    }


    fazerOperacao(operacao) {

        if (this.operacaoAtualText.innerText === "" && operacao !== "C") {
            if (this.operacaoInicialText.innerText !== "") {
                this.mudarOperacao(operacao);
            }
            return;
        }

        let operacaoValue;
        let inicial = +this.operacaoInicialText.innerText.split(" ")[0];
        let atual = +this.operacaoAtualText.innerText;

        if(operacao == '+'){
            operacaoValue = inicial + atual;
            this.atualizarDisplay(operacaoValue, operacao, atual, inicial);
            return;
        }else if(operacao == '-'){
            operacaoValue = inicial - atual;
            this.atualizarDisplay(operacaoValue, operacao, atual, inicial);
            return;
        }else if(operacao == 'DEL'){
            this.botaoDel();
            return;
        }else if(operacao == 'C'){
            this.botaoDeLimpar();
            return;
        }else if(operacao == '='){
            this.botaoDeIgual();
            return;
        }else{
            return console.log('Algo inesperado aconteceu.');
        }
    }


    mudarOperacao(operacao) {
        const mathOperations = ["*", "-", "+", "/"];

        if (!mathOperations.includes(operacao)) {
            return;
        }

        this.operacaoInicialText.innerText =
            this.operacaoInicialText.innerText.slice(0, -1) + operacao;
    }


    botaoDel() {
        this.operacaoAtualText.innerText =
            this.operacaoAtualText.innerText.slice(0, -1);
    }


    botaoDeLimpar() {
        this.operacaoAtualText.innerText = "";
        this.operacaoInicialText.innerText = "";
    }


    botaoDeIgual() {
        let operacao = this.operacaoInicialText.innerText.split(" ")[1];

        this.fazerOperacao(operacao);
    }

    atualizarDisplay(
        operacaoValue = null,
        operacao = null,
        atual = null,
        inicial = null
    ) {
        if (operacaoValue === null) {
            this.operacaoAtualText.innerText += this.operacaoAtual;
        } else {
            if (inicial === 0) {
                operacaoValue = atual;
            }

            this.operacaoInicialText.innerText = `${operacaoValue} ${operacao}`;
            this.operacaoAtualText.innerText = "";
        }
    }
}



const calc = new Calculadora(operacaoInicialText, operacaoAtualText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            console.log(value);
            calc.addDigito(value);
        } else {
            calc.fazerOperacao(value);
        }
    });
});