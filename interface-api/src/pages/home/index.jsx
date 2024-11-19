import { useState, useEffect, useRef } from 'react';
import './style.css';
import api from '../../services/api';

function Home() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputEmail = useRef()
  const inputAge = useRef()

  async function GetUsers() {
    const usersFromApi = await api.get('http://localhost:3000/user')
    setUsers(usersFromApi.data)

  };

  async function CreateUsers() {
    await api.post('http://localhost:3000/user',{
    email: inputEmail.current.value ,
    name: inputName.current.value,
    age: inputAge.current.value
    })
    GetUsers()
    

  }

  async function DeleteUsers(id){
    await api.delete(`http://localhost:3000/user/${id}`)

    GetUsers()
    
  }

  useEffect(() => {
    GetUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuarios</h1>
        <h2>Digite seu nome</h2>
        <input type="text" placeholder='Nome' ref={inputName} />
        <h2>Digite seu e-mail</h2>
        <input type='email' placeholder='E-mail' ref={inputEmail} />
        <h2>Digite sua idade</h2>
        <input type="number" placeholder='idade' ref={inputAge} />
        <button type='button' onClick={CreateUsers}>Cadastrar</button>
      </form>
      {users.map(user => (

        <div key={user.id} className='card'>
          <div>
            <p>Nome:{user.name}</p>
            <p>Idade: {user.age}</p>
            <p>Email: {user.email}</p>
          </div>
          <button onClick={()=>DeleteUsers(user.id)}>Excluir</button>
        </div>

      ))}

    </div>
  )
}

export default Home
