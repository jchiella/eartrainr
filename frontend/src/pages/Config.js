import React, { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import {
  Text,
  Flex,
  Heading,
  Select,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Spinner,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react';

import ChordGroupInput from '../components/ChordGroupInput';
import IntervalGroupInput from '../components/IntervalGroupInput';
import RhythmGroupInput from '../components/RhythmGroupInput';

export default function Config() {
  const { id } = useParams();
  const history = useHistory();

  const [activity, setActivity] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3003/activity/${id}`)
      .then((res) => res.json())
      .then((activity) => {
        setActivity(activity);
        setGroups(activity.groups.map((group) => ({ ...group, hidden: true })));
      });
  }, [id]);

  const updateConfig = () => {
    const properGroups = groups.map((group) => {
      const newGroup = Object.assign({}, group);
      delete newGroup.hidden;
      return newGroup;
    });
    fetch(`http://localhost:3003/activity/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...activity, groups: properGroups }),
    }).then(() => history.push(`/${id}`));
  };

  return activity === null ? (
    <Spinner />
  ) : (
    <Flex
      m="auto"
      w="70ch"
      h="100vh"
      direction="column"
      justify="center"
      align="center"
    >
      <Heading size="2xl">Activity Options</Heading>
      <Text m="1">Configure your activity here.</Text>
      <Input
        m="2"
        placeholder="Activity Name"
        value={activity.name}
        onChange={(e) => setActivity({ ...activity, name: e.target.value })}
      />
      <Select
        m="2"
        placeholder="Activity Type"
        value={activity.type}
        onChange={(e) => setActivity({ ...activity, type: e.target.value })}
      >
        <option value="chord">Chord</option>
        <option value="interval">Interval</option>
        <option value="rhythm">Rhythm</option>
      </Select>
      <NumberInput
        m="2"
        w="100%"
        min={1}
        max={20}
        value={activity.count !== 0 ? activity.count : ''}
        onChange={(str) =>
          setActivity({ ...activity, count: str.length ? parseInt(str) : 0 })
        }
      >
        <NumberInputField placeholder="Number of Questions per Group" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">Is the activity cumulative?</FormLabel>
        <Switch
          value={activity.cumulative}
          onChange={(e) =>
            setActivity({ ...activity, cumulative: e.target.value })
          }
        />
      </FormControl>
      {activity.type === null ? (
        <Spinner />
      ) : activity.type === 'chord' ? (
        <ChordGroupInput groups={groups} setGroups={setGroups} />
      ) : activity.type === 'interval' ? (
        <IntervalGroupInput />
      ) : activity.type === 'rhythm' ? (
        <RhythmGroupInput />
      ) : null}
      <Button colorScheme="blue" m="2" onClick={updateConfig}>
        Save Options
      </Button>
    </Flex>
  );
}
