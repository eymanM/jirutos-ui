import { URL } from "state/constans/constans";
import axios from "axios";
import { ProjectModel } from "interfaces&Types/ProjectModel";
import { StatusModel } from "interfaces&Types/StatusModel";

export const GetProjectsForUser = async (typeAndName: string = "Jira/psw-inzynierka"): Promise<ProjectModel[]> => {
  try {
    const data = await axios.get<ProjectModel[]>(`${URL}/Dictionary/AvailableProjectsForUser/${typeAndName}`);

    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const GetStatusesForProjects = async (typeAndName: string = "Jira/psw-inzynierka"): Promise<StatusModel[]> => {
  try {
    const data = await axios.get<StatusModel[]>(`${URL}/Dictionary/Statuses/${typeAndName}`);

    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
