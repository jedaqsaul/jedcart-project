# JedCart Project

## Overview

JedCart is a simple e-commerce shopping cart application built with HTML, CSS, and JavaScript. It fetches product data from a JSON server and allows users to add, view, and remove items from the cart dynamically.

## Features

- Fetches products from `db.json` using `json-server`
- Displays products dynamically
- Allows users to add items to the cart
- Updates cart totals in real-time
- Provides an option to remove items and clear the cart
- Responsive design

## Technologies Used

- HTML
- CSS
- JavaScript
- JSON Server (for API simulation)
- FontAwesome (for icons)

## Installation & Setup

### Prerequisites

- Node.js installed

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/jedaqsaul/jedcart-project
   ```
2. Navigate to the project folder:
   ```sh
   cd jedcart
   ```
3. Install `json-server` globally (if not already installed):
   ```sh
   npm install -g json-server
   ```
4. Start the JSON server:
   ```sh
   json-server --watch db.json --port 3000
   ```
5. Open `index.html` in your browser or use Live Server in VS Code.

## Usage

- Click on "Add to Bag" to add items to the cart.
- Click the cart icon to view items.
- Use the "Remove" option to delete a specific item.
- Click "Clear Cart" to empty the cart.

## Project Structure

```
jedcart/
│── assets/           # Images and other assets
│── styles.css        # Styling file
│── index.html        # Main HTML file
│── main.js          # JavaScript functionality
│── db.json          # Mock database (JSON Server)
```

## Contact

For any inquiries, reach out at: https://github.com/jedaqsaul
