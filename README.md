# Cash Register App
A sleek web application that calculates change for transactions with precision, featuring real-time calculation, denomination breakdown, and cash drawer visualization in a responsive design.

## Overview
Cash Register App is a web-based point-of-sale application that helps cashiers calculate exact change for customer transactions. With an intuitive interface and visual representation of currency denominations, it ensures accurate transactions while providing a modern user experience.

## Features
* **Real-time change calculation** with precise denomination breakdown
* **Transaction status tracking** showing payment status (exact payment, change due, insufficient funds)
* **Visual cash drawer display** with 3D-styled currency representations
* **Responsive design** that works seamlessly on desktop and mobile devices
* **Reset functionality** to quickly start new transactions
* **Click-to-update price** feature for demo purposes
* **Visual feedback** through status icons and clear messaging
* **Accurate change algorithm** that properly distributes denominations

## How to Use
1. **View Item Price**: The randomly generated price appears at the top of the screen
2. **Enter Payment Amount**: Input the cash amount received from the customer
3. **Calculate Change**: Click the "Calculate Change" button to process the transaction
4. **View Results**: See transaction status and detailed change breakdown by denomination
5. **Reset**: Click "Reset" to start a new transaction

## Transaction States
* **Waiting**: Initial state before calculation
* **Success**: Change provided successfully
* **Error**: Insufficient funds to complete transaction
* **Closed**: Exact change given (all cash in drawer)

## Cash Drawer Visualization
The application displays the following denominations:
* Penny (1¢)
* Nickel (5¢)
* Dime (10¢)
* Quarter (25¢)
* One Dollar ($1)
* Five Dollars ($5)
* Ten Dollars ($10)
* Twenty Dollars ($20)
* One Hundred Dollars ($100)

## How to Run
Simply open the index.html file in any modern web browser to use the application.

```
# Clone the repository
git clone https://github.com/QuantumDaveLdn/Cash-register.git

# Navigate to the project directory
cd Cash-register

# Open in your browser
open index.html    # Mac
start index.html   # Windows
```

**OR**
Visit the GitHub Pages site at:

## Technologies Used
* HTML5
* CSS3
* JavaScript (Vanilla)

## Project Structure
```
├── index.html  # Main HTML structure
├── styles.css  # Modern styling and responsive design
├── script.js   # Cash register logic and event handling
├── .gitignore  # Excludes unnecessary files from version control
└── README.md   # This file
```

## Application Logic
* **Currency Handling**: Precise calculation with floating-point safeguards
* **Denomination Distribution**: Intelligent distribution of change from highest to lowest denominations
* **Status Management**: Clear indication of transaction status
* **Cash Drawer Management**: Tracking of available cash in drawer

## Future Improvements
* Add animated transitions for cash drawer operations
* Implement cash drawer management for adding/removing cash
* Create a transaction history log
* Add receipt generation functionality
* Include barcode scanner integration
* Implement multiple currency support
* Add keyboard shortcuts for faster operations
* Create a dark mode theme option

## Learning Journey
May 13, 2025 - This project helped me strengthen my JavaScript skills, particularly in handling monetary calculations with proper precision. I learned how to manage complex state transitions in a user interface and provide meaningful visual feedback. The CSS work improved my understanding of modern design principles and responsive layouts.

## License
This project is open source and available under the MIT License.
