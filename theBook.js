// objeto comprador - a função constroi um comprador 
function comprador(){
    this.saldoBancario = 10000
    this.limiteDeCompra = 8500
    this.itensComprados = []
    this.comprar = (produto) => {

        this.itensComprados.push(produto.nome)
        this.saldoBancario -= produto.precoTotal
        console.log(this.saldoBancario)
        document.getElementById('saldoAtual').textContent = 'R$' + user.saldoBancario.toFixed(2)
        return this.saldoBancario 
    }

    
}

// É declarado o comprador = usuario 
let user = new comprador()


let bolsa = document.querySelector('.bolsa')
let usItens = user.itensComprados


// Controla as funcionalidades da bolsa que é onde fica os itens comprados 
bolsa.addEventListener('click',()=>{
    let janela =document.getElementById('janela')

    // verifica se a bolsa está aberta
    if(!janela.classList.contains('close')){
        janela.classList.add('close')
        let itens =document.querySelectorAll('.itensComprados')
        itens.forEach((elt)=>{
        elt.remove()
    })/*Verifica se a bolsa está vazia*/
    }else if(user.itensComprados.length > 0){
        janela.classList.remove('close')
        user.itensComprados.forEach((elt)=>{
        var li = document.createElement('li')
        li.classList.add('itensComprados')
        li.textContent = elt
        document.getElementById("itensComprados").appendChild(li)
    })
//Retorna mensagem de erro se a bolsa estiver vazia
}else{
    alert('Bolsa vazia')
}

})

// Atribui o saldo a atual na tela
document.getElementById('saldoAtual').textContent = 'R$' + user.saldoBancario.toFixed(2)

// função constutora de produto
function produto(nome, preco){
    this.nome = nome
    this.preco = preco
    const TAXA = 0.075*preco
    this.precoTotal = this.preco + TAXA
}

// produtos 
 let Galaxy = new produto('Galaxy',1200)
 let Iphone = new produto('Iphone', 4000)
 let Positivo = new produto('Positivo', 11000)
 let Xaiomi = new produto('Xaiomi', 900)


const produtos = [
 Galaxy,
 Iphone,
 Positivo,
 Xaiomi
]

// contador para os id's dos produtos
let num = 0
produtos.forEach((elt)=>{
    console.log(elt.nome)

    // cria as divs para os produtos
    var div = document.createElement('div')
    div.classList.add('produto')    
    div.setAttribute('id', `${num}`)  
    document.getElementById('list').appendChild(div)

    // cria a descrição dos produtos
    var p = document.createElement('p');
    var text = document.createTextNode(elt.nome +': $'+elt.precoTotal.toFixed(2));
    p.appendChild(text)
    document.getElementById(`${num}`).appendChild(p)
    
    // cria o botão de compra referente a cada produto
    var botao = document.createElement('button');
    botao.classList.add('comprar')
    // adiciona uma classe com o nome do produto para o botão
    botao.classList.add(elt.nome)
    var compra = document.createTextNode('COMPRAR');
    botao.appendChild(compra)
    document.getElementById(`${num}`).appendChild(botao)
    num +=1
   
});



let botao = document.querySelectorAll('.comprar')

//Adiciona evento a cada botão
for(let i = 0; i < botao.length; i++){
    botao[i].addEventListener('click', ()=>{

        let produto = botao[i].classList[1]
        produtos.forEach((elt)=>{
            // Verifica se o botão tem a classe com o nome de um dos produtos 
            if (elt.nome.toString() == produto){
                // Verifica se saldo do usuario é suficiente para a compra
                if(user.saldoBancario > elt.precoTotal){
                user.comprar(elt)
            }else{
                alert('O valor do produto excede seu saldo atual')
            }

            }
        }) 
    })
}


// Array de imagens
let slides = ['https://cdn.pixabay.com/photo/2019/12/27/01/47/samsung-4721544_960_720.jpg','https://cdn.pixabay.com/photo/2016/11/29/12/30/phone-1869510_960_720.jpg',"https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202_960_720.jpg"]


let imagemAtual = 0
let imagem = document.getElementById('slides') 
let next = document.getElementById('next')
let back = document.getElementById('back')


// Atribui a primeira imagem ao background da pagina
imagem.style.backgroundImage = "url("+`${slides[imagemAtual]}`+")";


//Adiciona a funçaõ de trocar a imagem ao botão next
next.addEventListener('click', ()=>{
    let imagemCss = imagem.style.backgroundImage.substring(5, imagem.style.backgroundImage.length-2);
    
    // verifica se a imagem atual é a ultima do array
    if(imagemCss == slides[slides.length - 1]){
        imagemAtual = 0
        setTimeout(()=>{
        imagem.style.backgroundImage = "url("+`${slides[imagemAtual]}`+")";
       
        },500)

    }else{
    imagemAtual += 1
    setTimeout(()=>{
    imagem.style.backgroundImage = "url("+`${slides[imagemAtual]}`+")";
    
    },500)
}
})


//Adiciona a funçaõ de trocar a imagem ao botão back
back.addEventListener('click', ()=>{
    let imagemCss = imagem.style.backgroundImage.substring(5, imagem.style.backgroundImage.length-2);
    
    // verifica se a imagem atual é a primeira do Array
    if(imagemCss == slides[0]){
        imagemAtual = slides.length - 1
        imagem.style.backgroundImage = "url("+`${slides[imagemAtual]}`+")";
    }else{
    imagemAtual -= 1
    imagem.style.backgroundImage = "url("+`${slides[imagemAtual]}`+")";
}
})