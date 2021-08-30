import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import '../App.css';
import { ILogin, IRegister } from '../interface/Login';
import PropTypes from 'prop-types';

const Register: FC = () => {
    const [Username, setUsername] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [Email, setEmail] = useState<string>("")
    const [Fullname, setFullname] = useState<string>("")
    const [Register, setRegister] = useState<IRegister[]>([]);

    let history = useHistory();

    const handleClick = (event: ChangeEvent<HTMLInputElement>): void => {
        // event.preventDefault();
        // // const newValue = event.current.target.value
        if (event.target.name == "user") {
            setUsername(event.target.value)
            event.preventDefault();

        }
        else if (event.target.name == "password") {
            setPassword(event.target.value)
            event.preventDefault();

        }
        else if (event.target.name == "email") {
            setEmail(event.target.value)
            event.preventDefault();

        }
        else if (event.target.name == "fullname") {
            setFullname(event.target.value)
            event.preventDefault();

        }
    }

    async function RegisterUser(newData: { username: string, password: string, email: string, fullname: string }) {

        return fetch('https://localhost:44369/api/Account/Register', {
            method: 'POST',
            headers: {
                // "Authorization" : `Bearer + ${tokens}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(data => data.json())

    }

    const addLoginData = async () => {
        const token = await RegisterUser({ username: Username, password: Password, email: Email, fullname: Fullname })
        setRegister([...Register, token]);
        console.log(token);
    }

    useEffect(() => {

    }, [])


    return (

        <div>

            <div className="login">
                <div className="login__container">
                    <h1>Login</h1>
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <h5>Username</h5>
                        <input type="text" name="user" placeholder="Enter UserName" onChange={handleClick} />

                        <h5>Password</h5>
                        <input type="password" name="pass" placeholder="Enter Password" onChange={handleClick} />

                        <h5>Email</h5>
                        <input type="text" name="email" placeholder="Enter Email" onChange={handleClick} />
                        <h5>FullName</h5>
                        <input type="text" name="fullname" placeholder="Enter Fullname" onChange={handleClick} />

                        <div>
                            <button className="login__signInButton" onClick={addLoginData} >Submit</button>
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


export default Register;
