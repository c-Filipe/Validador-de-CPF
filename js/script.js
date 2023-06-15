$(document).ready(function(){
    $('#cpf').inputmask('999.999.999-99')
})


function validaCPF(){
   const cpfFormatado= document.getElementById('cpf').value;

   const resultado = document.getElementById('resultado');

   const cpf = limpaFormatacao(cpfFormatado);
  
    if(cpf.length !== 11){
        mostraResultado(resultado,'CPF deve conter 11 digitos','erro');
        return;
    }
    if(verificaDigitosRepetidos(cpf)) {
        mostraResultado(resultado ,'CPF não pode conter repetição do mesmo dígito.','erro' );
        return
    }

    const digito1 = calcularDigitoVerificador(cpf,1);

    if(!digito1) {
        mostraResultado(resultado,`CPF Inválido - ${cpfFormatado}` ,'erro');
        return;
    }

    const digito2 = calcularDigitoVerificador(cpf,2)

    if(!digito2) {
        mostraResultado(resultado, `CPF Inválido - ${cpfFormatado}`,'erro');
        return;
    }

    mostraResultado(resultado ,`CPF Válido - ${cpfFormatado}`,'sucesso');

}

function calcularDigitoVerificador(cpf,posicao){
    const sequencia = cpf.slice(0, 8 + posicao).split('');

    let soma = 0;
    let multiplicador = 9 + posicao;

    for(const numero of sequencia){
        soma += multiplicador * Number(numero);
        multiplicador--;
    }

    const restoDivisao = (soma * 10) % 11;
    const digito = cpf.slice(8 + posicao, 9 + posicao);

    return restoDivisao == digito;

}

function limpaFormatacao(cpf){
    cpf = cpf.replace(/\D/g, '');

    return cpf
}


function mostraResultado(input,texto,status){


    const footer = input.parentElement;
    const span = footer.querySelector("span");

    span.innerText = texto;
    footer.className = status;
    
}

function verificaDigitosRepetidos(cpf){
    
    return cpf.split('').every((d) => d === cpf[0]);
}
