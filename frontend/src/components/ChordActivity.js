/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@chakra-ui/react';

import { Frequency, now, PolySynth } from 'tone';

export default function ChordActivity({ activity }) {
  const qualities = {
    C: [0, 4, 7],
    Cm: [0, 3, 7],
    Cdim: [0, 3, 6],
    Caug: [0, 4, 8],
    C7: [0, 4, 7, 10],
    CMaj7: [0, 4, 7, 11],
    CmM7: [0, 3, 7, 11],
    Cm7: [0, 3, 7, 10],
    'Cm7(b5)': [0, 3, 6, 10],
    'CMaj7(#5)': [0, 4, 8, 11],
    Csus4: [0, 5, 7],
  };

  const synth = useRef(null);

  useEffect(() => {
    synth.current = new PolySynth().toDestination();
  }, []);

  const randomChoice = (list) => list[Math.floor(Math.random() * list.length)];

  const createChord = (root, octave, quality) =>
    Frequency(`${root}${octave}`).harmonize(qualities[quality]);

  const playChord = (chord, time) => {
    chord.forEach((note, index) =>
      synth.current.triggerAttack(note, time + index)
    );
    synth.current.triggerRelease(chord, time + chord.length + 1);
    return time + chord.length + 1;
  };

  const playNext = () => {
    playChord(sequence[index], now());
    setIndex(index + 1);
  };

  const createChordSequence = () => {
    const sequence = [];
    activity.groups.forEach((group) => {
      for (let i = 0; i < activity.count; i++) {
        const root = randomChoice(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
        const octave = randomChoice([3, 4]);
        const quality = randomChoice(group.values);
        sequence.push(createChord(root, octave, quality));
      }
    });
    return sequence;
  };

  const sequence = createChordSequence();
  const [index, setIndex] = useState(0);

  return <Button onClick={playNext}>{activity.name}</Button>;
}
