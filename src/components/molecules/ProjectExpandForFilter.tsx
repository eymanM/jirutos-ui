import React from "react";
import { ProjectModel } from "interfaces&Types/ProjectModel";
import { GetProjectsForUser } from "endpoint/endpointDictionaryExecuter";
import ExpandableCheckedList from "./ExpandableCheckedList";

type ProjectExpandForFilterProps = {
  checkedProjects: string[];
  setCheckedProjects: React.Dispatch<React.SetStateAction<string[]>>;
};

const ProjectExpandForFilter: React.FC<ProjectExpandForFilterProps> = ({ checkedProjects, setCheckedProjects }) => {
  const [projectResp, setProjectResp] = React.useState<ProjectModel[]>([]);
  const expandListKeys = projectResp.map(({ id }) => id);
  const expandListNames = projectResp.map(({ key, name }) => `${name} (${key})`);

  React.useEffect(() => {
    async function fetchData() {
      const res = await GetProjectsForUser();
      setProjectResp(res);
    }
    fetchData();
  }, []);

  return (
    <ExpandableCheckedList
      checkedItems={checkedProjects}
      setCheckedItems={setCheckedProjects}
      items={expandListKeys}
      itemsNames={expandListNames}
      title="Project"
    />
  );
};

export default ProjectExpandForFilter;
