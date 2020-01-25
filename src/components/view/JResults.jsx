import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const JResults = ({ word, definition }) => {

    return (
        <div>
            <Card className="word-result-card">
                <CardBody>
                    <CardTitle><h1>{word}</h1></CardTitle>
                    <CardText>{ ReactHtmlParser(definition) }</CardText>
                    {/*<CardText>{definition}</CardText>*/}
                    <Button>+</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default JResults;