const Login = () => {
    return ( 
        <div className="Login">
            <div class="form-container">
                <form action="" class="styled-form">
                    <input type="text" name="playerName" id="playerName" />
                    <label for="playerName">Name:</label>
                    <input type="text" name="password" id="password" />
                    <label for="password">Password:</label>
                </form>
            </div>
        </div>
     );
}
 
export default Login;