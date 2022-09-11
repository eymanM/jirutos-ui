import { URL } from 'state/constans/constans';
import axios from 'axios';

export const GetProjectsBasicReport = async (): Promise<any> => {
  try {
    const data = await axios.get<any>(`${URL}/Report/ProjectsBasicReport`);

    const type = data.headers['content-type'];
    const blob = new Blob([data.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Basic_Projects_Report.csv';
    link.click();
  } catch (err) {
    console.log(err);
  }
};

export const GetIssuesBasicReport = async (): Promise<any> => {
  try {
    const data = await axios.get<any>(`${URL}/Report/IssuesBasicReport`);

    const type = data.headers['content-type'];
    const blob = new Blob([data.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Basic_Issues_Report.csv';
    link.click();
  } catch (err) {
    console.log(err);
  }
};
