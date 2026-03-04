#!/bin/bash
# Master Test Runner
# Runs all test levels in sequence

echo "╔════════════════════════════════════════╗"
echo "║  AI-Mobile Banking Test Suite         ║"
echo "║  Master Test Runner                    ║"
echo "╚════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

LEVEL1_PASS=false
LEVEL2_PASS=false
LEVEL3_PASS=false

echo "Starting test execution..."
echo ""

# Level 1: Smoke Tests
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Running Level 1: Smoke Tests (5 min)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if ./tests/level1_smoke.sh; then
  LEVEL1_PASS=true
  echo ""
else
  echo ""
  echo "❌ Level 1 failed - Stopping test execution"
  echo ""
  echo "Please fix smoke test issues before proceeding."
  exit 1
fi

# Level 2: Core Functionality
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Running Level 2: Core Tests (15 min)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if ./tests/level2_core.sh; then
  LEVEL2_PASS=true
  echo ""
else
  echo ""
  echo "❌ Level 2 failed - Stopping test execution"
  echo ""
  echo "Core functionality issues detected. Review changes."
  exit 1
fi

# Level 3: Regression Tests
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Running Level 3: Regression Tests (30 min)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if ./tests/level3_regression.sh; then
  LEVEL3_PASS=true
  echo ""
else
  echo ""
  echo "❌ Level 3 failed"
  echo ""
  echo "Regression tests failed. Breaking changes detected."
  exit 1
fi

# All tests passed
echo "╔════════════════════════════════════════╗"
echo "║     🎉 ALL TESTS PASSED! 🎉           ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "Test Summary:"
echo "  ✅ Level 1: Smoke Tests - PASSED"
echo "  ✅ Level 2: Core Functionality - PASSED"
echo "  ✅ Level 3: Regression Tests - PASSED"
echo ""
echo "🚀 Application is stable and ready for:"
echo "   • Git commit"
echo "   • Production deployment"
echo "   • Feature release"
echo ""
echo "Next steps:"
echo "  1. Update CHANGELOG.md"
echo "  2. Commit with clear message"
echo "  3. npm run build"
echo "  4. pm2 restart webapp"
echo ""

exit 0
