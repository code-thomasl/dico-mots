import React from 'react';
import axios from 'axios';
import JResults from './JResults';
import { Form, Label, Input, Button, FormGroup } from 'reactstrap';

const initialState = {
    //value: '',
    valueError: '',
    answer: ''
};

export default class WordFormB extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        value: '',
        valueError: '', 
        answer: '',
        history: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    onAddItem = () => {
        this.setState(state => {
            const history = state.history.concat(state.value);
        return {
            history,
            value: '',
        };
        });
    };


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    validate = () => {
        let valueError = '';

        if(!this.state.value.match('^(\w*)')) {
            valueError = 'Invalid input, please put only one word without special characters'
        }

        if(valueError) {
            this.setState({valueError});
            return false;
        }

        return true;
    };

    handleSubmit(event) {
        // testing purpose only
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        const isValid = this.validate();

        if(isValid) {
            console.log(this.state)
            // clear form
            this.setState(initialState);
        }

        //this.setState({history : this.state.value});
        //this.onAddItem();
        //console.log(this.state);

        var self = this;
        axios.post('http://localhost:5000/sendform', this.state.value, {headers: { 'Content-Type': 'text/plain' }})
        .then(function(response){
            console.log('---')
            console.log(response);

            self.setState({ answer: response.data });
            console.log('---')
            //Perform action based on response
        })
        .catch(function(error){
            console.log(error);
            //Perform action based on error
        });
    }

    //@TODO Input random word into form field
    handleRandomize = (event) => {
        event.preventDefault();
        axios.get('http://localhost:5000/randomize')
        .then((response) => {
            const value = response.data;
            console.log('---')
            console.log(response.data);

            //this.setState({ value });
            this.setState({value: response.data});
            
            //self.setState({ value: response.data });
            //Perform action based on response
        })
        .catch((error) => {
            console.log(error);
            console.log('dommage');
            //Perform action based on error
        });
    }

    updateInput = (word) => {
        let value = word;
        console.log(value);
        this.setState({value : "third"});
    }

render() {
    return (
    <>
        <Form onSubmit={this.handleSubmit}>
        <FormGroup>
            <Label>Donner un mot:</Label>
            <Input type="text" value={this.state.value} onChange={this.handleChange} required />
            <div style={{color: "red"}}>
                {this.state.valueError}
            </div>
        </FormGroup>
        <FormGroup>
            <Button type="button" onClick={this.handleRandomize} value="Randomize" color="info"><i className="fas fa-random"></i>Randomize</Button>
            <Button type="submit" value="Submit" color="dark">Submit</Button>
        </FormGroup>
        </Form>
        <JResults word={this.state.value} definition={this.state.answer} />
    </>
    );
    }
}