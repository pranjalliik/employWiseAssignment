
User Management Application

### Demo
Check out the live demo here: [Live Demo](https://employ-wise-assignment-taupe.vercel.app/)



### **Features**
- Log in using the Reqres API.
- View a paginated list of users.
- Edit, delete users from the list..
- Ensure route protection based on token authentication.
- Client-side search functionality, search users by first name, last name, or email.
- Sorting based on Alphabetical order and id no
- Redux Toolkit with `createAsyncThunk` for asynchronous actions.
- Styled using Tailwind CSS.




---

## **Tech Stack**
- **Build Tool and Development Server**: Vite
- **Styling**: React (Vite), Tailwind CSS
- **State Management**: Redux Toolkit (`createAsyncThunk`)
- **Routing**: React Router DOM
- **API**: [Reqres API](https://reqres.in/)
- **HTTP Client**: Axios

---



## **Installation and Setup**

### **Prerequisites**
- Ensure you have Node.js and npm installed on your system.

### **Steps**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/pranjalliik/employWiseAssignment
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd employWiseAssignment
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
5. **Open in Browser**:
   Visit `http://localhost:5173` in your browser.

---

## **Usage**
1. **Login**:
   - Navigate to the root route `/` to access the login page.
   - Use the provided Reqres API credentials:
     - Email: `eve.holt@reqres.in`
     - Password: `cityslicka`
   - On successful login, you'll be redirected to the dashboard.

2. **Dashboard**:
   - View the user list.
   - Edit user details using the **Edit** button.
   - Delete users using the **Delete** button.
   - Search users by their first name, last name, or email using the search bar.
   - Sort the list by user ID or name.

3. **Logout**:
   - Close the session by clearing the token and navigating back to the login page.

---

## **Folder Structure**

 Key files and directories shown below:

```
src/
├── main.jsx                   # App entry point and routing configuration
├── Features/                  # Core application logic
│   ├── Authentication/        # Login-related components and logic
│   │   ├── AuthForm.jsx       # Login form component
│   │   ├── AuthForm.css       # Styling for AuthForm
│   │   └── authSlice.js       # Redux slice for login state management
│   ├── Dashboard/             # Dashboard components and logic
│   │   ├── EditUser.jsx       # Component to edit user details
│   │   ├── DelUser.jsx        # Component for user deletion
│   │   ├── UserList.jsx       # Displays the list of users
│   │   ├── SearchAndSort.jsx  # Search and sorting functionality
│   │   └── usersSlice.js      # Redux slice for users list state management 
```

---
