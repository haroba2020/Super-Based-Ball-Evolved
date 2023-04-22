import { apiURL } from "./constants";

const Signup = () => {
    async function fetching(e){
        e.preventDefault();
        console.log(e)
        console.log('function run')
        const form = document.querySelector('.styled-form')
      
        const email = form.email.value
        const password = form.password.value
        const playerName = form.playerName.value
        try {
          console.log('try trying')
          //sender data som lager bruker
          const res = await fetch(`${apiURL}/@me`,{
            method: 'post',
            query: JSON.stringify({email,password,playerName}),
            headers: {'Content-Type': 'application/json'}
          })
          //venter på user data
          const data = await res.json()
          console.log(data)
      
          // Error handler
          if(data.errors){
            console.log(data.errors)
          }
      
        } catch (err) {
          console.log(err)
        }
      }
    
    return ( 
        <div className="signup">
            <div className="form-container">
                <form action="" className="styled-form">
                    <input type="text" name="email" id="email" />
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="playerName" id="playerName" />
                    <label htmlFor="playerName">Name:</label>
                    <input type="text" name="password" id="password" />
                    <label htmlFor="password">Password:</label>
                    <button onClick={fetching}>Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default Signup;