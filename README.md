# 🕹️ Tic-Tac-Toe Mini App

A multiplayer turn-based Tic-Tac-Toe game where two players can create and join rooms, take turns, and get real-time game status.

---

## 🚀 How to Play

### 1. Create a Game
- Tap **"Create Game"**
- You'll receive a **Game Code** (e.g. `ABCD1234`)
- Share this code with your friend

### 2. Join a Game
- Tap **"Join Game"**
- Enter the **Game Code** shared by your friend

### 3. Take Turns
- The game board will appear once both players are in
- Player X goes first
- Tap on a square to make your move
- Wait for your opponent’s turn
- The game ends when someone wins or it’s a draw

---

## 🛠️ API Overview

### Create Game
`POST /create`
- Response: `{ gameId: "ABCD1234", board: [...], currentTurn: "X" }`

### Join Game
`POST /join`
- Body: `{ gameId: "ABCD1234" }`
- Response: `{ board: [...], currentTurn: "X" }`

### Make Move
`POST /move`
- Body: `{ gameId, player, row, col }`
- Response: `{ board: [...], status: "ongoing" | "win" | "draw", winner: "X" | "O" | null }`

---

## 🧠 Game Rules
- 3x3 grid
- X always goes first
- First to align 3 in a row (horizontal, vertical, diagonal) wins
- If all 9 cells are filled with no winner, it's a draw

---

## 🌐 Deployment
Backend runs at:
https://olmercycheperur.com/silva

Frontend is hosted as an Alipay or M-Pesa Mini Program.

---

## 👥 Tech Stack
- Node.js + Express (backend)
- M-Pesa Mini Program (frontend)
