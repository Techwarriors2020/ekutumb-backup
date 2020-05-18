import * as constants from '../constants/index';

export const mandatoryValidation = {
    regex: constants.regex.mandatoryValidation,
    errorMessage: constants.error.generic.fieldMandate
};

export const emailValidation = {
    regex: constants.regex.emailValidation,
    errorMessage: constants.error.generic.email
};

export const mobileNumberValidation = {
    regex: constants.regex.mobileNumberValidation,
    errorMessage: constants.error.generic.mobileNumber
};
export const passwordComplexityValidation = {
    regex: constants.regex.passwordComplexityValidation,
    errorMessage: constants.error.generic.password
};

export const passwordMatchWith = (fieldToCompare) => {
    return {
        type: 'passwordmatch',
        errorMessage: constants.error.generic.passwordMatch,
        fieldToCompare
    };
};