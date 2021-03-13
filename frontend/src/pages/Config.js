import React from 'react';

import { useParams } from 'react-router-dom';

import { Text } from '@chakra-ui/react';

export default function Config() {
  const { id } = useParams();
  return <Text>Hi there, configuring {id}!</Text>;
}
