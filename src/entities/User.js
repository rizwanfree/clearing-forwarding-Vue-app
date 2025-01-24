export default class User {
  constructor({
    id = null,
    name = '',
    email = '',
    password = '',
    role = 'user', // Default role is 'user'
    createdAt = new Date(),
    updatedAt = new Date(),
  } = {}) {
    this.id = id; // Unique identifier for the user
    this.name = name; // Full name of the user
    this.email = email; // Email address of the user
    this.password = password; // Hashed password (never store plain text passwords!)
    this.role = role; // Role of the user (e.g., 'user', 'admin')
    this.createdAt = createdAt; // Timestamp when the user was created
    this.updatedAt = updatedAt; // Timestamp when the user was last updated
  }

  // Method to return a JSON representation of the user
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Method to validate user data (e.g., during registration or login)
  validate() {
    const errors = [];

    if (!this.name) {
      errors.push('Name is required.');
    }

    if (!this.email) {
      errors.push('Email is required.');
    } else if (!this.validateEmail(this.email)) {
      errors.push('Email is invalid.');
    }

    if (!this.password) {
      errors.push('Password is required.');
    } else if (this.password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }

    return errors;
  }

  // Helper method to validate email format
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
