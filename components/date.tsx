import React, { ReactElement } from 'react';
import { parseISO, format } from 'date-fns';

type Props = {
  dateString: string;
};

export default ({ dateString }: Props): ReactElement => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
};
