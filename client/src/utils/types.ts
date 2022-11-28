type User = {
  uid: string;
  name: string;
  email: string;
  score: number;
  favs: [];
  snacs: [];
  description: string;
};

type Snac = {
  uid: string;
  title: string;
  price: number;
  owner: string;
  creator: string;
  likes: number;
};
