// src/app/models/employee.model.ts

export interface User {
  id:string;
  // Arabic names
  arFirst: string;
  arSecond?: string;
  arMiddle?: string;
  arLast?: string;

  // English names
  enFirst?: string;
  enSecond?: string;
  enMiddle?: string;
  enLast?: string;

  // Contact
  email: string;
  countryCode: string;   // e.g. "SAU", "EGY"
  phone: string;

  // Personal
  birthDate?: Date | null;
  nationalId: string;
  jobNumber?: string;
  gender: 'male' | 'female';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';

  // Address
  addressAr?: string;
  addressEn?: string;
}
