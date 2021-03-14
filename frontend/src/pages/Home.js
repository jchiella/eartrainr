import React from 'react';

import { Container, Heading, Button, Flex, Text } from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();

  const createActivity = () => {
    fetch(`http://localhost:3003/activity`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '',
        type: 'chord',
        count: 0,
        cumulative: false,
        groups: [],
      }),
    })
      .then((res) => res.json())
      .then(({ _id }) => history.push(`/config/${_id}`));
  };

  return (
    <Flex h="100vh" justify="center" align="center">
      <Container textAlign="center">
        <Heading size="4xl">Welcome to Eartrainr!</Heading>
        <Text m="5">
          Eartrainr is an easy way to create, share, and use simple, interactive
          ear training activities.
        </Text>
        <Button colorScheme="blue" onClick={createActivity}>
          Create an Activity
        </Button>
      </Container>
    </Flex>
  );
}
