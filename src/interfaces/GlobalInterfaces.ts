import { ReactNode } from 'react';

export interface Option {
  value?: any;
  label: string;
  color?: string;
}

export interface IAutocompleteOption extends Option {
  inputValue?: string;
}

export interface Status extends Option {
  icon: ReactNode;
}


export interface LocationData {
  display_name: string;
  address?: {
    city?: string;
    country?: string;
    country_code?: string;
    postcode?: string;
    road?: string;
    state?: string;
  };
}

export interface EncryptedPayload {
  iv: string;
  key: string;
  data: string;
};