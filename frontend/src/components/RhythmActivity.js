/* eslint-disable react/prop-types */
import React from 'react';

import { Text } from '@chakra-ui/react';

export default function RhythmActivity({ activity }) {
  return <Text>{activity.name}</Text>;
}
