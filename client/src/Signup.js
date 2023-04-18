const Signup = () => {
    return ( 
        <div className="signup">
            <div class="form-container">
                <form action="" class="styled-form">
                    <input type="text" name="email" id="email" />
                    <label for="email">Email:</label>
                    <input type="text" name="playerName" id="playerName" />
                    <label for="playerName">Name:</label>
                    <input type="text" name="password" id="password" />
                    <label for="password">Password:</label>
                </form>
            </div>
        </div>
     );
}
 
export default Signup;