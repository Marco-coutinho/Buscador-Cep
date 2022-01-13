import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";

import api from './services/api'


function App() {

  const [input, setInput] = useState ('')
  const[cep, setCep] = useState ({});


async function handleSearch(){
  if(input === ''){
    alert("Digite um cep para efetuar a pesquisa")
    return;
  }

  try{
    const response = await api.get(`${input}/json`);
    setCep(response.data)
    setInput("");
  }catch{
   alert("Erro ao Buscar");
   setInput("")
  }
}


  return (
    <div className='container'>
     <h1 className='title'> Buscador De Cep </h1>

   <div className="containerInput">
     <input 
     type='text'
     placeholder='Digite seu cep..'
     value={input}
     onChange={(e) => setInput(e.target.value)}
     />
     <button className='buttonSearch' onClick={handleSearch}>
        <FiSearch size={25} color='' />
     </button>
    </div>

    {Object.keys(cep).length > 0 &&(

<main className='main'>
<h2> Cep: {cep.cep} </h2>

<span> {cep.logradouro} </span>
<span> Complemento: {cep.complemento } </span>
<span> Bairro: {cep.bairro} </span>
<span> {cep.localidade} - {cep.uf} </span>
<span> DDD: {cep.ddd} </span>

</main>

    ) }
    
    </div>
  );
}

export default App;
