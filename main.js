'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

    

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)


// const openModalPesquisa = () => document.getElementById('modal-pesquisa').classList.add('active')

// const closeModalPesquisa = () => document.getElementById('modal-pesquisa').classList.remove('active')  

// document.getElementById('pesquisarCliente').addEventListener('click', openModalPesquisa)

// document.getElementById('modalClosePesquisa').addEventListener('click', closeModalPesquisa)


const url = 'http://127.0.0.1:5000';

const getClientes = async () => {             
  let url = 'http:127.0.0.1:5000/clientes';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {           
        data.clientes.forEach(cliente => inserirClienteDOM(cliente.nome, cliente.quantidade, cliente.valor, cliente.data))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

getClientes()
  
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}  

const deletarCliente = (cliente) => {        

  let route = `${url}/deletar_cliente?nome=${cliente}`; 
  
  console.log("Route: ", route)
  
  fetch(route, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

const removerClienteDOM = () => {    
  let closes = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < closes.length; i++) {
    closes[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const cliente = div.getElementsByTagName('td')[0].innerHTML        
      if (confirm("Você tem certeza que deseja excluir esse registro?")) {
        div.remove()
        deletarCliente(cliente)          
      }
    }
  }
}

removerClienteDOM();

const criarCliente = async (inputNome, inputEmail, inputCelular, inputCidade) => {
  const formData = new FormData();
  formData.append('nome', inputNome);
  formData.append('email', inputEmail);
  formData.append('celular', inputCelular);
  formData.append('cidade', inputCidade);                 

  let route = `${url}/cadastrar_cliente`;

  fetch(route, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

const inserirClienteDOM = (inputNome, inputEmail, inputCelular, inputCidade) => {

  var dados = [inputNome, inputEmail, inputCelular, inputCidade];

  var table = document.getElementById('myTable');

  var row = table.insertRow();  

  for (var i = 0; i < dados.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = dados[i];
  }    

  insertButton(row.insertCell(-1));

  document.getElementById("clienteNome").value = "";
  document.getElementById("clienteEmail").value = "";
  document.getElementById("clienteCelular").value = "";
  document.getElementById("clienteCidade").value = ""; 

  // deletarCliente()  ;
  removerClienteDOM();

  closeModal() 
}

const enviarCliente = () => {   
  
  let inputNome = document.getElementById("clienteNome").value;
  let inputEmail = document.getElementById("clienteEmail").value;
  let inputCelular = document.getElementById("clienteCelular").value;
  let inputCidade = document.getElementById("clienteCidade").value;     

  if (inputNome === '') {
    alert("Escreva o nome do cliente");
  } 

  if (inputEmail === ''){ 
    alert("Escreva o email do cliente");
    
  } 
  
  if (inputCelular === ''){ 
    alert("Escreva o celular do cliente");
    
  } 
  
  if (inputCidade === ''){
    alert("Escreva a cidade do cliente");
    
  } else {

      criarCliente(inputNome, inputEmail, inputCelular, inputCidade)

      inserirClienteDOM(inputNome, inputEmail, inputCelular, inputCidade)

      
  }

}

// const getCliente = async (cliente) => {
//   let url = `http://localhost:5000/buscar_cliente_por_nome?nome=${cliente}`;
//   fetch(url, {
//     method: 'get',
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.cliente) {
//         inserirClienteDOM(data.nome, data.email, data.celular, data.cidade);
//       } else {
//         alert("Nenhum cliente encontrado");
//       }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }

// const pesquisarCliente = () => {
//   let inputNome = document.getElementById("clienteNome").value;
//   closeModal() 
//   console.log(clienteNome);
//   if (inputNome === ''){ 
//     alert("Escreva o nome do cliente");
//   } else {
//     var rowCount = myTable.rows.length;
//     for (var i = rowCount - 1; i > 0; i--) {
//       myTable.deleteRow(i);
//     }
//     getCliente(inputNome);
//   }
// }
