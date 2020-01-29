import React from 'react';
import axios from 'axios';
import JResults from './JResults';
import { Form, Label, Input, Button, FormGroup, Spinner } from 'reactstrap';
import words from '../controller/words.json';
import { trackPromise } from 'react-promise-tracker';
import { withTranslation } from 'react-i18next';



const initialState = {
    //value: '',
    valueError: '',
    answer: ''
};

class WordFormB extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        value: '',
        valueError: '', 
        answer: '',
        history: [],
        suggestions: [],
        text: '',
        loading: false
    };

    this.items = words;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    onTextChanged = (event) => {
        this.setState({value: event.target.value});
        console.log(event.target.value);

        const value = event.target.value;
        let suggestions = [];
        if(value.length > 0) {
                const regex = new RegExp(`^${value}`, 'i');
                suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelected (value) 
    {
        this.setState(() =>({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions() {
        const { suggestions } = this.state;
        if(suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }

    renderLoading() {
        if(this.state.answer != null) {
            return null;
        }
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
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
        console.log(event.target.value);
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
        trackPromise(
        axios.post('/sendform', this.state.text, {headers: { 'Content-Type': 'text/plain' }})
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
        }));
    }

    //@TODO Input random word into form field
    handleRandomize = (event) => {
        event.preventDefault();
        axios.get('/randomize')
        .then((response) => {
            const text = response.data;
            console.log('---')
            console.log(response);

            //this.setState({ value });
            this.setState({text: response.data});
            
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
    const { text } = this.state;
    const { t } = this.props;



    return (
    <>
        <Form onSubmit={this.handleSubmit} className="auto-form-wrapper">
        <FormGroup className="auto-form">
            <Label>{t('GiveWord.1')}</Label>
            <Input type="text" value={text} onChange={this.onTextChanged} required />
            {this.renderSuggestions()}
            <div style={{color: "red"}}>
                {this.state.valueError}
            </div>
        </FormGroup>
        <FormGroup>
            <Button type="button" onClick={this.handleRandomize} value="Randomize" color="info"><i className="fas fa-random"></i>{t('Randomize.1')}</Button>
            <Button type="submit" value="Submit" color="dark">{t('Submit.1')}</Button>
            {this.renderLoading()}
        </FormGroup>
        </Form>
        <JResults /*word={this.state.value}*/ definition={this.state.answer} />
    </>
    );
    }
}

export default withTranslation()(WordFormB)