# Quick Reference Guide - Testing & Change Management

## 🚀 Quick Start

### Before Making ANY Changes
```bash
# 1. Run baseline tests
npm run test:level2

# 2. Make your changes
# ... edit files ...

# 3. Test your changes
npm run test:level2

# 4. If all pass, commit
git add .
git commit -m "your message"

# 5. Build and deploy
npm run build
pm2 restart webapp
```

## 📋 Test Commands

### Quick Commands
```bash
npm run test:level1    # Smoke tests (5 min) - Use before committing
npm run test:level2    # Core tests (15 min) - Use before deploying  
npm run test:level3    # Full regression (30 min) - Use before releases
npm run test:all       # All tests (50 min) - Use before major changes
npm run test:quick     # Level 1 + 2 (20 min) - Good balance
```

### Direct Script Execution
```bash
./tests/level1_smoke.sh        # 5 tests
./tests/level2_core.sh         # 29 tests
./tests/level3_regression.sh   # 70+ tests
./tests/run_all.sh            # All tests
```

## ✅ Test Pass Criteria

- **Level 1**: 5/5 tests must pass
- **Level 2**: 29/29 tests must pass
- **Level 3**: 70+/70+ tests must pass

## 🛡️ Critical Rules

### NEVER Do This ❌
1. Remove existing fields from demoData.json
2. Change function signatures without updating all calls
3. Remove or break Need Boxes (bills, debt, shopping, rewards)
4. Commit without running tests
5. Deploy without building first

### ALWAYS Do This ✅
1. Run tests before committing
2. Update CHANGELOG.md for all changes
3. Use clear git commit messages
4. Build before restarting server
5. Test after deployment

## 🔄 Standard Workflow

### For Bug Fixes
```bash
# 1. Reproduce bug
# 2. Run baseline: npm run test:level2
# 3. Fix bug
# 4. Test fix: npm run test:level2
# 5. Update CHANGELOG.md
# 6. Commit: git commit -m "fix: description"
# 7. Build: npm run build
# 8. Deploy: pm2 restart webapp
```

### For New Features
```bash
# 1. Plan feature
# 2. Run baseline: npm run test:level3
# 3. Implement feature
# 4. Test feature: npm run test:level3
# 5. Update CHANGELOG.md
# 6. Update README.md
# 7. Commit: git commit -m "feat: description"
# 8. Build: npm run build
# 9. Deploy: pm2 restart webapp
```

## 📊 Test Levels Explained

### Level 1: Smoke Tests (5 minutes)
**When**: Before every commit
**Tests**: 5 basic checks
- Home page loads
- CSS loads
- JavaScript loads
- Demo data loads
- Server responds

**Pass Criteria**: All 5 must pass

### Level 2: Core Functionality (15 minutes)
**When**: Before deploying
**Tests**: 29 feature checks
- Data structures intact
- All Need Boxes present
- Core functions exist
- UI components render

**Pass Criteria**: All 29 must pass

### Level 3: Regression Tests (30 minutes)
**When**: Before major releases
**Tests**: 70+ comprehensive checks
- All user journeys work
- Accounts & cards functional
- Transactions display
- AI Assistant works
- Settings functional
- Navigation works

**Pass Criteria**: All 70+ must pass

## 🐛 What to Do If Tests Fail

### Step 1: Identify Failed Test
```bash
npm run test:level2 2>&1 | grep "❌"
```

### Step 2: Check What Changed
```bash
git diff
git log --oneline -5
```

### Step 3: Fix or Rollback
```bash
# Option A: Fix the issue
# ... make fixes ...
npm run test:level2

# Option B: Rollback
git reset --hard HEAD~1
npm run build
pm2 restart webapp
```

## 📝 Git Commit Format

```bash
<type>(<scope>): <description>

# Examples:
git commit -m "feat(bills): add transaction history toggle"
git commit -m "fix(rewards): correct points calculation"
git commit -m "docs(readme): update installation steps"
```

**Types**: feat, fix, docs, style, refactor, perf, test, chore

## 🚨 Emergency Rollback

```bash
# If production is broken:
git log --oneline -5
git reset --hard <last-good-commit>
npm run build
pm2 restart webapp
npm run test:level1
```

## 📚 Documentation Files

- **REGRESSION_TESTING.md** - Complete testing protocol (27KB)
- **CHANGELOG.md** - Version history
- **README.md** - Project documentation
- **QUICK_REFERENCE.md** - This file

## 🎯 Success Checklist

Before declaring a change complete:

- [ ] All tests pass (Level 2 minimum)
- [ ] No console errors in browser
- [ ] Build succeeds without warnings
- [ ] CHANGELOG.md updated
- [ ] Git commit with clear message
- [ ] Server restarts successfully
- [ ] Manual verification in browser

## 💡 Pro Tips

1. **Test Often**: Don't wait until the end
2. **Commit Small**: Many small commits > one large commit
3. **Write Clear Messages**: Your future self will thank you
4. **Document Everything**: If you made a change, document it
5. **When in Doubt, Test**: Better safe than sorry

## 🔗 Quick Links

- Full Testing Protocol: [REGRESSION_TESTING.md](./REGRESSION_TESTING.md)
- Change History: [CHANGELOG.md](./CHANGELOG.md)
- Project Docs: [README.md](./README.md)

---

**Last Updated**: 2026-03-04
**Version**: 1.0.0
