/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#111827',
        'bg-secondary': '#1F2937',
        'bg-tertiary': '#374151',
        'border-color': '#4B5563',
        'text-primary': '#F9FAFB',
        'text-secondary': '#9CA3AF',
        'accent-primary': '#3B82F6',
        'accent-hover': '#2563EB',
        'status-completed': '#10B981',
        'status-pending': '#F59E0B',
        'status-cancelled': '#EF4444',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}