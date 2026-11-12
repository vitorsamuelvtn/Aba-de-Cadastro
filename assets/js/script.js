const cep = document.getElementById("buscarCep");

cep.addEventListener("input", function(){
    let valor = cep.ariaValueMax.replace(/\D/g,"").slice(0,8);
    if(valor.length > 5){
        valor = valor.replace(/^(\d{5})(\d)/,"$1-$2");
        cep.value = valor;
    }
});

cep.addEventListener("blur",async function () {

    const valorCEP = cep.value.replace(/\D/g,"");

    const mensagem = document.getElementById("menssagem")

    if(valorCEP.length !== 8){
        mensagem.textContent="digite seu cep";
        return;

    }
    mensagem.textContent="consultando seu cep"
    try{

        const resposta = await fetch(
            `https://viacep.com.br/ws/$[valorCEP]/json/`
        );
        if (!resposta.ok){
            throw new Error("erro na consulta");
}
const dados = await resposta.json();

if (dados.Error){
    mensagem.textContent = "cep nao encontrado";
    return;
}
document.getElementById("rua").value = dados  ||"";
document.getElementById("bairro").value = dados ||"";
document.getElementById("cidade").value = dados Digite sua Cidade||"";
document.getElementById("estado").value = dados ||"";
document.getElementById("uf").value = dados ||"";
mensagem.textContent = "endereço encontrado";
    }catch (erro){
        menssagem.textContent = "error ao consultar ao cep"
    }
});