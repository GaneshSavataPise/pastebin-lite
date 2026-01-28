# Pastebin Lite

Pastebin Lite is a minimal Pastebin-like web application that allows users to create text pastes and share them using a unique URL. Each paste can optionally expire based on time (TTL) or number of views.

## How to Run the Project Locally

### Prerequisites
- Node.js (v18 or later)
- npm

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/GaneshSavataPise/pastebin-lite.git
   cd pastebin-lite


Install dependencies:

npm install


Create a .env file in the project root:

DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_BASE_URL=http://localhost:3000


Run database migrations:

npx prisma migrate dev


Start the development server:

npm run dev


Open the application in your browser:

http://localhost:3000



Persistence Layer

The application uses SQLite as the persistence layer, managed through Prisma ORM. SQLite provides persistent storage across requests and is suitable for automated testing and serverless deployments.

Design Decisions

Built using Next.js App Router for routing and API endpoints.

Prisma ORM is used for database access in a serverless-safe manner.

Pastes support optional time-based expiry (TTL) and view-count limits.

A paste becomes unavailable as soon as any configured constraint is triggered.

Deterministic TTL testing is supported using TEST_MODE=1 and the x-test-now-ms request header.

Paste content is rendered safely to prevent script execution.

Environment variables are used to avoid hardcoded configuration.