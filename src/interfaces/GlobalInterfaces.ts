
export interface IRandomStringOptions {
  length?: number;
  useLowercase?: boolean;
  useUppercase?: boolean;
  useNumbers?: boolean;
  useSpecialChars?: boolean;
}


export interface IOption {
  value?: any;
  label: string;
}

export interface IAutocompleteOption extends IOption {
  inputValue?: string;
}