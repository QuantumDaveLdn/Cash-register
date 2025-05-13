// Cash-in-drawer default values
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

/**
 * Check cash register function to calculate change
 * @param {number} price - The purchase price
 * @param {number} cash - The cash provided by customer
 * @param {Array} cid - Cash in drawer array
 * @returns {Object} - Status and change due
 */
function checkCashRegister(price, cash, cid) {
  // Constants for currency values
  const CURRENCY_UNIT = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };
  
  // Calculate change due
  let changeDue = cash - price;
  
  // Calculate total cash in drawer
  let totalCID = 0;
  for (let i = 0; i < cid.length; i++) {
    totalCID += cid[i][1];
  }
  // Ensure precision
  totalCID = Math.round(totalCID * 100) / 100;
  
  // Handle exact change
  if (changeDue === totalCID) {
    return { status: "CLOSED", change: cid };
  }
  
  // Handle insufficient funds
  if (changeDue > totalCID) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  
  // Sort denominations from highest to lowest
  const sortedCID = [...cid].reverse();
  
  let change = [];
  let remainingChange = changeDue;
  
  // Calculate change to give for each denomination
  for (let i = 0; i < sortedCID.length; i++) {
    const denomination = sortedCID[i][0];
    const unitValue = CURRENCY_UNIT[denomination];
    const availableAmount = sortedCID[i][1];
    
    let returnAmount = 0;
    
    // Calculate how much of this denomination we can return
    while (remainingChange >= unitValue && returnAmount < availableAmount) {
      remainingChange = Math.round((remainingChange - unitValue) * 100) / 100;
      returnAmount = Math.round((returnAmount + unitValue) * 100) / 100;
    }
    
    // Add denomination to change array if we're returning any
    if (returnAmount > 0) {
      change.push([denomination, returnAmount]);
    }
  }
  
  // Check if we have exact change available
  if (remainingChange > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  
  return { status: "OPEN", change };
}

// Function to handle the calculate change action
function handleCalculateChange() {
  // Get the price from the price display
  const priceDisplay = document.getElementById('price-display');
  const priceText = priceDisplay.textContent;
  const priceInput = parseFloat(priceText.replace('$', ''));
  
  // Get the cash input
  const cashInput = parseFloat(document.getElementById('cash-input').value);
  
  // Get elements for displaying results
  const statusMessage = document.getElementById('status-message');
  const statusContainer = document.getElementById('status-container');
  const statusIcon = statusContainer.querySelector('.status-icon');
  const totalChange = document.getElementById('total-change');
  const changeBreakdown = document.getElementById('change-breakdown');
  
  // Validate inputs
  if (isNaN(priceInput) || isNaN(cashInput)) {
    updateStatus('error', 'Please enter valid numbers for price and cash.');
    totalChange.textContent = '$0.00';
    changeBreakdown.innerHTML = '';
    return;
  }
  
  // Check if customer has enough money
  if (cashInput < priceInput) {
    updateStatus('error', 'Customer does not have enough money to purchase the item');
    totalChange.textContent = '$0.00';
    changeBreakdown.innerHTML = '';
    return;
  }
  
  // Check if exact cash
  if (cashInput === priceInput) {
    updateStatus('success', 'Exact payment - no change needed');
    totalChange.textContent = '$0.00';
    changeBreakdown.innerHTML = '';
    return;
  }
  
  // Calculate change
  const result = checkCashRegister(priceInput, cashInput, cid);
  
  // Update total change amount
  const changeAmount = cashInput - priceInput;
  totalChange.textContent = `$${changeAmount.toFixed(2)}`;
  
  // Clear previous change breakdown
  changeBreakdown.innerHTML = '';
  
  // Display result based on status
  if (result.status === "INSUFFICIENT_FUNDS") {
    updateStatus('error', 'INSUFFICIENT FUNDS - Cannot complete the transaction');
  } else if (result.status === "CLOSED") {
    updateStatus('closed', 'CLOSED - Gave all cash in drawer');
    
    // Display change breakdown
    result.change.forEach(item => {
      if (item[1] > 0) {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item[0]}</span><span>$${item[1].toFixed(2)}</span>`;
        changeBreakdown.appendChild(li);
      }
    });
  } else {
    updateStatus('success', 'OPEN - Change provided successfully');
    
    // Display change breakdown
    result.change.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${item[0]}</span><span>$${item[1].toFixed(2)}</span>`;
      changeBreakdown.appendChild(li);
    });
  }
}

// Function to update status display
function updateStatus(statusType, message) {
  const statusContainer = document.getElementById('status-container');
  const statusIcon = statusContainer.querySelector('.status-icon');
  const statusMessage = document.getElementById('status-message');
  
  // Remove all status classes
  statusIcon.classList.remove('waiting', 'success', 'error', 'closed');
  
  // Add the appropriate class
  statusIcon.classList.add(statusType);
  
  // Update the message
  statusMessage.textContent = message;
}

// Function to reset the form
function handleReset() {
  // Reset cash input
  document.getElementById('cash-input').value = '';
  
  // Reset price display to default
  document.getElementById('price-display').textContent = '$0.00';
  
  // Reset status
  updateStatus('waiting', 'Waiting for transaction...');
  
  // Reset change display
  document.getElementById('total-change').textContent = '$0.00';
  document.getElementById('change-breakdown').innerHTML = '';
}

// Function to set a random price (for demo purposes)
function setRandomPrice() {
  const randomPrice = (Math.random() * 50 + 0.5).toFixed(2);
  document.getElementById('price-display').textContent = `$${randomPrice}`;
}

// Add event listeners when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set initial random price
  setRandomPrice();
  
  // Get calculate button and add click event listener
  const calculateBtn = document.getElementById('calculate-change');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', handleCalculateChange);
  }
  
  // Get reset button and add click event listener
  const resetBtn = document.getElementById('reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', handleReset);
  }
  
  // Optional: Add event to set a new random price when clicking on the price display
  const priceDisplay = document.getElementById('price-display');
  if (priceDisplay) {
    priceDisplay.addEventListener('click', setRandomPrice);
  }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined') {
  module.exports = { checkCashRegister };
}