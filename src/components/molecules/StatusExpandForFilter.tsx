import React from "react";
import { ProjectModel } from "interfaces&Types/ProjectModel";
import { GetStatusesForProjects } from "endpoint/endpointDictionaryExecuter";
import ExpandableCheckedList from "./ExpandableCheckedList";
import { StatusModel } from "interfaces&Types/StatusModel";

type StatusExpandForFilterProps = {
  checkedStatuses: string[];
  setCheckedStatuses: React.Dispatch<React.SetStateAction<string[]>>;
};

const StatusExpandForFilter: React.FC<StatusExpandForFilterProps> = ({ checkedStatuses, setCheckedStatuses }) => {
  const [statusResp, setStatusResp] = React.useState<StatusModel[]>([]);
  const expandListKeys = statusResp.map(({ id }) => id);
  const expandListNames = statusResp.map(({ name }) => name);

  React.useEffect(() => {
    async function fetchData() {
      const res = await GetStatusesForProjects();
      setStatusResp(res);
    }
    fetchData();
  }, []);

  return (
    <ExpandableCheckedList
      checkedItems={checkedStatuses}
      setCheckedItems={setCheckedStatuses}
      items={expandListKeys}
      itemsNames={expandListNames}
      title="Status"
    />
  );
};

export default StatusExpandForFilter;
