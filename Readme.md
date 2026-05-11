# Vehicle Maintenance Scheduler

## Tech Stack

- Node.js
- Express.js
- Axios

## Project Structure

Explain:
- controllers
- routes
- services
- algorithms

## APIs

### GET /api/depots

Fetches all depots.

### GET /api/vehicles

Fetches all vehicle maintenance tasks.

### GET /api/schedule/:depotId

Generates optimized maintenance schedule using knapsack algorithm.

## Optimization Logic

The scheduling system uses the 0/1 Knapsack Algorithm.

Goal:
maximize total impact while staying within available mechanic hours.

## Screenshots

(Add screenshots here later)

## How to Run

npm install
npm run dev