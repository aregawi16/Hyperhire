# Navigate to the frontend directory from the root of the repository

```bash
# Clone the repository and navigate into the backend directory
git clone the project
# Frontend
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start


# Backend

## Installation
### Setup Backend (Laravel)

cd backend

# Install dependencies
composer install

# Set up environment variables
cp .env.example .env

# Generate an application key
php artisan key:generate

# Run migrations
php artisan migrate

# Serve the application on localhost
php artisan serve
