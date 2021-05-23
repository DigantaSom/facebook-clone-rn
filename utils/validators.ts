import DayJS from 'dayjs';

type ValidateBirthdayType = {
  isDateValid: boolean;
  dateErrorType: 'empty' | 'young' | 'no error';
};

export const validateEmail = (email: string) => {
  const email_RegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return email_RegEx.test(String(email).toLowerCase());
};

export const validateBirthday = (birthday_date: Date): ValidateBirthdayType => {
  if (!birthday_date) {
    return {
      isDateValid: false,
      dateErrorType: 'empty',
    };
  }
  const now = DayJS();
  const birthday = DayJS(birthday_date);

  // TODO: add more precise validation
  const diff_in_years = now.diff(birthday, 'years');
  if (diff_in_years < 13) {
    return {
      isDateValid: false,
      dateErrorType: 'young',
    };
  }

  return {
    isDateValid: true,
    dateErrorType: 'no error',
  };
};
