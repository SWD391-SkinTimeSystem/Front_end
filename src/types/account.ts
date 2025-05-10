export type Account = {
    content: AccountDetail[];
    itemAmount: number;
    pageSize: number;
    pageCount: number;
    currentPage: number;
}

export type AccountDetail = {
    id: string;
    username: string;
    fullname: string;
    avatar: string;
    email: string;
    phone: string;
    date_of_birth: string;
    role: string;
    status: string;
    created_time: string;
    last_modified: string;
}

export type AccountCreate = {
    username: string;
    email: string;
    password: string;
    role: string;
}