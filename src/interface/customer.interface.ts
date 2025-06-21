export interface ITierDetailsProps {
  tier: string;
  id: string;
  active: boolean;
  benefits: string[];
}

export interface ICustomerProps {
  _id: string; // Or { $oid: string } if you want the raw Mongo style
  username: string;
  name: string;
  address: string;
  birthdate: string; // ISO string, e.g. "1977-03-02T02:20:31.000Z"
  email: string;
  active: boolean;
  accounts: number[];
  tier_and_details: {
    [id: string]: ITierDetailsProps;
  };
}
