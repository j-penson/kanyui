import React from 'react';
import axios from 'axios';
import Media from 'react-bootstrap/Media';

import MeltingImage from '../images/kanye_melting.gif';


class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {songInput: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({songInput: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        console.log(this.props.loadingBackground);

        console.log(`getting song ${this.state.songInput}`)

        axios.post('http://localhost:8081', {input: this.state.songInput}, {headers: {'Content-Type': 'application/json'}})
            .then(res => {

                this.setState({songOutput: res.data})

                console.log(`song is ${this.state.songOutput}`);
                alert('Got me lyrics: ' + this.state.songOutput);
            })
    }


    render() {

        const divStyle = {
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            backgroundImage: `url(${MeltingImage})`
        };

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.state.songInput} onChange={this.handleChange}/>
                </label>
                <Media style={divStyle}>
                    {this.state.songOutput}
                </Media>
            </form>

        );
    }
}

export default InputForm;