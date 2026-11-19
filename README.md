# PeopleFlow — Employee Management System

A responsive React + TypeScript HR dashboard for managing employees and departments.

## Requirements
- Node.js 20.19+ (or 22.12+) recommended
- npm

## Run locally
1. Extract this ZIP.
2. Open the extracted `employee-management-system` folder in VS Code.
3. Open Terminal in that folder.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## Demo login
- Email: `admin@peopleflow.com`
- Password: `Admin123!`

This starter uses a browser `localStorage` data adapter so it runs without a backend. It is suitable for learning and demos, not production security. Authentication is simulated; never store real passwords or rely on frontend-only authorization in production. Replace `src/services/api.ts` with calls to your secured backend when ready.

## Features
- Login and protected application routes
- Dashboard metrics
- Employee create, read, update and delete
- Search, department/status filters, sorting and pagination
- Department management
- React Hook Form + Zod validation
- Loading, error and empty states
- Toast notifications
- Responsive sidebar/navigation
- Lazy-loaded pages
- Vitest + Testing Library tests
- Playwright end-to-end smoke test

## Tests
```bash
npm run test:run
npx playwright install
npm run test:e2e
```

## Main folders
- `src/components`: reusable UI and layout
- `src/pages`: route-level screens
- `src/services`: API/data access layer
- `src/context`: authentication state
- `src/types`: shared TypeScript types
- `src/test`: component tests and test setup
- `e2e`: browser end-to-end tests

## Learning order
1. Start with `src/main.tsx` and `src/App.tsx`.
2. Understand `AuthContext` and `ProtectedRoute`.
3. Read `services/api.ts` to understand CRUD/data persistence.
4. Explore `EmployeesPage` and `EmployeeForm`.
5. Review `DepartmentsPage` and `DashboardPage`.
6. Run tests and inspect the test files.
