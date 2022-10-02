import axios from './axiosInstance';
import { ProjectModel } from 'interfaces&Types/ProjectModel';
import { StatusModel } from 'interfaces&Types/StatusModel';

export const GetProjectsForUser = async (typeAndName: string): Promise<ProjectModel[]> => {
  try {
    const data = await axios.get<ProjectModel[]>(`/Dictionary/AvailableProjectsForUser/${typeAndName}`);

    return data.data;
  } catch (err: any) {
    console.log(err);
    return [];
  }
};

export const GetStatusesForProjects = async (typeAndName: string): Promise<StatusModel[]> => {
  try {
    const data = await axios.get<StatusModel[]>(`/Dictionary/Statuses/${typeAndName}`);

    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
