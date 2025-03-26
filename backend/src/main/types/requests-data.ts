
export type ListRequest = {
  id  : string;
  name: string;
  role: string; 
  createdAt: Date; 
};

export type TaskRequest = {
  id         : string;
  name       : string;
  description: string;
  completed  : boolean;
  createdAt  : Date;
  role       : string; 
};
