# Project Overview
The Online Library Application is a full-stack web application that allows users to browse, read, and manage books. It supports role-based access control with two primary roles: Admin and User. Admins can perform CRUD (Create, Read, Update, Delete) operations on books, while users can view and read books.

# Technologies Used
# Frontend:
React.js
React Router DOM
Axios
JWT Decode

# Backend:
Node.js
Express.js
MongoDB (with Mongoose)
bcryptjs
jsonwebtoken
dotenv
cors

# Development Tools:
VS Code (or any preferred code editor)
Git & GitHub
Postman (for API testing)
Features

# User Authentication:
Registration and login for users and admins.
JWT-based authentication with role-based access control.

# Book Management:
Admins can add, edit, and delete books.
Each book includes title, author, year of release, and content (URL or text).

# Book Viewing:
Users can view all available books.
Users can read books directly if the content is provided.

# Responsive Design:
The application is responsive and works across various devices.

# Protected Routes:
Certain routes are accessible only to authenticated users or admins.
