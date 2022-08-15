import trollFace from '../imgs/troll-face.png'

const Header = () => {
    return( 
        <header>
            <div className='container'>
                <div className='header--container'>
                    <h1 className='header--title'>Meme Maker</h1>
                    <img className='header--image' src={trollFace} alt='troll-face-icon'></img>
                </div>
            </div>
        </header>
    )
}

export default Header;