#!/bin/bash
# Level 1: Quick Smoke Tests (5 minutes)
# Purpose: Verify app loads and core endpoints are accessible

echo "========================================"
echo "  Level 1: Quick Smoke Tests"
echo "========================================"
echo ""

BASE_URL="http://localhost:3000"
PASS=0
FAIL=0

test_endpoint() {
  local name="$1"
  local url="$2"
  local pattern="$3"
  
  echo -n "Testing $name... "
  result=$(curl -sf "$url" 2>&1)
  
  if echo "$result" | grep -q "$pattern"; then
    echo "✅ PASS"
    ((PASS++))
    return 0
  else
    echo "❌ FAIL"
    ((FAIL++))
    return 1
  fi
}

echo "Starting smoke tests..."
echo ""

# Test 1: Home page loads
test_endpoint "Home page" "$BASE_URL" "AI-Mobile Lifestyle Banking"

# Test 2: CSS loads
test_endpoint "CSS file" "$BASE_URL/static/style.css" "app-container"

# Test 3: JavaScript loads
test_endpoint "JavaScript file" "$BASE_URL/static/app.js" "class AIBank"

# Test 4: Demo data loads
test_endpoint "Demo data" "$BASE_URL/data/demoData.json" "Adebayo"

# Test 5: Server responding with 200
echo -n "Testing Server response code... "
status_code=$(curl -sf -o /dev/null -w "%{http_code}" "$BASE_URL" 2>&1)
if [ "$status_code" = "200" ]; then
  echo "✅ PASS (200 OK)"
  ((PASS++))
else
  echo "❌ FAIL (Got: $status_code)"
  ((FAIL++))
fi

echo ""
echo "========================================"
echo "Results: $PASS passed, $FAIL failed out of 5 tests"
echo "========================================"
echo ""

if [ $FAIL -eq 0 ]; then
  echo "✅✅✅ Level 1 PASSED ✅✅✅"
  echo ""
  echo "Safe to proceed with implementation."
  exit 0
else
  echo "❌❌❌ Level 1 FAILED ❌❌❌"
  echo ""
  echo "⚠️  DO NOT PROCEED - Fix issues before continuing"
  exit 1
fi
