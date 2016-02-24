import { CLEAR_REGISTRATION_ERRORS, TOGGLE_REGISTRATION, VALIDATE_REGISTRATION}
  from 'constants/ui/registration';

export function clearRegistrationErrors() {
  return {
    type: CLEAR_REGISTRATION_ERRORS
  };
}

export function toggleRegistration() {
  return {
    type: TOGGLE_REGISTRATION
  };
}

export function validateRegistration(registrationData) {
  return {
    type: VALIDATE_REGISTRATION,
    registrationData
  };
}
