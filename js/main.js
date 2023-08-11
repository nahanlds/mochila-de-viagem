const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('item')) || []

itens.forEach( (element) => {
    criaElemento(element)
});


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome');
    const quantidade = document.getElementById('quantidade');

    const existe = itens.find(element => element.nome === nome.value)
    const novoItem = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    if(existe) {
        novoItem.id = existe.id
        atualizaElemento(novoItem)
        //atualiza no localStorage
        itens[itens.findIndex(element => element.id === existe.id)] = novoItem
    } else{
        novoItem.id = itens[itens.length -1] ? itens[itens.length -1].id +1 : 0;
        criaElemento(novoItem);
    
        //enviando para o localStorage
        itens.push(novoItem)
    }
    localStorage.setItem('item', JSON.stringify(itens))
    
    
    nome.value = '';
    quantidade.value ='';
})


function criaElemento(iten) {
    //criando uma lista
    // <li class="item"><strong>7</strong>Camisas</li>
    const li = document.createElement('li')
    li.classList.add('item');

    const strong = document.createElement('strong');
    strong.innerHTML = iten.quantidade;
    strong.dataset.id = iten.id;
    li.appendChild(strong);

    li.innerHTML += iten.nome;


    li.appendChild(btnDeletar(iten.id))
    lista.appendChild(li);
}


//atualiza na tela
function atualizaElemento(iten){
    document.querySelector("[data-id='"+iten.id+"']").innerHTML = iten.quantidade;
}

function btnDeletar(id){
    const btn = document.createElement('button')
    btn.innerText = 'x'
    btn.addEventListener('click', function() {
        deletaElemento(this.parentNode, id);
    })

    return btn
}

function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(element => element.id === id), 1);
    localStorage.setItem('item', JSON.stringify(itens))
}