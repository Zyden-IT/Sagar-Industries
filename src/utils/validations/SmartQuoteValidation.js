// Validation rules for the SmartQuoteForm multi-step flow.
// Keys are step numbers, values are the rule sets consumed by ValidateAll.

export const SmartQuoteValidationRules = {
  1: {
    product: [
      { type: "require", message: "Please select a product type" },
    ],
  },

  2: {
    grade: [
      { type: "require", message: "Steel grade is required" },
      { type: "alphanumericText", message: "Grade can only contain letters, numbers and spaces" },
      { type: "minLength", minLength: 2, message: "Grade must be at least 2 characters" },
      { type: "maxLength", maxLength: 30, message: "Grade cannot exceed 30 characters" },
    ],
    size: [
      { type: "require", message: "Size or thickness is required" },
      { type: "alphanumericText", message: "Size can only contain letters, numbers and spaces" },
      { type: "maxLength", maxLength: 30, message: "Size cannot exceed 30 characters" },
    ],
    quantity: [
      { type: "require", message: "Required quantity is required" },
      { type: "number", message: "Quantity must contain only digits" },
      { type: "maxLength", maxLength: 8, message: "Quantity is too large" },
    ],
  },

  3: {
    city: [
      { type: "require", message: "Delivery city is required" },
      { type: "alphabetic", message: "City can only contain letters" },
      { type: "minLength", minLength: 2, message: "City must be at least 2 characters" },
      { type: "maxLength", maxLength: 40, message: "City cannot exceed 40 characters" },
    ],
    timeline: [
      { type: "require", message: "Please select a timeline" },
    ],
    projectType: [
      { type: "require", message: "Please select a project type" },
    ],
  },

  4: {
    name: [
      { type: "require", message: "Full name is required" },
      { type: "alphabetic", message: "Name can only contain letters" },
      { type: "minLength", minLength: 2, message: "Name must be at least 2 characters" },
      { type: "maxLength", maxLength: 50, message: "Name cannot exceed 50 characters" },
    ],
    company: [
      { type: "require", message: "Company name is required" },
      { type: "alphanumericText", message: "Company can only contain letters, numbers and spaces" },
      { type: "minLength", minLength: 2, message: "Company must be at least 2 characters" },
      { type: "maxLength", maxLength: 60, message: "Company cannot exceed 60 characters" },
    ],
    phone: [
      { type: "require", message: "Phone number is required" },
      { type: "number", message: "Phone must contain only digits" },
      { type: "minLength", minLength: 10, message: "Phone must be at least 10 digits" },
      { type: "maxLength", maxLength: 15, message: "Phone cannot exceed 15 digits" },
    ],
    email: [
      { type: "require", message: "Email address is required" },
      { type: "email", message: "Please enter a valid email" },
      { type: "maxLength", maxLength: 80, message: "Email cannot exceed 80 characters" },
    ],
  },
};

export const SmartQuoteInitialState = {
  product: "",
  grade: "",
  size: "",
  quantity: "",
  city: "",
  timeline: "",
  projectType: "",
  name: "",
  company: "",
  phone: "",
  email: "",
};

// Live input filters — block invalid characters at typing time, per field.
export const SmartQuoteFieldFilters = {
  city:     (v) => v.replace(/[^A-Za-z\s]/g, ""),
  name:     (v) => v.replace(/[^A-Za-z\s]/g, ""),
  phone:    (v) => v.replace(/\D/g, "").slice(0, 15),
  quantity: (v) => v.replace(/\D/g, "").slice(0, 8),
  grade:    (v) => v.replace(/[^A-Za-z0-9\s\-/.]/g, ""),
  size:     (v) => v.replace(/[^A-Za-z0-9\s\-/.]/g, ""),
  company:  (v) => v.replace(/[^A-Za-z0-9\s\-&.,]/g, ""),
};
