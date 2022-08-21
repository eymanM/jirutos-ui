import React from 'react';
import ExpandableCheckedList from './ExpandableCheckedList';

type OtherExpandForFilterProps = {
  checkedOthers: string[];
  setCheckedOther: React.Dispatch<React.SetStateAction<string[]>>;
};

const OtherExpandForFilter: React.FC<OtherExpandForFilterProps> = ({ checkedOthers, setCheckedOther }) => {
  const expandListNamesKeys = [
    ['Assigned to me', 'assignee = currentUser()'],
    ['Created by me', 'creator = currentUser()'],
    ['Watched by me', 'watcher = currentUser()'],
  ];

  return (
    <ExpandableCheckedList
      checkedItems={checkedOthers}
      setCheckedItems={setCheckedOther}
      items={expandListNamesKeys.map((item) => item[0])}
      itemsNames={expandListNamesKeys.map((item) => item[0])}
      title="Others"
    />
  );
};

export default OtherExpandForFilter;
