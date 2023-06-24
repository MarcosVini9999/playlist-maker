interface iArtists {
  name: string;
}

interface iImages {
  url: string;
}

interface iAlbum {
  artists: Array<iArtists>;
  images: Array<iImages>;
}

export interface iTrack {
  album: iAlbum;
  artists: Array<Object>;
  available_markets: Array<string>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: Object;
  external_urls: Object;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface UserImage {
  url: string;
}

export interface iUserData {
  country: string;
  display_name: string;
  images: Array<UserImage>;
}
