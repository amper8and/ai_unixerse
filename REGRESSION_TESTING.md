# Regression Testing & Change Management Protocol
**AI-Mobile Lifestyle Banking Demo App**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Testing Philosophy](#testing-philosophy)
3. [Pre-Implementation Checklist](#pre-implementation-checklist)
4. [Testing Protocol](#testing-protocol)
5. [Change Management Guardrails](#change-management-guardrails)
6. [Test Suites](#test-suites)
7. [Bug Fix Protocol](#bug-fix-protocol)
8. [New Feature Protocol](#new-feature-protocol)
9. [Rollback Procedures](#rollback-procedures)
10. [Documentation Requirements](#documentation-requirements)

---

## 🎯 Overview

This document establishes the testing protocol and change management guardrails for the AI-Mobile Lifestyle Banking demo app. All changes—whether bug fixes, new features, or enhancements—MUST follow these protocols to ensure application stability and consistency.

**Primary Goal:** Ensure zero breaking changes to existing functionality while allowing safe, controlled evolution of the application.

---

## 💡 Testing Philosophy

### Core Principles

1. **No Breaking Changes**: Every change must preserve existing functionality
2. **Test Before Commit**: All tests must pass before committing code
3. **Document Everything**: Changes must be documented in CHANGELOG.md
4. **Version Control**: Use semantic versioning (MAJOR.MINOR.PATCH)
5. **Backwards Compatible**: New features should not require changes to existing data structures

### Testing Levels

- **Level 1**: Quick Smoke Tests (5 minutes)
- **Level 2**: Core Functionality Tests (15 minutes)
- **Level 3**: Comprehensive Regression Tests (30 minutes)
- **Level 4**: Full Integration Tests (60 minutes)

---

## ✅ Pre-Implementation Checklist

Before making ANY changes, complete this checklist:

### 1. Planning Phase
- [ ] **Requirement Clear**: Understand what needs to be changed/added
- [ ] **Impact Assessment**: Identify which components will be affected
- [ ] **Breaking Change Risk**: Evaluate if change could break existing features
- [ ] **Data Model Impact**: Determine if demoData.json needs updates
- [ ] **UI/UX Impact**: Assess if user experience will change
- [ ] **Dependencies**: Check if other features depend on what you're changing

### 2. Preparation Phase
- [ ] **Backup Current State**: Commit all current changes with descriptive message
- [ ] **Create Branch**: `git checkout -b feature/your-feature-name` (optional but recommended)
- [ ] **Test Baseline**: Run all tests before making changes to establish baseline
- [ ] **Document Plan**: Write brief implementation plan in comments/notes

### 3. Implementation Phase
- [ ] **Make Changes**: Implement the requested changes
- [ ] **Code Review**: Self-review code for quality and consistency
- [ ] **Test Locally**: Verify changes work as expected
- [ ] **Run Level 1 Tests**: Quick smoke test (see below)

### 4. Validation Phase
- [ ] **Run Level 2 Tests**: Core functionality tests
- [ ] **Run Level 3 Tests**: Full regression suite
- [ ] **Visual Inspection**: Manually test affected features in browser
- [ ] **Cross-Feature Testing**: Test related features

### 5. Finalization Phase
- [ ] **Update CHANGELOG.md**: Document changes with version number
- [ ] **Update README.md**: If user-facing changes were made
- [ ] **Git Commit**: Clear, descriptive commit message
- [ ] **Build**: `npm run build` succeeds without errors
- [ ] **Deploy**: Restart server with `pm2 restart webapp`
- [ ] **Post-Deploy Verification**: Test live deployment

---

## 🧪 Testing Protocol

### Level 1: Quick Smoke Tests (5 minutes)

**Purpose**: Verify app loads and core endpoints are accessible

```bash
#!/bin/bash
# Save as: test_level1_smoke.sh

echo "=== Level 1: Quick Smoke Tests ==="
BASE_URL="http://localhost:3000"
PASS=0
FAIL=0

# Test 1: Home page loads
if curl -sf "$BASE_URL" | grep -q "AI-Mobile Lifestyle Banking"; then
  echo "✅ Home page loads"
  ((PASS++))
else
  echo "❌ Home page failed"
  ((FAIL++))
fi

# Test 2: CSS loads
if curl -sf "$BASE_URL/static/style.css" | grep -q "app-container"; then
  echo "✅ CSS loads"
  ((PASS++))
else
  echo "❌ CSS failed"
  ((FAIL++))
fi

# Test 3: JS loads
if curl -sf "$BASE_URL/static/app.js" | grep -q "class AIBank"; then
  echo "✅ JavaScript loads"
  ((PASS++))
else
  echo "❌ JavaScript failed"
  ((FAIL++))
fi

# Test 4: Demo data loads
if curl -sf "$BASE_URL/data/demoData.json" | grep -q "Adebayo"; then
  echo "✅ Demo data loads"
  ((PASS++))
else
  echo "❌ Demo data failed"
  ((FAIL++))
fi

# Test 5: Server responding
if [ $(curl -sf -o /dev/null -w "%{http_code}" "$BASE_URL") = "200" ]; then
  echo "✅ Server responding (200 OK)"
  ((PASS++))
else
  echo "❌ Server not responding correctly"
  ((FAIL++))
fi

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ $FAIL -eq 0 ] && echo "✅ Level 1 PASSED" || echo "❌ Level 1 FAILED"
exit $FAIL
```

**Pass Criteria**: All 5 tests must pass

---

### Level 2: Core Functionality Tests (15 minutes)

**Purpose**: Verify all core features and data structures are intact

```bash
#!/bin/bash
# Save as: test_level2_core.sh

echo "=== Level 2: Core Functionality Tests ==="
BASE_URL="http://localhost:3000"
PASS=0
FAIL=0

test_feature() {
  local name="$1"
  local pattern="$2"
  local file="$3"
  
  if curl -sf "$BASE_URL$file" | grep -q "$pattern"; then
    echo "✅ $name"
    ((PASS++))
  else
    echo "❌ $name"
    ((FAIL++))
  fi
}

echo ""
echo "Testing Data Structures..."
test_feature "User data present" "Adebayo Okonkwo" "/data/demoData.json"
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

echo ""
echo "Testing App Functions..."
test_feature "Navigation functions" "navigateToHome" "/static/app.js"
test_feature "AI Assistant" "handleAIQuery" "/static/app.js"
test_feature "Settings toggle" "toggleSetting" "/static/app.js"
test_feature "Action handlers" "handleAction" "/static/app.js"
test_feature "Transaction toggle" "toggleTransactions" "/static/app.js"
test_feature "Add account handler" "handleAddAccount" "/static/app.js"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ $FAIL -eq 0 ] && echo "✅ Level 2 PASSED" || echo "❌ Level 2 FAILED"
exit $FAIL
```

**Pass Criteria**: All 20+ tests must pass

---

### Level 3: Comprehensive Regression Tests (30 minutes)

**Purpose**: Verify all user journeys work end-to-end

```bash
#!/bin/bash
# Save as: test_level3_regression.sh

echo "=== Level 3: Comprehensive Regression Tests ==="
BASE_URL="http://localhost:3000"
PASS=0
FAIL=0

test_journey() {
  local name="$1"
  shift
  echo ""
  echo "Testing: $name"
  
  for pattern in "$@"; do
    if curl -sf "$BASE_URL/data/demoData.json" | grep -q "$pattern" || \
       curl -sf "$BASE_URL/static/app.js" | grep -q "$pattern"; then
      echo "  ✅ $pattern"
      ((PASS++))
    else
      echo "  ❌ $pattern"
      ((FAIL++))
    fi
  done
}

# Journey 1: Bills & Payments with Accounts Dashboard
test_journey "Journey 1: Bills & Payments" \
  "Automate Bills" \
  "action_bills_1" \
  "action_bills_2" \
  "action_bills_3" \
  "Accounts & Cards" \
  "Recent Transactions" \
  "toggleTransactions" \
  "handleAddAccount"

# Journey 2: Debt Free
test_journey "Journey 2: Debt Free" \
  "Become Debt Free" \
  "debtPlan" \
  "totalDebt" \
  "monthlyPayment" \
  "estimatedPayoff" \
  "interestSaved" \
  "Access Bank Credit Card"

# Journey 3: Buy Smarter
test_journey "Journey 3: Buy Smarter" \
  "Buy Smarter" \
  "deals" \
  "MTN" \
  "savingsPercent" \
  "discountPrice" \
  "cashback" \
  "handleDealPurchase"

# Journey 4: Get Rewarded
test_journey "Journey 4: Rewards" \
  "Get Rewarded" \
  "currentPoints" \
  "redeemable" \
  "tierName" \
  "handleRewardRedeem"

# AI Assistant Journey
test_journey "AI Assistant" \
  "AI Assistant" \
  "handleAIQuery" \
  "chatHistory" \
  "Quick Actions" \
  "openAIAssistant" \
  "closeAIAssistant"

# Settings Journey
test_journey "Settings" \
  "preferences" \
  "quietMode" \
  "biometrics" \
  "notifications" \
  "openSettings" \
  "toggleSetting"

# Navigation
test_journey "Navigation" \
  "navigateToHome" \
  "navigateToNeedBox" \
  "currentView" \
  "currentNeedBox"

# Accounts & Cards
test_journey "Accounts & Cards" \
  '"type": "savings"' \
  '"type": "wallet"' \
  '"type": "credit"' \
  '"type": "debit"' \
  "UBA Bank" \
  "OPay" \
  "Access Bank"

# Transaction Data
test_journey "Transaction History" \
  "Salary Payment" \
  "DStv Payment" \
  "Jumia Online Shopping" \
  '"category": "income"' \
  '"category": "entertainment"'

echo ""
echo "=========================================="
echo "Results: $PASS passed, $FAIL failed"
echo "=========================================="
[ $FAIL -eq 0 ] && echo "✅✅✅ Level 3 PASSED ✅✅✅" || echo "❌❌❌ Level 3 FAILED ❌❌❌"
exit $FAIL
```

**Pass Criteria**: All 50+ tests must pass

---

### Level 4: Full Integration Tests (60 minutes)

**Purpose**: Manual testing of complete user flows in browser

#### Test Checklist:

**Home Screen:**
- [ ] Greeting displays correctly
- [ ] User icon opens Settings
- [ ] Hero carousel swipes/clicks smoothly
- [ ] All 9 Need Box tiles visible
- [ ] Featured tiles have correct badges
- [ ] AI Assistant button visible at bottom

**Bills & Payments Dashboard:**
- [ ] Navigate to Bills Need Box
- [ ] See "Accounts & Cards" heading with plus button
- [ ] 2 bank accounts displayed (UBA, OPay)
- [ ] 2 cards displayed (Access Credit, UBA Debit)
- [ ] All balances show correctly
- [ ] Click "Recent Transactions" - expands
- [ ] Click again - collapses
- [ ] Chevron icon flips correctly
- [ ] 5 transactions visible per account
- [ ] Transaction amounts color-coded correctly
- [ ] Click plus button - modal opens
- [ ] Modal shows "Add New Account"
- [ ] Click "Connect Account" - success modal
- [ ] All 3 action items visible above dashboard

**Debt Journey:**
- [ ] Navigate to Debt Need Box
- [ ] 3 debts shown in priority order
- [ ] Debt plan card visible
- [ ] Total debt shows ₦180,000
- [ ] Monthly payment shows ₦30,000
- [ ] Progress bars render
- [ ] Click action - modal opens
- [ ] Complete action - progress updates

**Shopping Journey:**
- [ ] Navigate to Shopping Need Box
- [ ] MTN deal shows 16% off
- [ ] Glo deal shows cashback
- [ ] Click deal - confirm modal
- [ ] Confirm purchase - success modal
- [ ] Success shows cashback amount

**Rewards Journey:**
- [ ] Navigate to Rewards Need Box
- [ ] Points display: 1,250
- [ ] Tier shows: Silver
- [ ] 3 rewards displayed
- [ ] Available rewards clickable
- [ ] Locked rewards grayed out
- [ ] Click available reward - confirm modal
- [ ] Redeem - points deducted

**AI Assistant:**
- [ ] Click AI button - bottom sheet opens
- [ ] 4 quick actions visible
- [ ] Click "Pay Bills" - response appears
- [ ] Auto-navigates to Bills after 2 seconds
- [ ] Type message - send button works
- [ ] Voice button shows "Coming Soon"
- [ ] Chat history displays correctly
- [ ] Close button works

**Settings:**
- [ ] Click user icon - Settings opens
- [ ] Profile card shows user info
- [ ] 2 linked accounts displayed
- [ ] Toggle Quiet Mode - state changes
- [ ] Toggle Biometrics - state changes
- [ ] Toggle WhatsApp - state changes
- [ ] Language section shows "Coming Soon"
- [ ] Back button returns to Home

**Navigation:**
- [ ] All Need Box tiles navigate correctly
- [ ] Back buttons return to Home
- [ ] Home button from any screen works
- [ ] Scroll works smoothly
- [ ] No layout breaks on mobile
- [ ] No console errors in DevTools

**Pass Criteria**: All checkboxes must be checked

---

## 🛡️ Change Management Guardrails

### CRITICAL RULES - NEVER VIOLATE

#### 1. Data Structure Integrity
**RULE**: Never remove or rename existing fields in demoData.json without migration plan

❌ **FORBIDDEN**:
```json
// BAD - Removing existing field
{
  "user": {
    "id": "user_001",
    // "firstName": "Adebayo",  // REMOVED - BREAKS EVERYTHING
    "name": "Adebayo Okonkwo"  // Changed structure
  }
}
```

✅ **ALLOWED**:
```json
// GOOD - Adding new fields is safe
{
  "user": {
    "id": "user_001",
    "firstName": "Adebayo",  // Keep existing
    "lastName": "Okonkwo",   // Keep existing
    "fullName": "Adebayo Okonkwo"  // New field OK
  }
}
```

#### 2. Function Signature Preservation
**RULE**: Never change existing function signatures without updating all call sites

❌ **FORBIDDEN**:
```javascript
// BAD - Changing signature breaks existing calls
// Old: handleAction(boxId, actionId)
handleAction(boxId, actionId, extraParam) { // Added required param
  // This breaks all existing calls
}
```

✅ **ALLOWED**:
```javascript
// GOOD - Optional parameters are safe
handleAction(boxId, actionId, options = {}) {
  // Existing calls still work
  // New functionality available if needed
}
```

#### 3. Need Box Integrity
**RULE**: Never remove or break existing Need Boxes (bills, debt, shopping, rewards)

❌ **FORBIDDEN**:
- Removing any of the 4 fully functional Need Boxes
- Changing Need Box IDs
- Removing required properties (actions, insights, etc.)

✅ **ALLOWED**:
- Adding new Need Boxes
- Adding new actions to existing boxes
- Enhancing display of existing boxes

#### 4. UI Component Stability
**RULE**: Changes to one component must not affect others

**Before changing any component:**
1. Identify all components that might be affected
2. Test each affected component individually
3. Test interactions between components
4. Verify no visual regressions

#### 5. Backwards Compatibility
**RULE**: New features must work with existing data structures

❌ **FORBIDDEN**:
```javascript
// BAD - Requires new data format
renderAccount(account) {
  // Assumes account.newField exists
  return account.newField.value // Breaks if newField doesn't exist
}
```

✅ **ALLOWED**:
```javascript
// GOOD - Safe access with fallback
renderAccount(account) {
  const value = account.newField?.value || account.balance
  return value
}
```

---

## 🐛 Bug Fix Protocol

### Step-by-Step Process

#### 1. Bug Identification
- [ ] **Document Bug**: Write clear description of issue
- [ ] **Reproduce Bug**: Verify you can reproduce consistently
- [ ] **Identify Scope**: Determine which components are affected
- [ ] **Check Git History**: See when bug was introduced

#### 2. Impact Assessment
- [ ] **Severity**: Critical / High / Medium / Low
- [ ] **Affected Features**: List all affected user journeys
- [ ] **User Impact**: How many users/features affected?
- [ ] **Workaround Available**: Is there a temporary workaround?

#### 3. Fix Planning
- [ ] **Root Cause**: Identify the underlying cause
- [ ] **Solution Design**: Plan the fix approach
- [ ] **Risk Assessment**: Will fix potentially break anything else?
- [ ] **Test Plan**: Write specific tests for the bug

#### 4. Implementation
- [ ] **Create Branch**: `git checkout -b bugfix/issue-description`
- [ ] **Run Baseline Tests**: Confirm bug exists
- [ ] **Implement Fix**: Make minimal changes needed
- [ ] **Test Fix**: Verify bug is resolved
- [ ] **Run Level 2 Tests**: Ensure no side effects

#### 5. Validation
- [ ] **Manual Testing**: Test the specific bug scenario
- [ ] **Run Level 3 Tests**: Full regression
- [ ] **Cross-Feature Testing**: Test related features
- [ ] **Performance Check**: Ensure no performance regression

#### 6. Documentation
- [ ] **Update CHANGELOG**: Add to "Bug Fixes" section
- [ ] **Git Commit**: `fix: [component] description of bug fix`
- [ ] **Test Results**: Document which tests passed

#### 7. Deployment
- [ ] **Build**: `npm run build` succeeds
- [ ] **Restart**: `pm2 restart webapp`
- [ ] **Smoke Test**: Quick verification in production
- [ ] **Monitor**: Watch for any new issues

### Bug Fix Template

```markdown
## Bug Fix: [Brief Description]

**Bug ID**: BUG-001
**Date**: 2026-03-04
**Severity**: [Critical/High/Medium/Low]
**Reporter**: [Name]

### Description
[Clear description of the bug]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Result - What happens]

### Expected Behavior
[What should happen instead]

### Root Cause
[Technical explanation of why bug occurred]

### Solution
[Explanation of the fix implemented]

### Files Changed
- `path/to/file1.js`
- `path/to/file2.json`

### Tests Added/Modified
- [Test 1]
- [Test 2]

### Regression Testing Results
- Level 1: ✅ PASSED
- Level 2: ✅ PASSED
- Level 3: ✅ PASSED

### Verification
- [ ] Bug no longer reproduces
- [ ] All related features work
- [ ] No new bugs introduced
- [ ] Documentation updated
```

---

## 🚀 New Feature Protocol

### Step-by-Step Process

#### 1. Feature Planning
- [ ] **Requirements**: Write clear feature requirements
- [ ] **Use Cases**: Define all use cases
- [ ] **UI/UX Design**: Sketch or describe UI changes
- [ ] **Data Model**: Plan any data structure changes
- [ ] **Dependencies**: Identify dependent components

#### 2. Design Review
- [ ] **Consistency Check**: Fits with existing design patterns?
- [ ] **Performance Impact**: Any performance concerns?
- [ ] **Mobile Compatibility**: Works on mobile screens?
- [ ] **Accessibility**: Considers accessibility needs?

#### 3. Impact Assessment
- [ ] **Breaking Changes**: Will this break anything?
- [ ] **Migration Needed**: Do users need to migrate data?
- [ ] **Backwards Compatibility**: Works with old data?
- [ ] **Version Bump**: What version number? (MAJOR.MINOR.PATCH)

#### 4. Implementation Planning
- [ ] **Phased Approach**: Can feature be built incrementally?
- [ ] **Feature Flag**: Should feature have toggle?
- [ ] **Rollback Plan**: How to rollback if needed?
- [ ] **Test Strategy**: How will feature be tested?

#### 5. Development
- [ ] **Create Branch**: `git checkout -b feature/feature-name`
- [ ] **Implement Core**: Build core functionality
- [ ] **Implement UI**: Build user interface
- [ ] **Add Data**: Update demoData.json if needed
- [ ] **Self Test**: Test as you build

#### 6. Testing
- [ ] **Unit Tests**: Test individual functions
- [ ] **Integration Tests**: Test feature with existing features
- [ ] **Level 2 Tests**: Run core functionality tests
- [ ] **Level 3 Tests**: Run full regression
- [ ] **Manual Testing**: Complete Level 4 checklist

#### 7. Documentation
- [ ] **Update CHANGELOG**: Add to "New Features" section
- [ ] **Update README**: Document new feature
- [ ] **Code Comments**: Add clear comments
- [ ] **User Guide**: Update usage instructions

#### 8. Deployment
- [ ] **Build**: `npm run build` succeeds
- [ ] **Restart**: `pm2 restart webapp`
- [ ] **Smoke Test**: Quick verification
- [ ] **Full Test**: Run Level 2 tests on live deployment

### New Feature Template

```markdown
## New Feature: [Feature Name]

**Feature ID**: FEAT-001
**Date**: 2026-03-04
**Version**: [1.2.0]
**Author**: [Name]

### Feature Description
[Clear description of what the feature does]

### User Stories
- As a [user type], I want to [action] so that [benefit]
- As a [user type], I want to [action] so that [benefit]

### Use Cases
1. **Use Case 1**: [Description]
   - Preconditions: [What must be true first]
   - Steps: [User actions]
   - Expected Result: [What happens]

### Design
[UI mockup or description]

### Data Model Changes
```json
{
  "newField": "description",
  "newArray": []
}
```

### New Functions
- `functionName(params)` - Description

### Modified Functions
- `existingFunction()` - How it was modified

### Files Changed
- `new/file.js` - Created
- `existing/file.js` - Modified

### Testing Results
- Level 1: ✅ PASSED
- Level 2: ✅ PASSED
- Level 3: ✅ PASSED
- Level 4: ✅ PASSED

### Screenshots
[Before/After screenshots if applicable]

### Known Limitations
- [Limitation 1]
- [Limitation 2]
```

---

## 🔄 Rollback Procedures

### When to Rollback

**Immediate Rollback if:**
- Critical bug introduced that breaks core functionality
- Data corruption detected
- Performance degradation > 50%
- Security vulnerability introduced
- Multiple features broken

**Rollback Process:**

#### 1. Identify Issue
```bash
# Check recent commits
git log --oneline -5

# Identify problematic commit
git log --oneline | grep "feature-name"
```

#### 2. Revert Commit
```bash
# Soft revert (keeps changes for fixing)
git revert <commit-hash>

# Or hard revert (removes changes completely)
git reset --hard <previous-good-commit>
```

#### 3. Rebuild & Restart
```bash
# Rebuild application
npm run build

# Restart server
pm2 restart webapp

# Verify rollback worked
npm run test:level1
```

#### 4. Document Rollback
```markdown
## Rollback: [Feature Name]

**Date**: 2026-03-04
**Rolled Back**: Commit <hash>
**Reason**: [Clear explanation]

### Issue Encountered
[Description of what went wrong]

### Rollback Actions
- Reverted commit <hash>
- Rebuilt application
- Restarted server

### Next Steps
- [ ] Fix underlying issue
- [ ] Add tests to prevent recurrence
- [ ] Re-implement feature safely
```

#### 5. Communicate
- Document in CHANGELOG.md
- Update any relevant documentation
- Note lessons learned

---

## 📚 Documentation Requirements

### CHANGELOG.md Format

```markdown
## [Version] - YYYY-MM-DD

### 🚀 New Features
- **Feature Name**: Description of feature

### 🐛 Bug Fixes
- **Bug Description**: How it was fixed

### 🔄 Changes
- **Change Description**: What changed and why

### 🗑️ Deprecated
- **Deprecated Feature**: Migration path

### ⚡ Performance
- **Improvement**: Measurement and impact

### 🔒 Security
- **Security Fix**: Description (avoid details)

### 📝 Documentation
- **Doc Update**: What was documented
```

### Git Commit Messages

**Format**: `<type>(<scope>): <description>`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(bills): add accounts dashboard with transaction history
fix(rewards): correct points calculation on redemption
docs(readme): update installation instructions
style(app): format code with prettier
refactor(ai): simplify query handling logic
perf(dashboard): optimize transaction rendering
test(bills): add transaction toggle tests
chore(deps): update dependency versions
```

---

## 🎯 Success Criteria

### For Any Change

A change is considered **SUCCESSFUL** only if:

1. ✅ **All Level 3 Tests Pass** (50+ tests)
2. ✅ **No Console Errors** in browser DevTools
3. ✅ **Build Succeeds** without warnings
4. ✅ **Visual Regression** - No unintended UI changes
5. ✅ **Performance** - No degradation > 10%
6. ✅ **Documentation** - CHANGELOG.md updated
7. ✅ **Git Commit** - Clear, descriptive message
8. ✅ **Manual Testing** - Level 4 checklist completed
9. ✅ **Code Quality** - Follows existing patterns
10. ✅ **Backwards Compatible** - Works with existing data

### Validation Checklist

Before declaring any change complete:

```markdown
## Change Validation Checklist

### Testing
- [ ] Level 1 (Smoke) - All tests pass
- [ ] Level 2 (Core) - All tests pass  
- [ ] Level 3 (Regression) - All tests pass
- [ ] Level 4 (Manual) - All scenarios tested
- [ ] No console errors
- [ ] No build warnings

### Functionality
- [ ] New feature works as intended
- [ ] Existing features still work
- [ ] No breaking changes
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Cross-browser compatible (if applicable)

### Code Quality
- [ ] Code follows existing patterns
- [ ] Functions well-named and documented
- [ ] No code duplication
- [ ] Error handling implemented
- [ ] No security vulnerabilities

### Documentation
- [ ] CHANGELOG.md updated
- [ ] README.md updated (if needed)
- [ ] Code comments added
- [ ] Git commit message clear
- [ ] Test documentation updated

### Deployment
- [ ] Build succeeds
- [ ] Server restarts successfully
- [ ] Post-deploy smoke test passed
- [ ] No errors in PM2 logs
```

---

## 🚨 Emergency Procedures

### Critical Production Issues

**IF production is broken:**

1. **Immediate Action** (< 5 minutes):
   ```bash
   # Rollback to last known good commit
   git log --oneline -10
   git reset --hard <last-good-commit>
   npm run build
   pm2 restart webapp
   ```

2. **Verify Fix** (< 2 minutes):
   ```bash
   curl http://localhost:3000
   npm run test:level1
   ```

3. **Document Incident**:
   - What broke
   - What time
   - How it was fixed
   - Root cause
   - Prevention plan

4. **Post-Mortem**:
   - Why did issue reach production?
   - What tests missed it?
   - How to prevent in future?
   - Update testing protocol if needed

---

## 📊 Testing Scripts Quick Reference

### Save These Scripts

```bash
# Create testing directory
mkdir -p /home/user/webapp/tests

# Save Level 1 test
# (Copy Level 1 script from above)
cat > /home/user/webapp/tests/level1_smoke.sh << 'EOF'
[Level 1 script content]
EOF
chmod +x /home/user/webapp/tests/level1_smoke.sh

# Save Level 2 test
cat > /home/user/webapp/tests/level2_core.sh << 'EOF'
[Level 2 script content]
EOF
chmod +x /home/user/webapp/tests/level2_core.sh

# Save Level 3 test
cat > /home/user/webapp/tests/level3_regression.sh << 'EOF'
[Level 3 script content]
EOF
chmod +x /home/user/webapp/tests/level3_regression.sh
```

### Run Tests

```bash
# Quick check
cd /home/user/webapp && ./tests/level1_smoke.sh

# Before committing
cd /home/user/webapp && ./tests/level2_core.sh

# Before deploying
cd /home/user/webapp && ./tests/level3_regression.sh

# Run all tests
cd /home/user/webapp && \
  ./tests/level1_smoke.sh && \
  ./tests/level2_core.sh && \
  ./tests/level3_regression.sh && \
  echo "🎉 ALL TESTS PASSED!"
```

---

## 📝 Summary

This protocol ensures:

✅ **Consistency** - All changes follow the same process
✅ **Quality** - Multiple testing levels catch issues
✅ **Safety** - Guardrails prevent breaking changes
✅ **Documentation** - All changes are tracked
✅ **Rollback** - Quick recovery if issues occur
✅ **Knowledge** - Future developers understand the system

**Remember**: 
- Test BEFORE you commit
- Document EVERYTHING
- No breaking changes
- When in doubt, test again

---

**Last Updated**: 2026-03-04
**Version**: 1.0.0
**Maintainer**: AI-Mobile Development Team
