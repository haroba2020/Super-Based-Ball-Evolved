import { apiURL } from "./constants";
import { Redirect } from 'react-router-dom'
import { useState } from "react";

const Login = () => {
    const [redirect, setRedirect] = useState(false)
    
    async function fetching(e){
        e.preventDefault();
        console.log(e)
        console.log('function run')
        const form = document.querySelector('.styled-form')
      
        const email = form.email.value
        const password = form.password.value
        try {
          console.log('try trying')
          console.log(JSON.stringify({email,password}))
          //sender data som lager bruker
          const res = await fetch(`${apiURL}/@me/login`,{
            method: 'post',
            body: JSON.stringify({email,password}),
            headers: {'Content-Type': 'application/json'}
          })
          //venter på user data
          const data = await res.json()
          console.log(data)
          localStorage.setItem('user', JSON.stringify(data));
          setRedirect(true)

          // Error handler
          if(data.errors){
            console.log(data.errors)
          }
      
        } catch (err) {
          console.log(err)
        }
      }
    return ( 
        <div className="Login">
            <div class="form-container">
                <form action="" className="styled-form">
                    <input type="text" name="email" id="email" />
                    <label htmlFor="email">Email:</label>
                    <input type="password" name="password" id="password" />
                    <label htmlFor="password">Password:</label>
                    <button onClick={fetching}>Submit</button>
                </form>
            </div>
            {redirect&&<Redirect to='/'/>}
        </div>
     );
}
 
export default Login;