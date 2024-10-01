export interface UserData {
  _id: string;
  id: number;
  id_client: number;
  name: string;
  last_name?: string;
  email?: string|null;
  id_access_level: number;
  user: string;
  pass: string;
  deleted: boolean;
  enabled: boolean;
  ordered_fields: array;
  language: number;
  background_color: number;
  alerts_enabled: boolean;
}
export interface JwtPayload {
  email: string,
  given_name: string,
  family_name: string,
  email_verified: string,
}