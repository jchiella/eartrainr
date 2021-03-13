import React from 'react';

import { useParams } from 'react-router-dom';

import { Text } from '@chakra-ui/react';

export default function Activity() {
  const { id } = useParams();

  return <Text>Hi there at {id}!</Text>;
}
