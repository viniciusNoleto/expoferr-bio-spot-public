
export interface IAuth {
  access_token: string;
  name: string;
  abilities: string[];
  role_slug: 'specialist' | 'fiscal' | 'citizen';
}
