# Position Size Calculator

Calculate the optimal position size for your trades based on your risk tolerance and stop loss distance.

## 🧮 Calculator

### Input Parameters
- **Account Balance**: Your total trading capital
- **Risk Percentage**: Percentage of capital you're willing to risk (1-2% recommended)
- **Entry Price**: Price at which you plan to enter the trade
- **Stop Loss Price**: Price at which you'll exit if trade goes against you

### Formula
```
Position Size = (Account Balance × Risk %) ÷ |Entry Price - Stop Loss Price|
```

### Example Calculation
- Account Balance: $10,000
- Risk Percentage: 2%
- Entry Price: $100
- Stop Loss: $95
- Risk Amount: $10,000 × 2% = $200
- Price Distance: $100 - $95 = $5
- Position Size: $200 ÷ $5 = 40 shares

## 📊 Position Sizing Guidelines

### Conservative Approach
- Risk 1% per trade
- Suitable for beginners
- Lower volatility in account equity

### Moderate Approach  
- Risk 2% per trade
- For experienced traders
- Balance between growth and safety

### Aggressive Approach
- Risk 3%+ per trade
- Only for very experienced traders
- Higher potential returns but increased risk

## ⚠️ Important Considerations

### Account for Slippage
Add 10-20% buffer to your calculated position size to account for slippage and spread costs.

### Consider Correlation
If trading multiple correlated instruments, reduce individual position sizes to maintain overall risk level.

### Adjust for Volatility
In highly volatile markets, consider reducing position sizes even if your calculation suggests larger sizes.

---

For more risk management tools, visit our [Tools Section](/tools/).
