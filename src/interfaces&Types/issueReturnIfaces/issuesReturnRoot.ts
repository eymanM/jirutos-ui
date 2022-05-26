
export interface Author {
    self: string;
    accountId: string;
    displayName: string;
    emailAddress: string;
}

export interface UpdateAuthor {
    self: string;
    accountId: string;
    displayName: string;
    emailAddress: string;
}

export interface ContentExact {
    type: string;
    text: string;
}

export interface Content {
    type: string;
    content: ContentExact[];
}

export interface Comment {
    content: Content[];
}

export interface  WorklogForIssue {
    self: string;
    author: Author;
    updateAuthor: UpdateAuthor;
    comment: Comment;
    createdDT: Date;
    updatedDT: Date;
    startedDT: Date;
    timeSpent: string;
    timeSpentSeconds: number;
    id: string;
    issueId: string;
}

export interface Worklog {
    startAt: number;
    maxResults: number;
    total: number;
    worklogs: WorklogForIssue[];
}

export interface Fields {
    worklog: Worklog;
}

export interface Issue {
    id: string;
    self: string;
    key: string;
    fields: Fields;
}

export interface IssueReturnRootObject {
    startAt: number;
    maxResults: number;
    total: number;
    issues: Issue[];
}

export interface WorklogForIssueDto {
    id: string;
    self: string;
    issueId: string;
    commentText: string;
    startedDT: Date;
    timeSpent: string;
}