import React from 'react';
import { ProjectModel } from 'interfaces&Types/ProjectModel';
import { GetProjectsForUser } from 'endpoint/endpointDictionaryExecuter';
import ExpandableCheckedList from './ExpandableCheckedList';

type ProjectExpandForFilterProps = {
  checkedProjects: string[];
  setCheckedProjects: React.Dispatch<React.SetStateAction<string[]>>;
  integration: string;
};

const ProjectExpandForFilter: React.FC<ProjectExpandForFilterProps> = ({ checkedProjects, setCheckedProjects, integration }) => {
  const [projectResp, setProjectResp] = React.useState<ProjectModel[]>([]);
  const expandListKeys = projectResp.map(({ id }) => id);
  const expandListNames = projectResp.map(({ key, name }) => (key ? name + ` (${key})` : name));

  React.useEffect(() => {
    async function fetchData() {
      const res = await GetProjectsForUser(integration);
      setProjectResp(res);
    }
    fetchData();
  }, [integration]);

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
