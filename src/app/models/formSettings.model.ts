export interface FormSettings {
  countryCodes: Option[];
  maritalStatuses: Option[];
}

export interface Option {
  value: string;
  label: string;
}