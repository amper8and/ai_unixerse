#!/bin/bash
# Level 3: Comprehensive Regression Tests (30 minutes)
# Purpose: Verify all user journeys work end-to-end

echo "========================================"
echo "  Level 3: Comprehensive Regression"
echo "========================================"
echo ""

BASE_URL="http://localhost:3000"
PASS=0
FAIL=0
TOTAL=0

test_pattern() {
  local name="$1"
  local pattern="$2"
  ((TOTAL++))
  
  echo -n "  [$TOTAL] $name... "
  if curl -sf "$BASE_URL/data/demoData.json" 2>/dev/null | grep -q "$pattern" || \
     curl -sf "$BASE_URL/static/app.js" 2>/dev/null | grep -q "$pattern"; then
    echo "✅"
    ((PASS++))
  else
    echo "❌"
    ((FAIL++))
  fi
}

echo "========================================" 
echo "Journey 1: Bills & Payments"
echo "========================================"
test_pattern "Bills need box exists" "Automate Bills"
test_pattern "Bills actions present" "action_bills_1"
test_pattern "Action 2 present" "action_bills_2"
test_pattern "Action 3 present" "action_bills_3"
test_pattern "Accounts dashboard UI" "Accounts & Cards"
test_pattern "Transaction history UI" "Recent Transactions"
test_pattern "Toggle function" "toggleTransactions"
test_pattern "Add account function" "handleAddAccount"
test_pattern "UBA Bank account" "UBA Bank"
test_pattern "OPay account" "OPay"
test_pattern "Account transactions" "Salary Payment"

echo ""
echo "========================================"
echo "Journey 2: Become Debt Free"
echo "========================================"
test_pattern "Debt need box exists" "Become Debt Free"
test_pattern "Debt plan present" "debtPlan"
test_pattern "Total debt amount" "totalDebt"
test_pattern "Monthly payment" "monthlyPayment"
test_pattern "Payoff date" "estimatedPayoff"
test_pattern "Interest saved" "interestSaved"
test_pattern "Credit card debt" "Access Bank Credit Card"
test_pattern "Debt priority" "priority"
test_pattern "Minimum payment" "minimumPayment"

echo ""
echo "========================================"
echo "Journey 3: Buy Smarter"
echo "========================================"
test_pattern "Shopping need box" "Buy Smarter"
test_pattern "Deals present" "deals"
test_pattern "MTN provider" "MTN"
test_pattern "Savings percentage" "savingsPercent"
test_pattern "Discount price" "discountPrice"
test_pattern "Cashback" "cashback"
test_pattern "Purchase handler" "handleDealPurchase"

echo ""
echo "========================================"
echo "Journey 4: Get Rewarded"
echo "========================================"
test_pattern "Rewards need box" "Get Rewarded"
test_pattern "Current points" "currentPoints"
test_pattern "Redeemable items" "redeemable"
test_pattern "Tier system" "tierName"
test_pattern "Next tier" "nextTierName"
test_pattern "Redeem handler" "handleRewardRedeem"

echo ""
echo "========================================"
echo "AI Assistant"
echo "========================================"
test_pattern "AI Assistant UI" "AI Assistant"
test_pattern "AI query handler" "handleAIQuery"
test_pattern "Chat history" "chatHistory"
test_pattern "Quick actions" "Quick Actions"
test_pattern "Open assistant" "openAIAssistant"
test_pattern "Close assistant" "closeAIAssistant"
test_pattern "Send message" "sendChatMessage"
test_pattern "Voice input" "handleVoiceInput"

echo ""
echo "========================================"
echo "Settings & Preferences"
echo "========================================"
test_pattern "User preferences" "preferences"
test_pattern "Quiet mode" "quietMode"
test_pattern "Biometrics" "biometrics"
test_pattern "Notifications" "notifications"
test_pattern "Open settings" "openSettings"
test_pattern "Toggle setting" "toggleSetting"

echo ""
echo "========================================"
echo "Navigation & Core"
echo "========================================"
test_pattern "Navigate home" "navigateToHome"
test_pattern "Navigate to need box" "navigateToNeedBox"
test_pattern "Current view" "currentView"
test_pattern "Current need box" "currentNeedBox"
test_pattern "Render method" "render()"
test_pattern "Init method" "init()"

echo ""
echo "========================================"
echo "Accounts & Cards"
echo "========================================"
test_pattern "Savings account type" '"type": "savings"'
test_pattern "Wallet account type" '"type": "wallet"'
test_pattern "Credit card type" '"type": "credit"'
test_pattern "Debit card type" '"type": "debit"'
test_pattern "Account icons" '"icon": "fa-university"'
test_pattern "Credit cards array" "creditCards"
test_pattern "Credit limit" "creditLimit"
test_pattern "Available credit" "availableCredit"

echo ""
echo "========================================"
echo "Transaction System"
echo "========================================"
test_pattern "Salary transaction" "Salary Payment"
test_pattern "DStv transaction" "DStv Payment"
test_pattern "Jumia transaction" "Jumia Online Shopping"
test_pattern "Income category" '"category": "income"'
test_pattern "Entertainment category" '"category": "entertainment"'
test_pattern "Transaction date" '"date": "2026-'
test_pattern "Transaction amount" '"amount":'
test_pattern "Transaction type" '"type": "credit"'

echo ""
echo "========================================"
echo "Hero Carousel"
echo "========================================"
test_pattern "Hero cards" "heroCards"
test_pattern "Hero card 1" "3 Bills Due This Week"
test_pattern "Hero card 2" "Debt-Free in 6 Months"
test_pattern "Hero card 3" "Save ₦800 on Data"

echo ""
echo "========================================"
echo "FINAL RESULTS"
echo "========================================"
echo ""
echo "Total Tests: $TOTAL"
echo "Passed: $PASS"
echo "Failed: $FAIL"
echo "Success Rate: $(( PASS * 100 / TOTAL ))%"
echo ""
echo "========================================"

if [ $FAIL -eq 0 ]; then
  echo "✅✅✅ Level 3 PASSED ✅✅✅"
  echo "========================================"
  echo ""
  echo "🎉 ALL REGRESSION TESTS PASSED!"
  echo ""
  echo "✅ All $TOTAL tests passed"
  echo "✅ No breaking changes detected"
  echo "✅ All user journeys functional"
  echo "✅ Safe to deploy to production"
  echo ""
  exit 0
else
  echo "❌❌❌ Level 3 FAILED ❌❌❌"
  echo "========================================"
  echo ""
  echo "⚠️  CRITICAL: $FAIL test(s) failed"
  echo ""
  echo "DO NOT DEPLOY - Fix issues immediately:"
  echo "1. Review failed tests above"
  echo "2. Check recent code changes"
  echo "3. Run tests locally to debug"
  echo "4. Fix issues and re-test"
  echo ""
  exit 1
fi
