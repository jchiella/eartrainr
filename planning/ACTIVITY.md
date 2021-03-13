# What exactly is an activity?

An activity is a single "thing" that can be created inside Eartrainr.

There are three types of activity:

- Chord activities
- Interval activities
- Rhythm activities

All activities have an almost identical schema (the only exception is the "length" property in rhythm groups)

## Chord activities

A chord activity has the following properties:

- \_id: the activity id (used in the URL for sharing)
- name: the name of the activity
- type: the value 'chord' (as opposed to 'interval' or 'rhythm')
- groups: an array of groups of chords
  - Each group has the props:
    - name: the name of the group
    - values: a list of chords allowed in that group by quality
- count: The number of chords to be picked from each group before moving on to the next one
- cumulative: whether or not the activity is cumulative. Cumulative activities keep chords from the previous group when moving on to the next one

## Interval activities

An interval activity has the following properties:

- \_id: the activity id (used in the URL for sharing)
- name: the name of the activity
- type: the value 'interval' (as opposed to 'chord' or 'rhythm')
- groups: an array of groups of intervals
  - Each group has the props:
    - name: the name of the group
    - values: a list of intervals allowed in that group by quality
- count: The number of intervals to be picked from each group before moving on to the next one
- cumulative: whether or not the activity is cumulative. Cumulative activities keep intervals from the previous group when moving on to the next one

## Rhythm activities

A rhythm activity has the following properties:

- \_id: the activity id (used in the URL for sharing)
- name: the name of the activity
- type: the value 'interval' (as opposed to 'chord' or 'rhythm')
- groups: an array of groups of rhythms
  - Each group has the props:
    - name: the name of the group
    - values: a list of note durations allowed in the group
    - length: the number of bars that the rhythms in this group will be
- count: The number of rhythms to be picked from each group before moving on to the next one
- cumulative: whether or not the activity is cumulative. Cumulative activities keep rhythms from the previous group when moving on to the next one
