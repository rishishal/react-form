import { useState } from "react";

const FormWithoutYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: "",
    birthDate: "",
  });

  const [errors, setErrors] = useState({});

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  const isValidPassword = (password) => {
    // Regular expressions for password validation
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password)
    );
  };

  const isValidAge = (age) => {
    return parseInt(age) >= 18 && parseInt(age) <= 100;
  };

  const ValidateForm = () => {
    let newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "firstName required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "lastName required";
    }
    if (!formData.email) {
      newErrors.email = "email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one symbol, one number, one uppercase letter, and one lowercase letter";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "confirmPassword is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Confirm password not matches";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "phoneNumber is required";
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (!isValidAge(formData.age)) {
      newErrors.age = "Invalid age";
    }
    if (formData.interests.length === 0) {
      newErrors.interests = "please at least select one interest";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "Date of birth is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  console.log(errors);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = ValidateForm();
    if (isValid) {
      console.log("Form Submited", formData);
    } else {
      console.log("Form Validation Faild");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;

    let updateInterest = [...formData.interests];
    if (checked) {
      updateInterest.push(name);
    } else {
      updateInterest = updateInterest.filter((interest) => interest !== name);
    }
    setFormData({ ...formData, interests: updateInterest });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>FirstName:</label>
          <input
            type="text"
            value={formData.firstName}
            name="firstName"
            onChange={handleChange}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>
        <div>
          <label>LastName:</label>
          <input
            type="text"
            value={formData.lastName}
            name="lastName"
            onChange={handleChange}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div>
          <label>PhoneNumber:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <div className="error">{errors.phoneNumber}</div>
          )}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="text"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div>
          <label>ConfirmPassword:</label>
          <input
            type="text"
            value={formData.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <div className="error">{errors.gender}</div>}
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <div className="error">{errors.age}</div>}
        </div>

        <div>
          <label>Interests</label>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={formData.interests.includes("coding")}
              onChange={handleCheckbox}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="fitness"
              checked={formData.interests.includes("fitness")}
              onChange={handleCheckbox}
            />
            Fitness
          </label>
          <label>
            <input
              type="checkbox"
              name="reading"
              checked={formData.interests.includes("reading")}
              onChange={handleCheckbox}
            />
            Reading
          </label>
          {errors.interests && <div className="error">{errors.interests}</div>}
        </div>

        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            placeholder="Enter your date of birth"
            onChange={handleChange}
          />
          {errors.birthDate && <div className="error">{errors.birthDate}</div>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormWithoutYup;
