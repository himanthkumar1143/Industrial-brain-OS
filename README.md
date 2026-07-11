# Industrial Brain OS

Industrial Brain OS is an enterprise-grade, AI-powered industrial knowledge platform designed to aggregate, parse, analyze, and query complex industrial documents, drawings, compliance codes, and expert workflows.

---

## Sprint 0 Scope

This repository represents the completed **Sprint 0 (Project Foundation)** phase. The goal of this sprint is to deliver a highly scalable, professional project layout and diagnostic mechanism to verify environment, networking, and database client integrations before building AI features.

### Objectives Achieved:
1. **Frontend Setup**: React 19 + TypeScript + Vite + Tailwind CSS v4 + Shadcn UI + Routing & State utilities.
2. **Backend Setup**: Node.js 22 LTS + Express + TypeScript + DB configurations (MongoDB Atlas, Neo4j AuraDB) + centralized environment validation + async error middleware.
3. **Integration**: Centralized versioned HTTP health diagnostics gateway under `/api/v1/health` loaded on a glassmorphic dashboard in the frontend.

---

## Technology Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 8
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Shadcn UI
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **State & Query**: TanStack Query (React Query)
- **Forms & Validation**: React Hook Form, Zod
- **Visuals & Charts**: React Flow, Recharts, Lucide React

### Backend
- **Runtime**: Node.js 22 LTS
- **Framework**: Express.js
- **Language**: TypeScript
- **Database Client**: MongoDB Atlas (Mongoose), Neo4j AuraDB (Neo4j Driver)
- **Security & Logging**: Helmet, CORS, Morgan (dev preset)
- **Utilities**: dotenv, jsonwebtoken, bcryptjs, multer, express-validator
- **TypeScript Runner**: tsx

---

## Folder Structure

```
industrial-brain-os/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/          # Axios instances and endpoint calls
│   │   ├── assets/       # Static assets (images, icons)
│   │   ├── components/   # UI components library
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── pages/        # Router page views
│   │   ├── layouts/      # Layout containers
│   │   ├── routes/       # Path routing definitions
│   │   ├── services/     # Frontend core business service helpers
│   │   ├── hooks/        # Custom react hooks
│   │   ├── contexts/     # React state contexts
│   │   ├── lib/          # Custom libraries (Shadcn utils.ts)
│   │   ├── types/        # TypeScript declarations
│   │   ├── utils/        # Utility helpers
│   │   ├── App.tsx       # Root rendering UI
│   │   └── main.tsx      # App bootstrapper
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── components.json
│
├── backend/
│   ├── uploads/          # Physical file uploads root
│   ├── src/
│   │   ├── config/       # Centralized env and DB drivers
│   │   ├── controllers/  # Controller endpoints
│   │   ├── middleware/   # Express global filters & checks
│   │   ├── models/       # Database mongoose schemas
│   │   ├── routes/       # Versioned route listings
│   │   ├── services/     # Pure business logic core
│   │   ├── utils/        # General helpers
│   │   ├── types/        # TypeScript custom definitions
│   │   ├── validators/   # Request validator schemas
│   │   ├── constants/    # Fixed parameters
│   │   ├── uploads/      # Source-level uploads folder
│   │   ├── app.ts        # Express app middlewares
│   │   └── server.ts     # HTTP server listener
│   ├── tsconfig.json
│   └── package.json
```

---

## Getting Started

### 1. Prerequisites
Ensure you have **Node.js v22 LTS** and **npm v10+** installed:
```bash
node -v  # Expected: v22.x
npm -v   # Expected: v10.x
```

### 2. Environment Variables

Create and configure your environment files.

#### Frontend Environment (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api/v1
```

#### Backend Environment (`backend/.env`):
Fill in your database endpoints and secrets:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_signing_secret
JWT_EXPIRES_IN=7d
GOOGLE_API_KEY=your_gemini_api_key
NEO4J_URI=neo4j+s://your_neo4j_auradb_uri
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_neo4j_auradb_password
```
*(Leave values empty in production-like environments until actual deployment; startup validation will fail and log errors if required parameters are missing).*

---

## Running the Application

### Running Backend
Navigate to the `backend/` directory and execute:
```bash
# Install dependencies
npm install

# Run backend in development mode (auto-reload via tsx)
npm run dev

# Build TypeScript to Javascript
npm run build

# Start compiled server
npm run start
```

### Running Frontend
Navigate to the `frontend/` directory and execute:
```bash
# Install dependencies
npm install

# Run frontend in development mode (Vite HMR)
npm run dev

# Build client bundle
npm run build
```

---

## API Structure

All endpoint paths must extend from the base version path prefix `/api/v1`.

### Health Diagnostics Endpoint
`GET /api/v1/health`

**Successful Response (200 OK)**:
```json
{
  "success": true,
  "message": "Health check completed successfully",
  "data": {
    "status": "healthy",
    "service": "Industrial Brain OS Backend",
    "version": "1.0.0",
    "environment": "development",
    "uptime": 23,
    "node": "v22.14.0",
    "mongodb": "connected",
    "neo4j": "connected",
    "timestamp": "2026-07-02T13:30:59.000Z"
  }
}
```

---

## Future Sprint Roadmap (High Level)

- **Sprint 1 (Auth & Document Management)**: Secure JWT Authentication, Role-Based Access Control (RBAC), multi-format document uploads to MongoDB GridFS / AWS S3.
- **Sprint 2 (OCR & Parsing)**: Computer Vision extraction for P&ID engineering drawings, unstructured PDF document layouts, metadata cataloging.
- **Sprint 3 (Knowledge Graph Integration)**: Mapping industrial ontologies and engineering relationships in Neo4j AuraDB.
- **Sprint 4 (GraphRAG & Copilot)**: Combining Vector Search + Knowledge Graph schemas with Google Gemini API for context-enriched RAG engineering support.

---
# Changelog

## v2.0.0 - Sprint 2 Final

### Added
- Knowledge Hub
- Cloudinary integration
- Document versioning
- Approval workflow
- Audit logging
- Soft deletion
- Role-based document visibility
- Enterprise navigation

### Improved
- Login redirection
- Session restoration
- Office document preview handling
- Explore Demo synchronization

### Fixed
- Logout redirect regression
- Version upload permissions
- Office preview UX
- Dashboard navigation consistency
- 
## License

This project is licensed under the MIT License - see the LICENSE placeholder for details.
