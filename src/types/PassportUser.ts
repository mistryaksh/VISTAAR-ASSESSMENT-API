export interface PassportUser {
  id: string;
  emails: { value: string }[];
  [key: string]: any;
}
