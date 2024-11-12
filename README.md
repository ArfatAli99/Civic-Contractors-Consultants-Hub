Here’s a README file generated from the provided route files for the EBNA project:

---

# Civic Contractors & Consultants HUB

## Overview

The EBNA project provides a RESTful API to facilitate client, contractor, consultant, and admin interactions related to project management, notifications, and user data.

## User Roles

- **Admin**
- **Client**
- **Consultant**
- **Contractor**

## API Endpoints

### Admin Routes

- **Client Invitation**: `POST /client-invite-consultent`
- **Project Management**:
  - Create: `POST /project`
  - Update: `PUT /project`
  - Details: `GET /project-details`
- **File Uploads**: 
  - Project Documents: `POST /project-doc`
  - Profile Photo: `POST /profile-photo`

### Consultant Routes

- **Project Management**:
  - Create: `POST /project`
  - Update: `PUT /project`
- **Consultant Invitation**: `POST /consultant-invite-client`
- **Notifications**: `GET /notifications`

### Contractor Routes

- **Add Contractor**: `POST /add-contractor`
- **Project Bids**:
  - Create: `POST /project-bids`
  - Update: `PUT /project-bids`
- **File Uploads**:
  - CR Certificate: `POST /upload-cr-certificate`

### Client Routes

- **Client Invitation**: `POST /client-invite-consultent`
- **Project Management**:
  - Create: `POST /project`
  - Update: `PUT /project`
- **File Uploads**: 
  - Project Documents: `POST /project-doc`

## Middleware

The project includes various middleware for validation, authentication, and file uploads, such as:

- `CommonValidationMiddlewareHelper`
- `fileUploadMiddlewareHelper`

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables.
4. Start the server with `npm start`.

## Contributing

Feel free to submit issues and pull requests.

---

This README provides a structured overview of the API, including user roles, endpoints, middleware, and installation instructions. If you need any modifications or additional sections, let me know!