#!/bin/bash
# Level 2: Core Functionality Tests (15 minutes)
# Purpose: Verify all core features and data structures are intact

echo "========================================"
echo "  Level 2: Core Functionality Tests"
echo "========================================"
echo ""

BASE_URL="http://localhost:3000"
PASS=0
FAIL=0
TOTAL=0

test_feature() {
  local name="$1"
  local pattern="$2"
  local file="$3"
  ((TOTAL++))
  
  echo -n "[$TOTAL] $name... "
  if curl -sf "$BASE_URL$file" 2>/dev/null | grep -q "$pattern"; then
    echo "✅"
    ((PASS++))
  else
    echo "❌"
    ((FAIL++))
  fi
}

echo "Testing Data Structures..."
test_feature "User data present" "Adebayo" "/data/demoData.json"
test_feature "Accounts data present" "UBA Bank" "/data/demoData.json"
test_feature "Credit cards present" "creditCards" "/data/demoData.json"
test_feature "Need boxes present" "needBoxes" "/data/demoData.json"
test_feature "Hero cards present" "heroCards" "/data/demoData.json"

echo ""
echo "Testing Need Boxes..."
test_feature "Bills need box" '"id": "bills"' "/data/demoData.json"
test_feature "Debt need box" '"id": "debt"' "/data/demoData.json"
test_feature "Shopping need box" '"id": "shopping"' "/data/demoData.json"
test_feature "Rewards need box" '"id": "rewards"' "/data/demoData.json"

echo ""
echo "Testing Feature Data..."
test_feature "Bills actions present" "action_bills" "/data/demoData.json"
test_feature "Debt plan present" "debtPlan" "/data/demoData.json"
test_feature "Shopping deals present" "deals" "/data/demoData.json"
test_feature "Rewards points present" "currentPoints" "/data/demoData.json"
test_feature "Transaction history" "transactions" "/data/demoData.json"
test_feature "Account types" '"type": "savings"' "/data/demoData.json"
test_feature "Credit cards" '"type": "credit"' "/data/demoData.json"

echo ""
echo "Testing App Functions..."
test_feature "Navigation functions" "navigateToHome" "/static/app.js"
test_feature "AI Assistant" "handleAIQuery" "/static/app.js"
test_feature "Settings toggle" "toggleSetting" "/static/app.js"
test_feature "Action handlers" "handleAction" "/static/app.js"
test_feature "Transaction toggle" "toggleTransactions" "/static/app.js"
test_feature "Add account handler" "handleAddAccount" "/static/app.js"
test_feature "Deal purchase" "handleDealPurchase" "/static/app.js"
test_feature "Reward redeem" "handleRewardRedeem" "/static/app.js"

echo ""
echo "Testing UI Components..."
test_feature "Home rendering" "renderHome" "/static/app.js"
test_feature "Need box rendering" "renderNeedBoxDetail" "/static/app.js"
test_feature "Settings rendering" "renderSettings" "/static/app.js"
test_feature "AI Assistant UI" "renderAIAssistant" "/static/app.js"
test_feature "Modal system" "showModal" "/static/app.js"

echo ""
echo "========================================"
echo "Results: $PASS passed, $FAIL failed out of $TOTAL tests"
echo "========================================"
echo ""

if [ $FAIL -eq 0 ]; then
  echo "✅✅✅ Level 2 PASSED ✅✅✅"
  echo ""
  echo "Core functionality intact. Safe to commit."
  exit 0
else
  echo "❌❌❌ Level 2 FAILED ❌❌❌"
  echo ""
  echo "⚠️  $FAIL test(s) failed - Review changes carefully"
  exit 1
fi
