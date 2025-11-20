PieStock - Mobile Inventory Management App
Overview
PieStock is a React Native mobile application designed for pizza shop inventory management. It provides real-time stock tracking, low-stock alerts, and inventory adjustment capabilities in a user-friendly mobile interface.

Architecture & Library Choices
Core Architecture
text
src/
├── components/          # Reusable UI components
├── screens/            # Main app screens
├── navigation/         # Tab and screen navigation  
├── types/              # TypeScript type definitions
├── data/               # Mock data and API services
└── App.tsx             # Main application component
Technology Stack
React Native with Expo for cross-platform development

TypeScript for type safety

twrnc (Tailwind CSS) for styling

Lucide React Native for icons

React Hooks for state management

Custom tab navigation

Design Decisions
Mock Data First: Started with mock data for rapid prototyping with API interface ready for real backend

Local State: Used React useState for simplicity at current complexity level

Expo: Chosen for faster development cycle and easier deployment

TypeScript: Implemented for better code quality and maintainability

Setup & Run Instructions
Prerequisites
Node.js (v16 or higher)

npm or yarn

Expo CLI

Installation
Clone the repository

text
git clone <repository-url>
cd PizzaPantry 
Install dependencies

text
npm install

API Service Methods


typescript
// Items Management
getItems(): Promise<Item[]>
createItem(payload): Promise<Item>
updateItem(id, payload): Promise<Item>
deleteItem(id): Promise<void>

// Inventory Adjustments
adjustItem(itemId, type, amount, reason, user): Promise<{item, log}>

// Logs & Analytics
getLogsForItem(itemId): Promise<AdjustmentLog[]>
getAllLogs(): Promise<AdjustmentLog[]>


Key Design Decisions & Trade-offs
1. Mock Data vs Real API
Choice: Started with mock data for rapid prototyping

Trade-off: Easy to develop but lacks persistence

Solution: Built API service interface for easy transition to real backend

2. Local State vs Global State
Choice: React useState for component-level state

Trade-off: Simpler but can become complex with scale

Justification: App complexity doesn't yet require Redux/Context

3. Expo vs Bare React Native
Choice: Expo for faster development cycle

Trade-off: Limited native module access

Benefit: Quick prototyping and over-the-air updates

4. TypeScript Adoption
Choice: Full TypeScript implementation

Trade-off: Steeper learning curve

Benefit: Better code quality and maintainability