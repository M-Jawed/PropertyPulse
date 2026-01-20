import type { Profile, Session } from "next-auth";

export type InfoBox = {
  heading: string;
  backgroundColor?: string;
  textColor?: string;
  buttinInfo: {
    backgroundColor: string;
    link: string;
    text: string;
    textColor?: string;
    hover?: string;
  };
  children: React.ReactNode;
};

export type Property = {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    weekly?: number;
    monthly?: number;
    nightly?: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SignIn = {
  profile: Profile;
};

export type SessionProps = {
  session: Session;
};

export type PropertyForm = {
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: string;
  baths: string;
  square_feet: string;
  amenities: string[];
  rates: {
    weekly?: string;
    monthly?: string;
    nightly?: string;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  owner?: string;
  images?: File[];
};

export type User = {
  username: string;
  email: string;
  bookmarks: string[];
  image: string;
};

export type Message = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read: boolean;
  sender: User | { id: string; username?: string };
  recipient: string;
  property: Property | { id: string; name?: string };
  createdAt: string;
  updatedAt: string;
};
