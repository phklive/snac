type User = {
  uid: string;
  name: string;
  email: string;
  score: number;
  bio: string;
  banner: string;
  profile: string;
  favs: [];
  snacs: [];
};

type Snac = {
  uid: string;
  title: string;
  price: number;
  owner: string;
  creator: string;
  likes: number;
};
