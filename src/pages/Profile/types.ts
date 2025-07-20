interface Name {
  title: string;
  first: string;
  last: string;
}
interface Street {
  number: number;
  name: string;
}
interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
}
interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
export interface UserDetails {
  gender: string;
  name: Name;
  location: Location;
  phone: string;
  picture: Picture;
}
