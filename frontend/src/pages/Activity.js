import React, { useEffect, useState } from 'react';

import { Spinner } from '@chakra-ui/react';

import { useParams } from 'react-router-dom';

import ChordActivity from '../components/ChordActivity';
import IntervalActivity from '../components/IntervalActivity';
import RhythmActivity from '../components/RhythmActivity';

export default function Activity() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3003/activity/${id}`)
      .then((res) => res.json())
      .then(setActivity);
  }, [id]);

  if (activity === null) {
    return <Spinner />;
  }

  if (activity.type === 'chord') {
    return <ChordActivity activity={activity} />;
  }

  if (activity.type === 'interval') {
    return <IntervalActivity activity={activity} />;
  }

  if (activity.type === 'rhythm') {
    return <RhythmActivity activity={activity} />;
  }
}
