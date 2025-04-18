# React + TypeScript + Vite Authentication System

This project is a web application that simulates a **user authentication system** with various features, including **email/password login**, **OTP verification**, and **Google SSO**.

## Key Features:
1. **Sign In**:
   - Users can sign in using **email/password** or **Google SSO**.
   - **Password validation** is implemented, and **local/session storage** is used for simulating API responses during development.
   - After signing in, users are required to complete **OTP verification**. The OTP is retrieved from session storage and the user must fill in the OTP to continue.

2. **Change Email**:
   - Users can change their email address by entering the new email and clicking **Next**.
   - An OTP is sent to the user's email (simulated using session storage), and the user must enter the OTP to complete the change.
   - The OTP expires in **30 seconds**, after which users can click **Resend OTP** to receive a new OTP.

3. **Direct OTP Login**:
   - If the user skips the **Change Email** step and enters the OTP directly, they will be logged into the **Dashboard**.

4. **Forgot Password**:
   - Users can click the **Forgot Password** link on the sign-in page.
   - They are prompted to fill in their **email** and click **Continue**.
   - After submitting, a success **modal** is displayed, and the user is redirected to the **OTP page** (OTP  auto-retrieved with a delay from session storage).
   - On entering the OTP, the user will be redirected to the **Create New Password** page, where they can reset their password. Clicking **Continue** logs them in.

5. **Google Sign-In**:
   - Users can also sign in using **Google OAuth** for a quick and simple login process.

6. **Signup**:
   - New users can sign up by entering their **email**, **password**, and **confirm password**.
   - After clicking **Continue**, the user is redirected to the **OTP page**, where they need to enter the OTP (from session storage) to complete the sign-up.

7. **Pre-fill Email and Remember Me**:
   - For **Forgot Password** and **Change Email**, the user's email is pre-filled in the input fields if available.

   -There is also an option to remember the email in the sigin page

8. **Dashboard**:
   - Upon logging in, users are redirected to the **Dashboard**, where data is fetched from the **Fake Store API** to display simulated product information.
   - The user’s profile is shown in the header, and clicking it gives the option to **log out**.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project

2. **Install dependencies:**:

   ```bash
   npm install

3. **Start the development server:**:

   ```bash
   npm run dev

4. **Login using email/password:**

 - To Login on local using email and password use the credentials below
    
   ```bash

      Email: admin@admin.in
      Password: admin123
      
## Technologies Used

- **React**: The front-end UI is built using React.
- **TypeScript**: Static typing using TypeScript for better maintainability.
- **Vite**: The development environment is powered by Vite for fast builds and hot module reloading.
- **Google OAuth**: For signing in via Google SSO.
- **Fake Store API**: Used to simulate the fetching of product data in the dashboard.
- **CSS**: For styling the app, including responsive layouts.

---

## Deployment  

To preview the project: [Preview the App](https://aakash-singh-v-trades-frontend-developer-task-eta.vercel.app/) 

---

## Notes

- The app uses **sessionStorage** and **localStorage** for OTP management and simulating API responses.
- Make sure to configure your **Google OAuth client ID** and any other environment variables for production deployment.

---

## Contributing  

Contributions are welcome! Feel free to fork this repository, create a feature branch, and submit a pull request.

---

## License  

This project is licensed under the MIT License.