import axios from './axiosInstance';

export const GetProjectsBasicReport = async (): Promise<any> => {
  try {
    const data = await axios.get<any>(`/Report/ProjectsBasicReport`);

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
    const data = await axios.get<any>(`/Report/IssuesBasicReport`);

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
