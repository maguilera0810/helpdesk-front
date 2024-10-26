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