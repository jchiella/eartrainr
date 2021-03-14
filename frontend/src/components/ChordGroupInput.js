/* eslint-disable react/prop-types */
import React from 'react';

import {
  Flex,
  Heading,
  ListItem,
  List,
  ListIcon,
  SimpleGrid,
  Editable,
  EditableInput,
  EditablePreview,
  Checkbox,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons';

export default function ChordGroupInput({ groups, setGroups }) {
  const chordOptions = [
    'C',
    'Cm',
    'Cdim',
    'Caug',
    'C7',
    'CMaj7',
    'CmM7',
    'Cm7',
    'Cm7(b5)',
    'CMaj7(#5)',
    'Csus4',
  ];

  const addGroup = (e) => {
    e.preventDefault();
    setGroups([
      ...groups,
      {
        name: '',
        values: [],
        hidden: false,
      },
    ]);
  };

  return (
    <Flex
      direction="column"
      w="100%"
      border="1px"
      borderColor="blue.100"
      borderRadius="md"
      m="2"
      p="2"
      maxH="lg"
      overflow="scroll"
    >
      <Heading size="sm" textAlign="center">
        Configure Groups
      </Heading>
      <Text>
        The chord examples shown below use C as a root, but the activity will
        use chords from all keys.
      </Text>
      <List>
        {console.log(JSON.stringify(groups)) ||
          groups.map((group, i) => (
            <ListItem key={i}>
              <Flex align="center">
                <ListIcon
                  cursor="pointer"
                  as={group.hidden ? AddIcon : MinusIcon}
                  onClick={() =>
                    setGroups(
                      groups.map((g, j) =>
                        i === j ? { ...group, hidden: !group.hidden } : g
                      )
                    )
                  }
                />
                <Editable
                  value={group.name}
                  defaultValue="New Group"
                  placeholder="New Group"
                  w="100%"
                  onChange={(val) =>
                    setGroups(
                      groups.map((g, j) =>
                        i === j ? { ...group, name: val } : g
                      )
                    )
                  }
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <DeleteIcon
                  cursor="pointer"
                  alignSelf="flex-end"
                  onClick={() =>
                    setGroups(groups.filter((_, idx) => i !== idx))
                  }
                />
              </Flex>

              {!group.hidden && (
                <SimpleGrid columns={3}>
                  {chordOptions.map((option, j) => (
                    <Checkbox
                      isChecked={group.values.includes(option)}
                      onChange={(e) =>
                        setGroups(
                          groups.map((g, k) =>
                            k === i
                              ? {
                                  ...group,
                                  values: e.target.checked
                                    ? [...group.values, option]
                                    : group.values.filter(
                                        (gr) => gr !== option
                                      ),
                                }
                              : g
                          )
                        )
                      }
                      key={j}
                    >
                      {option}
                    </Checkbox>
                  ))}
                </SimpleGrid>
              )}
            </ListItem>
          ))}
      </List>

      <IconButton
        aria-label="Add group"
        icon={<AddIcon />}
        colorScheme="blue"
        onClick={addGroup}
        w="fit-content"
        mt="5"
        alignSelf="flex-end"
      />
    </Flex>
  );
}
