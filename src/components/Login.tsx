import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import '../App.css';
import { ILogin, ISessionStorage,  } from '../interface/Login';

interface ChildProp {
  setToken: (userToken: {token:string, expiration: string}) => void

}

const Login: FC<ChildProp> = (props) => {

  

  const [Username, setUsername] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [Login, setLogin] = useState<ILogin[]>([]);
  // const [token, setToken] = useState<ISessionStorage[]>([]);

  let history = useHistory();

  // console.log(props.setToken({token:"Malaika",expiration: "dsfh"}))
  
  
  const handleClick = (event: ChangeEvent<HTMLInputElement>): void => {

    if (event.target.name == "user") {
      setUsername(event.target.value)
    } 
    else {
      setPassword(event.target.value)

    }
  }

  async function loginUser(newData : {username : string, password: string}) {

    return fetch('https://localhost:44369/api/Account/Login', {
      method: 'POST',
      headers: {
        // "Authorization" : `Bearer + ${tokens}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
      .then(data =>  data.json()
      )

     
      
      // .then(res => console.log(res))
      
    }

    


  const addLoginData = async() => {
    const token  = await loginUser({ username: Username, password: Password})
    // props.setToken(token);
    props.setToken(token);
    setLogin([...Login, token]);
    console.log(token );
    

    // if(!token){
    //   history.push("/login")
    // }
    // else{
    //   history.push("/register")
    // }
  }

  

 

  // var tokenString  = sessionStorage.getItem('token');
  // const userToken = JSON.parse(tokenString || '{}');
  // console.log(userToken);

  // sessionStorage.setItem('token', JSON.stringify(sessionStorage.getItem('token')))

  return (

    <div>

      <div className="login">
        <div className="login__container">
          <h1>Login</h1>
          <form onSubmit={(e) =>{e.preventDefault()}}>
            <h5>Username</h5>
            <input type="text" name="user" placeholder="Enter UserName" onChange={handleClick} />

            <h5>Password</h5>
            <input type="password" name="pass" placeholder="Enter Password" onChange={handleClick} />

            <div>
              <button className="login__signInButton" onClick={addLoginData}>Submit</button>
            </div>
          </form>
          <div>
            <button type="button" className="login__signInButton" onClick={() => { history.push("/register") }}  >Don't have account Register</button>

          </div>

        </div>
      </div>
    </div>
  )
}


export default Login;
