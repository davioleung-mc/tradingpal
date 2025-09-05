# Position Sizing

Position sizing is a crucial element of successful contract trading that determines how much capital to allocate to each trade. Proper position sizing helps maximize profits while protecting your trading capital from excessive losses.

## Core Position Sizing Methods

### 1. Percentage Risk Method
- Risk 1-2% of total trading capital per trade
- Example: $10,000 account → maximum risk $200 per trade
- Adjust position size based on stop loss distance
- Formula: Position Size = (Account × Risk%) ÷ Stop Loss Distance

### 2. Fixed Dollar Risk
- Set fixed amount to risk per trade
- Example: Always risk $100 regardless of account size
- Useful for larger accounts
- Less optimal for growing accounts

### 3. Volatility-Based Sizing
- Use Average True Range (ATR) for sizing
- Adapts to market volatility automatically
- Formula: Position Size = Risk Amount ÷ (ATR × ATR Multiplier)
- Common multipliers: 1.5-2.5 ATR

## Advanced Position Sizing Strategies

### Kelly Criterion Method
The Kelly Criterion is a mathematical formula for optimal position sizing:

```
Kelly % = W - [(1-W)/R]
Where:
W = Winning percentage (decimal)
R = Win/Loss ratio
```

- Use half Kelly for more conservative sizing
- Requires accurate win rate and risk-reward data
- Best for systematic trading strategies

### Adaptive Position Sizing
1. **Account Drawdown Adjustment**
   - Reduce position size during drawdowns
   - Increase size during winning streaks
   - Example: 20% drawdown → reduce risk per trade to 0.5%

2. **Market Volatility Adjustment**
   - Smaller positions in high volatility
   - Larger positions in low volatility
   - Use VIX or ATR as volatility gauge

## Portfolio Heat Management

### 1. Total Position Exposure
- Maximum total risk across all positions: 6-8%
- Example: 4 positions × 1.5% risk each = 6% total risk
- Reduce position size as exposure increases

### 2. Correlation Management
- Reduce size in correlated positions
- Example: Long BTC and ETH → smaller positions in each
- Consider sector/asset class exposure

### 3. Market Conditions
- Reduce size in challenging markets
- Increase size in favorable conditions
- Monitor market phase (trending/ranging)

## Position Size Calculation Examples

### Example 1: Basic Percentage Risk
```
Account: $10,000
Risk per trade: 2% = $200
Stop loss: 100 pips
Pip value: $0.10
Position size = $200 ÷ ($0.10 × 100) = 20 mini lots
```

### Example 2: Volatility Adjusted
```
Account: $10,000
Risk amount: $200
ATR: 50 pips
Multiplier: 2
Position size = $200 ÷ (50 × 2 × $0.10) = 20 mini lots
```

## Risk Management Integration

### 1. Stop Loss Integration
- Position size must align with stop loss
- Wider stops require smaller positions
- Never exceed maximum risk per trade

### 2. Leverage Considerations
- Account for leverage in calculations
- Higher leverage requires smaller positions
- Formula: True Position Size = Position × Leverage

### 3. Market Liquidity
- Reduce size in illiquid markets
- Consider spread costs
- Check average daily volume

## Common Position Sizing Mistakes

### 1. Oversizing Positions
- Trading too large for account size
- Ignoring stop loss in calculations
- Emotional decision making

### 2. Inconsistent Sizing
- Varying risk percentages
- Not following system rules
- Revenge trading

### 3. Ignoring Market Context
- Same size in all market conditions
- Not adjusting for volatility
- Overlooking correlation risks

## Best Practices

### 1. Documentation
- Record all position sizes
- Track risk per trade
- Monitor total portfolio exposure

### 2. Regular Review
- Analyze position size effectiveness
- Adjust based on results
- Review during drawdowns

### 3. System Integration
- Incorporate into trading plan
- Use position size calculator
- Automate calculations when possible

## Tools and Resources

### 1. Position Size Calculator
Use our [Position Size Calculator](/tools/calculator) for quick and accurate calculations.

### 2. Risk Management Spreadsheet
Track your:
- Position sizes
- Risk per trade
- Total exposure
- Win/Loss ratios

### 3. Trading Journal
Document:
- Position size decisions
- Reasons for adjustments
- Performance results

## Advanced Tips

1. **Scale-In Approaches**
   - Start with partial position
   - Add as trade proves profitable
   - Maintain overall risk limits

2. **Market-Specific Adjustments**
   - Different sizes for different markets
   - Adjust for market characteristics
   - Consider session volatility

3. **Account Growth Adaptation**
   - Increase size as account grows
   - Maintain consistent risk percentage
   - Regular position size review
2. **Account for Leverage**: Calculate actual risk, not position size
3. **Volatility Adjustment**: Smaller positions in volatile markets
4. **Consistency**: Use systematic approach, not gut feeling

## Related Resources

- [Risk Management Basics](/risk-management/basics)
- [Interactive Calculators](/tools/calculator)
- [Leverage and Margin](/basics/leverage-and-margin)

Comprehensive content coming soon!
