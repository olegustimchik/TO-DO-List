
export type ListRequest = {
  id  : string;
  name: string;
};

export type TaskRequest = {
  id         : string;
  name       : string;
  description: string;
  completed  : boolean;
  createdAt  : Date;
};
