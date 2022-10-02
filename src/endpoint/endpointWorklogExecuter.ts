import axios from './axiosInstance';
import { AddWorklogModel } from 'interfaces&Types/AddWorklogModel';
import { IssueForFilterModel } from 'interfaces&Types/IssueForFilterModel';
import { FilterDataModel } from 'interfaces&Types/issueReturnIfaces/FilterData';
import { WorklogForIssueDto } from 'interfaces&Types/issueReturnIfaces/IsuesReturnRoot';
import { TypeName } from 'interfaces&Types/SimpleTypes';
import { UpdateWorklogModel } from 'interfaces&Types/UpdateWorklogModel';
import moment from 'moment';

export const WorklogDateRange = async (startDate: moment.Moment, endDate: moment.Moment): Promise<WorklogForIssueDto[]> => {
  try {
    const data = await axios.post<moment.Moment, { data: WorklogForIssueDto[] }>(`/Issues/DateRangeWorklogs`, {
      dateFrom: startDate,
      dateTo: endDate,
    });
    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const UpdateWorklog = async (typeAndName: string, model: UpdateWorklogModel): Promise<void> => {
  try {
    await axios.post<UpdateWorklogModel>(`/Issues/UpdateWorklog/${typeAndName}`, { ...model });
  } catch (err) {
    console.log(err);
  }
};

export const FilterIssues = async (typeAndName: string, filterData: FilterDataModel): Promise<IssueForFilterModel[]> => {
  try {
    const data = await axios.post(`/Issues/FilterIssues/${typeAndName}`, { ...filterData });
    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const UserIntegrations = async (email: string): Promise<TypeName[]> => {
  try {
    const data = await axios.get<string, { data: TypeName[] }>(`/User/Integrations/${email}`);
    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const AddWorklog = async (typeAndName: string, model: AddWorklogModel): Promise<void> => {
  try {
    await axios.post<AddWorklogModel>(`/Issues/AddWorklog/${typeAndName}`, { ...model });
  } catch (err) {
    console.log(err);
  }
};

export const IsIssueExist = async (typeAndName: string, issueId: string): Promise<any> => {
  try {
    const data = await axios(`/Issues/IfIssueExist/${typeAndName}/${issueId}`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
