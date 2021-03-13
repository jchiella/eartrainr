import React from 'react';

import { Container, Heading, Button, Flex, Text } from '@chakra-ui/react';

export default function Home() {
  const createActivity = () => {
    alert('Hiya!');
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
