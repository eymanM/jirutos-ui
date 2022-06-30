import { URL } from "state/constans/constans";
import axios from "axios";
import moment from "moment";
import { WorklogForIssueDto } from "interfaces&Types/issueReturnIfaces/IssuesReturnRoot";
import { UpdateWorklogModel } from "interfaces&Types/UpdateWorklogModel";

export const WorklogDateRange = async (startDate: moment.Moment, endDate: moment.Moment): Promise<WorklogForIssueDto[]> => {
  try {
    const data = await axios.post<moment.Moment, { data: WorklogForIssueDto[] }>(`${URL}/Issues/DateRangeWorklogs`, {
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
    await axios.post<UpdateWorklogModel>(`${URL}/Issues/UpdateWorklog/${typeAndName}`, { ...model });
  } catch (err) {
    console.log(err);
  }
};
