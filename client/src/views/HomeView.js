import '../components/style/App.css'
import bun from '../components/style/img/bun.jpg'

const HomeView = () => {

    return (
        <div className='HomeView'>
            <header className='HomeView-header'>
                <img src={bun} className='App-logo' alt='logo' />
                {/* <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a> */}
            </header>
        </div>
    )
}
export default HomeView