import React from 'react';

import { Button, Message } from 'rbx';

import firebase from 'firebase';

const Welcome = ({ user }) => (
  <Message color="light">
    <Message.Header>
      Welcome, {user.displayName} &nbsp;&nbsp;
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

export default Welcome;