import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import StaticImage from './images/kanye_large.png';
import MeltingImage from './images/kanye_melting.gif';
import axios from "axios";

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

        axios.post('http://0.0.0.0:8081', 'input='+this.state.songInput)
            .then(res => {
                this.setState({
                    songOutput: res.data,
                    backgroundImage: StaticImage,
                    showOutput: true
                })

                console.log(`song is ${this.state.songOutput}`);

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

                <div className="row justify-content-center">
                    <div className="col-lg-12 text-center">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <input type="text"
                                       name="lyricInput"
                                       value={this.state.songInput}
                                       className="text_input text"
                                       style={{color: '#7A7A7A'}}
                                       onChange={this.handleChange}/>
                            </label>
                            {this.state.showOutput &&
                            <div className="text" style={{color: '#7A7A7A'}}>
                                {this.state.songOutput}
                            </div>}
                        </form>
                    </div>
                </div>
            </div>


        )
    }
};

export default App;
