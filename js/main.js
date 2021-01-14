const SAIDA = document.getElementById('screen');
const NUMEROS = document.querySelectorAll('[data-number="true"]');
const OPERACOES_SIMPLES = document.querySelectorAll('[data-operacao="simples"]');
const OPERACOES_COMPLEXAS = document.querySelectorAll('[data-operacao="complexa"]');
const IGUAL = document.querySelector('#igual');
let numero1, numero2, operacao;

function escreveNumerosNaTela(evento){
    if(SAIDA.innerHTML === '' && evento.currentTarget.id === 'virgula') return;
    SAIDA.innerHTML += evento.currentTarget.innerText;
};
NUMEROS.forEach(item => item.addEventListener('click',escreveNumerosNaTela));


const apagar = () => SAIDA.innerText = SAIDA.innerText.slice(0, -1);
const limpar = () => SAIDA.innerText = '';
const oposto = () => {
    let texto = -SAIDA.innerText.replace(',','.');
    SAIDA.innerText = texto.toString().replace('.',',');
}
const FUNCOES_SIMPLES = [apagar, limpar, oposto];
OPERACOES_SIMPLES.forEach((item, index) => item.addEventListener('click',FUNCOES_SIMPLES[index]));


function prepararOperacoes(evento){
    if(SAIDA.innerText === '' && evento.currentTarget.id === 'subtracao') return SAIDA.innerText = '-';
    else if(SAIDA.innerText === '' || SAIDA.innerText === '-') return;
    else if(SAIDA.innerText.endsWith(',')) return;
    else if(operacao) return;
    
    numero1 = +SAIDA.innerText.replace(',','.');
    operacao = evento.currentTarget.id;
    SAIDA.setAttribute('data-conteudo', SAIDA.innerText.replace('.',',') + evento.currentTarget.innerText);
    SAIDA.innerText = '';
    SAIDA.style.animation = '';
}
OPERACOES_COMPLEXAS.forEach(item => item.addEventListener('click',prepararOperacoes));


function calcular(numero1, numero2, operacao){
    if(operacao === 'porcentagem') return numero1*numero2/100;
    else if(operacao === 'divisao') return numero1/numero2;
    else if(operacao === 'multiplicacao') return numero1*numero2;
    else if(operacao === 'subtracao') return numero1-numero2;
    else if(operacao === 'soma') return numero1+numero2;
}
function realizarOperacoes(){
    if(SAIDA.innerText === '' || SAIDA.innerText === '-') return;
    else if(SAIDA.innerText.endsWith(',')) return;
    else if(!operacao) return;
    
    numero2 = +SAIDA.innerText.replace(',','.');
    SAIDA.innerText = calcular(numero1, numero2, operacao).toString().replace('.',',');
    SAIDA.setAttribute('data-conteudo',''); 
    SAIDA.style.animation = 'fadein 1s';
    numero1 = undefined;
    numero2 = undefined;
    operacao = undefined;
}
IGUAL.addEventListener('click', realizarOperacoes);