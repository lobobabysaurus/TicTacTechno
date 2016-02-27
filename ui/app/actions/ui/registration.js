import { CLEAR_REGISTRATION_ERRORS, END_SERVER_REGISTRATION,
         START_SERVER_REGISTRATION, TOGGLE_REGISTRATION, VALIDATE_REGISTRATION }
  from 'constants/ui/registration';

export function clearRegistrationErrors() {
  return {
    type: CLEAR_REGISTRATION_ERRORS
  };
}

export function endServerRegistration() {
  return {
    type: END_SERVER_REGISTRATION
  };
}

export function startServerRegistration() {
  return {
    type: START_SERVER_REGISTRATION
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
