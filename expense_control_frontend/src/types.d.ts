/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface ProductData {
  _id: string;
  id?: number;
  id_client: number;
  product: string;
  id_group: number;
  [key?: string]: any;
  price_primary?: number | string;
  price_secondary?: number | string;
  description?: string;
  deleted?: boolean;
}
export interface GroupData {
  _id: string;
  id?: number;
  id_client: number;
  name: string;
  deleted?: boolean;
}