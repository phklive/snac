type User = {
  _id: string;
  name: string;
  email: string;
  score: number;
  bio: string;
  banner: string;
  profile: string;
  favs: [];
  snacs: [];
};

type Digi = {
  _id: string;
  title: string;
  image: string;
  price: number;
  owner: string;
  creator: string;
  likes: number;
  description: string;
  ownerImage: string;
  ownerName: string;
};
