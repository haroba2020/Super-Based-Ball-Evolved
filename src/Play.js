import { Link } from 'react-router-dom'

const Play = () => {
    return ( 
        <div className="play">
            <div class="flex-parent-player">
                <div class="flex-player gameFinal">
                    <h1 class="gameFinal play1Stat d-none">WIN</h1>
                </div>
                <div class="text-center white-space">
                    <Link to="/home" className='title'>Exit</Link>
                </div>
                <div class="flex-player">
                    <h1 class="gameFinal play2Stat d-none">LOSE</h1>
                </div>
            </div>

            <div class="flex-parent-player pt-5">
                <div class="flex-player">

                </div>
                <div class="white-space"></div>
                <div class="flex-player">

                </div>
            </div>
            <div class="text-center score">
                <h1 class="score">0</h1>
            </div>
        </div>
     );
}
 
export default Play;