import { IconButton } from '@chakra-ui/button';
import { Flex, Heading, ListItem, List, ListIcon } from '@chakra-ui/layout';
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons';
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
    >
      <Heading size="sm" textAlign="center">
        Configure Groups
      </Heading>
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
                <Flex direction="column">
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
                </Flex>
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
