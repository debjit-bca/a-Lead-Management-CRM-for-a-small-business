# LeadFlow CRM

A full-featured Lead Management CRM built with React.js, powered by Claude AI for pipeline insights.

## Features

- Add, Edit, Delete, and View leads
- Lead status tracking: New → Contacted → Qualified → Converted → Lost
- Search by name, email, or company
- Filter by status, sort by any column
- Pagination (8 leads per page)
- Live statistics dashboard
- AI-powered pipeline analysis (via Claude API)
- Responsive design

## Required Fields

| Field | Type |
|-------|------|
| Name | Text |
| Email | Email |
| Phone Number | Text |
| Company Name | Text |
| Lead Status | Select (New, Contacted, Qualified, Converted, Lost) |
| Notes | Textarea |
| Created Date | Auto-generated |

## Tech Stack

- **Frontend:** React.js (single-file component)
- **AI:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Styling:** Inline CSS + Google Fonts (Inter, Space Grotesk)

## Setup Instructions

### Option 1 — Run on StackBlitz (Recommended)

1. Go to [stackblitz.com](https://stackblitz.com)
2. Create a new React project
3. Replace `App.jsx` with the contents of `src/LeadCRM.jsx`
4. The app runs instantly in the browser

### Option 2 — Run Locally

1. Create a new React app:
   ```bash
   npx create-react-app leadflow-crm
   cd leadflow-crm
   ```

2. Replace `src/App.js` with the contents of `src/LeadCRM.jsx`

3. Install dependencies (all standard — no extra packages needed):
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## API Requirements Met

| Requirement | Implementation |
|-------------|---------------|
| Create Lead | Add Lead modal with validation |
| Get All Leads | Dashboard table with all leads |
| Update Lead | Edit modal with pre-filled form |
| Delete Lead | Confirmation modal + delete |
| Search Leads | Live search across name, email, company |

## Bonus Features Implemented

- Lead statistics dashboard (total, pipeline, conversion rate, per-status counts)
- Pagination with page controls
- Multi-column sorting (asc/desc) + status filtering
- Responsive design
- AI Pipeline Insight via Claude API

## Submitted By

**Debjit Kundu**  
Email: kundu9357@gmail.com  
Phone: 6295026410  
Location: Paschim Bardhaman, West Bengal
