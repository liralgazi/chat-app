export const validateName = (name: string) => {
  let isValid = true;
  let error = "";

  if (name.length < 3) {
    error = "Your name is too short!";
    isValid = false;
  } else if (name.length > 10) {
    error = "Your name is too long!";
    isValid = false;
  } else {
    const regex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (regex.test(name)) {
      error = "Please enter a valid name!";
      isValid = false;
    }
  }

  return { isValid, error };
};
