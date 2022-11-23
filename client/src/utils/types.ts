type User = {
  uid: string;
  name: string;
  email: string;
  score: number;
  favs: [];
  snacs: [];
  description: String;
};

type Snac = {
  uid: string;
  title: string;
  price: number;
  owner: string;
  likes: number;
};
