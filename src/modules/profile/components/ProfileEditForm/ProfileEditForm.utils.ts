import * as Yup from 'yup';
import {ProfileEditFormInitialValues} from './ProfileEditForm.types';

export const profileEditFormValidationSchema = Yup.object({
  firstName: Yup.string()
    .required('გთხოვთ მიუთითოთ სახელი')
    .max(20, 'სახელის მაქსიმალური სიმბოლო არ უნდა აღემატებოდეს 20 სიმბოლოს'),
  lastName: Yup.string()
    .required('გთხოვთ მიუთითოთ გვარი')
    .max(20, 'გვარის მაქსიმალური სიმბოლო არ უნდა აღემატებოდეს 20 სიმბოლოს'),
  email: Yup.string(),
  abouMe: Yup.string(),
});

export const profileEditFormInitialValues: ProfileEditFormInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  aboutMe: '',
};
