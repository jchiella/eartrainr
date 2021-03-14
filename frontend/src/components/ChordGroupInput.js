import { Button, IconButton } from '@chakra-ui/button';
import {
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/layout';
import { AddIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/editable';
import { Checkbox } from '@chakra-ui/checkbox';

export default function ChordGroupInput() {
  const [groups, setGroups] = useState([]);

  const chordOptions = [
    'Major Triad',
    'Minor Triad',
    'Augmented Triad',
    'Diminished Triad',
  ];

  /*
  each group object is of the form: 
  {
    name: Name of group
    values: [ list of chord qualities ]
  }
  */

  const addGroup = (e) => {
    e.preventDefault();
    setGroups([
      ...groups,
      {
        name: '',
        values: [],
      },
    ]);
  };

  return (
    <Box
      w="100%"
      border="1px"
      borderColor="blue.100"
      borderRadius="md"
      m="2"
      p="2"
    >
      <Heading size="sm" textAlign="center">
        Configure Groups
      </Heading>
      <IconButton
        aria-label="Add group"
        icon={<AddIcon />}
        onClick={addGroup}
      />
      <UnorderedList>
        {console.log(JSON.stringify(groups)) ||
          groups.map((group, i) => (
            <ListItem key={i}>
              <Editable
                value={group.name}
                defaultValue="New Group"
                placeholder="New Group"
                onChange={(val) =>
                  setGroups(
                    groups.map((g, j) =>
                      i === j ? { name: val, values: group.values } : g
                    )
                  )
                }
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Flex direction="column">
                {chordOptions.map((option, i) => (
                  <Checkbox
                    onChange={() =>
                      setGroups(
                        groups.map((g, j) =>
                          i === j
                            ? {
                                name: group.name,
                                values: [...group.values, option],
                              }
                            : g
                        )
                      )
                    }
                    key={i}
                  >
                    {option}
                  </Checkbox>
                ))}
              </Flex>
            </ListItem>
          ))}
      </UnorderedList>
    </Box>
  );
}
