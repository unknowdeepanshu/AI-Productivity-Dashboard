# 🚀 AI Productivity Dashboard

## 📦 Getting Started

Follow these steps to run the project locally:

### 1️⃣ Clone the repository

```bash
git clone https://github.com/unknowdeepanshu/AI-Productivity-Dashboard.git
```

### 2️⃣ Move into the project directory

```bash
cd ai-productivity-dashboard
```

### 3️⃣ Navigate to the frontend folder

```bash
cd frontend
```

### 4️⃣ Set up environment variables

Create a `.env.local` file in the **frontend root directory** and add your Tambo API key:

```env
NEXT_PUBLIC_TAMBO_API_KEY=your_api_key_here
```

> ⚠️ Never commit your `.env.local` file to GitHub.

---

### 5️⃣ Install dependencies

```bash
npm install
```

### 6️⃣ Start the development server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 📂 Project Structure

Inside the `frontend/src` folder, you’ll find the main **app directory**, which contains all pages and components for the dashboard.

```
frontend/
 └── src/
     └── app/
         ├── page.tsx        // Home page
         ├── layout.tsx      // App layout
         ├── tools/
         │   └── page.tsx    // Tools page
         └── components/     // Reusable UI components
```

---

## ➕ Creating a New Page

To create a new page (for example, a **Tools** page):

1. Go to:

   ```
   frontend/src/app
   ```

2. Create a new folder:

   ```
   tools
   ```

3. Inside it, create a `page.tsx` file.

### Example: `tools/page.tsx`

```tsx
export default function Page() {
  return (
    <>
      <h1>This page is about tools</h1>
    </>
  );
}
```

Save the file and restart (if needed):

```bash
npm run dev
```

Now visit:

```
http://localhost:3000/tools
```

---
