import React, { PropTypes } from 'react';

import { Panel, Image } from 'react-bootstrap';

const definedPerson = (person) => (
  <Panel style={{textAlign: 'center'}}>
    <Image src={person.avatar} rounded />
    <h6>{person.name}</h6>
  </Panel>
)

const undefinedPerson = () => (
  <Panel style={{textAlign: 'center'}}>
    <h6>No Person defined</h6>
  </Panel>
)

const Person = ({ person }) => person ? definedPerson(person) : undefinedPerson();

export default Person;

/*

{
  "name": "Earl Walker",
  "username": "Adelle_Sipes1",
  "email": "Jamey.Mann65@hotmail.com",
  "address": {
    "streetA": "Herzog Cliffs",
    "streetB": "076 Wilkinson Flats",
    "streetC": "66611 Gia Street Apt. 795",
    "streetD": "Apt. 119",
    "city": "Maciville",
    "state": "Nevada",
    "country": "Hungary",
    "zipcode": "92117",
    "geo": {
      "lat": "62.1739",
      "lng": "-31.9170"
    }
  },
  "phone": "(660) 086-2246 x5128",
  "website": "raymundo.org",
  "company": {
    "name": "Barton, Streich and Fay",
    "catchPhrase": "Vision-oriented motivating implementation",
    "bs": "scalable expedite solutions"
  },
  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/andrewofficer/128.jpg"
}

*/
