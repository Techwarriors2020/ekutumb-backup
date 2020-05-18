import React from "react";
import Button from "../../../stories/components/atoms/button/button";
import Field from "../../../stories/components/atoms/field/field.tsx";
// import {Button} from "atom-components-kutumb";
import {
  mandatoryValidation,
  emailValidation,
  mobileNumberValidation,
  passwordMatchWith,
  passwordComplexityValidation,
} from "../../../utils/validation.util";
import { phoneNumberCountryCode } from "../../../constants/static.constants";

const validationSchema = {
  userEmail: [mandatoryValidation, emailValidation],
  userPassword: [mandatoryValidation, passwordComplexityValidation],
  userMobile: [mandatoryValidation, mobileNumberValidation],
  userConfirmPassword: [
    mandatoryValidation,
    passwordMatchWith("userPassword"),
    passwordComplexityValidation,
  ],
};

const Registration = () => {
  const countryPhoneCode = phoneNumberCountryCode.IN;
  const applyValidation = (target) => {
    let isError = false;
    if (validationSchema[target.id]) {
      return validationSchema[target.id].map((validation) => {
        if (validation.type === "passwordmatch") {
          const fieldToCompare = document.querySelector(
            "#" + validation.fieldToCompare
          );
          if (
            fieldToCompare &&
            fieldToCompare.value !== target.value &&
            !isError
          ) {
            target.closest(".form-field").querySelector(".error").textContent =
              validation.errorMessage;
            isError = true;
          }
        } else if (!validation.regex.test(target.value) && !isError) {
          target.closest(".form-field").querySelector(".error").textContent =
            validation.errorMessage;
          isError = true;
        }
        if (!isError) {
          target.closest(".form-field").querySelector(".error").textContent =
            "";
        }
      });
    }
    return isError;
  };

  const onFieldBlur = (e) => {
    applyValidation(e.target);
  };

  const isNumberKey = (e) => {
    var charCode = e.which ? e.which : e.keyCode;
    var oldvalue = e.target.value;
    var field = e.target;
    setTimeout(() => {
      if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        field.value = oldvalue;
      }
    }, 0);
  };

  const onMobileFieldKeyDown = (e) => {
    var oldvalue = e.target.value;
    var field = e.target;
    setTimeout(() => {
      if (field.value.indexOf(countryPhoneCode) !== 0) {
        field.value = oldvalue;
      }
    }, 1);
  };

  const submitForm = () => {
    const isValidationFailedArr = Object.keys(
      validationSchema
    ).map((fieldName) =>
      applyValidation(document.querySelector("#" + fieldName))
    );
    console.log("errors", isValidationFailedArr);
    if (!isValidationFailedArr.includes(true)) {
      console.log("API Call..........");
    }
  };

  return (
    <div className="registration-page">
      <div className="form-field">
        <Field
          id="userEmail"
          label="Email Id:"
          fieldType="email"
          handleOnBlur={onFieldBlur}
          name="userEmail"
          includeErrorField={true}
        />
      </div>
      <div className="form-field">
        <Field
          id="userMobile"
          label="Mobile No:"
          fieldType="textbox"
          handleOnBlur={onFieldBlur}
          handleKeyDown={onMobileFieldKeyDown}
          handleKeyPress={isNumberKey}
          name="userMobile"
          defaultValue={countryPhoneCode}
          includeErrorField={true}
        />
      </div>
      <div className="form-field">
        <Field
          id="userPassword"
          label="Password:"
          fieldType="password"
          name="userPassword"
          handleOnBlur={onFieldBlur}
          includeErrorField={true}
        />
      </div>
      <div className="form-field">
        <Field
          id="userConfirmPassword"
          label="Confirm Password:"
          fieldType="password"
          name="userConfirmPassword"
          handleOnBlur={onFieldBlur}
          includeErrorField={true}
        />
      </div>
      <div className="button form-field">
        <Button onClick={submitForm} className="ekutumb-btn ekutumb-purple">Sign Up</Button>
        
      </div>
    </div>
  );
};

export default Registration;