import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



const WordForm = props => {
  const [word, setWord] = useState();

  const handleChange = e => {
    setWord(e.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(word);

    const data = new FormData(event.target);
    
    
    fetch('http://localhost:5000/sendform', {
      method: 'POST',
      body: data,
      headers: {"Content-Type": "application/text"}
    })
    .then(() => console.log(`Word Sent : ${word}`))
    .catch(err => {
      console.error(err);
    });
  }


  return (
    <>
    {/* <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="word">Entrer un mot</Label>
        <Input placeholder="Mot" bsSize="lg" value={word} onChange={e => setWord(e.target.value)} required />
      </FormGroup>
      <Button>Submit</Button>
  </Form> */}
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="word">Entrer un mot</Label>
        <Input placeholder="Mot" bsSize="lg" type="text" value={word} onChange={handleChange} required />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
    <form method="POST" action="http://localhost:5000/sendform">
      <input type="text" name="word" />
      <input type="submit" />
    </form>
    </>
  )
}

export default WordForm;