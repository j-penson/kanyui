import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import StaticImage from './images/kanye_large.png';
import MeltingImage from './images/kanye_melting.gif';
import axios from "axios";
import {RemoveScrollBar} from 'react-remove-scroll-bar';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        backgroundImage: StaticImage,
        showOutput: false,
        songInput: '',
        songOutput: ''
    }


    handleChange = event => {
        this.setState({songInput: event.target.value});
    }

    handleSubmit = event => {

        this.setState({backgroundImage: MeltingImage});

        event.preventDefault();

        console.log(`getting song ${this.state.songInput}`)

        let modelURL = 'https://europe-west2-kanyai.cloudfunctions.net/kanyai/get_lyrics '

        axios.post(modelURL, 'input='+this.state.songInput)
            .then(res => {
                this.setState({
                    songOutput: res.data,
                    backgroundImage: StaticImage,
                    showOutput: true
                })

                console.log(`Lyrics generated: ${this.state.songOutput}`);

            }, (error) => {
                console.log(error);
            });


    }

    render() {

        const divStyle = {
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            backgroundImage: `url(${this.state.backgroundImage})`
        };

        return (
            <div className="App" style={divStyle}>

                <NavBar/>
                <RemoveScrollBar/>

                <div className="row justify-content-center">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <input type="text"
                                       name="lyricInput"
                                       value={this.state.songInput}
                                       className="text_input text"
                                       style={{color: '#7A7A7A', width:"80%"}}
                                       placeholder="Enter title"
                                       onChange={this.handleChange}/>
                            </label>
                            {this.state.showOutput &&
                            <div className="text" style={{color: '#7A7A7A'}}>
                                {this.state.songOutput}
                            </div>}
                        </form>
                    </div>
                  </div>


        )
    }
}

export default App;
