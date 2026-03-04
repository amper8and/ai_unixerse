// AI-Mobile Lifestyle Banking - Main Application
// This app provides a comprehensive demo of lifestyle banking features

class AIBank {
  constructor() {
    this.data = null;
    this.currentView = 'home';
    this.currentNeedBox = null;
    this.aiAssistantOpen = false;
    this.settingsOpen = false;
    this.init();
  }

  async init() {
    try {
      const response = await fetch('/data/demoData.json');
      this.data = await response.json();
      this.render();
      this.attachEventListeners();
    } catch (error) {
      console.error('Failed to load demo data:', error);
      document.getElementById('app').innerHTML = `
        <div class="p-8 text-center">
          <i class="fas fa-exclamation-circle text-6xl text-red-500 mb-4"></i>
          <h2 class="text-xl font-bold mb-2">Failed to Load</h2>
          <p class="text-gray-600">Please refresh the page</p>
        </div>
      `;
    }
  }

  render() {
    const app = document.getElementById('app');
    
    if (this.currentView === 'home') {
      app.innerHTML = this.renderHome();
    } else if (this.currentView === 'needBox') {
      app.innerHTML = this.renderNeedBoxDetail(this.currentNeedBox);
    } else if (this.currentView === 'settings') {
      app.innerHTML = this.renderSettings();
    }

    // Always render AI Assistant button
    this.renderAIAssistant();
  }

  renderHome() {
    const { user, heroCards, needBoxes } = this.data;
    
    return `
      <div class="app-container">
        <!-- Header -->
        <div class="bg-gradient-to-r from-primary to-teal-600 text-white p-6 pb-8 rounded-b-3xl">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h1 class="text-2xl font-bold">${user.greeting}, ${user.firstName}</h1>
              <p class="text-white/80 text-sm mt-1">Your lifestyle banking assistant</p>
            </div>
            <button onclick="aiBank.openSettings()" class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
              <i class="fas fa-user text-xl"></i>
            </button>
          </div>

          <!-- Hero Carousel -->
          <div class="carousel-container flex gap-3 -mb-12" style="overflow-x: auto;">
            ${heroCards.map(card => `
              <div class="carousel-card min-w-[280px] rounded-2xl p-5 text-white" 
                   style="background: ${card.background}; box-shadow: 0 8px 24px rgba(0,0,0,0.15);"
                   onclick="aiBank.navigateToNeedBox('${card.targetBox}')">
                <i class="fas ${card.icon} text-3xl mb-3"></i>
                <h3 class="font-bold text-lg mb-1">${card.title}</h3>
                <p class="text-sm text-white/90 mb-3">${card.subtitle}</p>
                <button class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-semibold">
                  ${card.action} <i class="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Need Boxes Grid -->
        <div class="mt-16 px-4 pb-32">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Your Needs</h2>
          <div class="bento-grid">
            ${needBoxes.map(box => this.renderNeedBoxTile(box)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderNeedBoxTile(box) {
    const badgeHtml = box.badge ? `
      <div class="badge badge-${box.badge}">${box.badgeText}</div>
    ` : '';

    const phaseLabel = box.phase === 'lite' ? `
      <span class="text-xs text-gray-400 font-semibold">COMING SOON</span>
    ` : box.phase === 'partial' ? `
      <span class="text-xs text-gray-400 font-semibold">PARTIAL</span>
    ` : '';

    const featuredClass = box.featured ? 'featured' : '';
    const cursorClass = box.phase === 'full' ? 'cursor-pointer' : 'cursor-not-allowed opacity-60';
    const onclick = box.phase === 'full' ? `onclick="aiBank.navigateToNeedBox('${box.id}')"` : '';

    return `
      <div class="need-box-tile ${featuredClass} ${cursorClass}" ${onclick}>
        ${badgeHtml}
        <div>
          <div class="need-box-icon" style="background: ${box.bgColor}; color: ${box.color};">
            <i class="fas ${box.icon}"></i>
          </div>
          <h3 class="font-bold text-sm mb-1 ${box.featured ? 'text-white' : 'text-gray-800'}">${box.title}</h3>
          <p class="text-xs ${box.featured ? 'text-white/80' : 'text-gray-600'}">${box.status}</p>
          ${phaseLabel}
        </div>
        ${box.progress > 0 ? `
          <div class="mt-3">
            <div class="w-full bg-white/20 rounded-full h-1.5">
              <div class="bg-white h-1.5 rounded-full" style="width: ${box.progress}%"></div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  renderNeedBoxDetail(boxId) {
    const box = this.data.needBoxes.find(b => b.id === boxId);
    if (!box) return this.renderHome();

    return `
      <div class="app-container min-h-screen pb-24">
        <!-- Header -->
        <div class="p-6 rounded-b-3xl" style="background: linear-gradient(135deg, ${box.color} 0%, ${box.color}dd 100%);">
          <div class="flex items-center gap-4 mb-6">
            <button onclick="aiBank.navigateToHome()" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
              <i class="fas fa-arrow-left text-white"></i>
            </button>
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-white">${box.title}</h1>
              <p class="text-white/80 text-sm">${box.status}</p>
            </div>
          </div>

          ${box.progress > 0 ? `
            <div class="bg-white/20 rounded-2xl p-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-white font-semibold">Progress</span>
                <span class="text-white font-bold">${box.progress}%</span>
              </div>
              <div class="w-full bg-white/20 rounded-full h-2">
                <div class="bg-white h-2 rounded-full transition-all duration-500" style="width: ${box.progress}%"></div>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Content -->
        <div class="p-6">
          <!-- Insights -->
          ${box.insights && box.insights.length > 0 ? `
            <div class="mb-6">
              <h2 class="text-lg font-bold text-gray-800 mb-3">
                <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>Insights
              </h2>
              <div class="space-y-2">
                ${box.insights.map(insight => `
                  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r">
                    <p class="text-sm text-gray-700">${insight}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Actions -->
          ${box.actions && box.actions.length > 0 ? `
            <div class="mb-6">
              <h2 class="text-lg font-bold text-gray-800 mb-3">
                <i class="fas fa-tasks mr-2" style="color: ${box.color};"></i>Next Best Actions
              </h2>
              <div class="space-y-3">
                ${box.actions.map(action => `
                  <div class="action-card ${action.completed ? 'completed' : ''}" 
                       onclick="aiBank.handleAction('${boxId}', '${action.id}')">
                    <div class="flex items-start gap-3">
                      <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" 
                           style="background: ${box.bgColor}; color: ${box.color};">
                        <i class="fas ${action.completed ? 'fa-check' : 'fa-circle-dot'}"></i>
                      </div>
                      <div class="flex-1">
                        <h3 class="font-semibold text-gray-800 mb-1">${action.title}</h3>
                        <p class="text-sm text-gray-600">${action.description}</p>
                        ${action.priority === 'high' ? '<span class="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">High Priority</span>' : ''}
                      </div>
                      <i class="fas fa-chevron-right text-gray-400"></i>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Specific Content Based on Need Box -->
          ${this.renderNeedBoxSpecificContent(box)}
        </div>
      </div>
    `;
  }

  renderNeedBoxSpecificContent(box) {
    if (box.id === 'bills' && box.bills) {
      return `
        <div class="mb-6">
          <h2 class="text-lg font-bold text-gray-800 mb-3">
            <i class="fas fa-file-invoice mr-2" style="color: ${box.color};"></i>Upcoming Bills
          </h2>
          <div class="space-y-3">
            ${box.bills.map(bill => `
              <div class="bg-white rounded-xl p-4 border-2 ${bill.autopay ? 'border-green-200' : 'border-gray-200'}">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <i class="fas ${bill.icon} text-xl" style="color: ${box.color};"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800">${bill.provider}</h3>
                      <p class="text-sm text-gray-500">Due: ${new Date(bill.dueDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-bold text-lg" style="color: ${box.color};">₦${bill.amount.toLocaleString()}</div>
                    ${bill.autopay ? '<span class="text-xs text-green-600 font-semibold">AUTO-PAY ON</span>' : '<span class="text-xs text-gray-500">Manual</span>'}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (box.id === 'debt' && box.debts) {
      return `
        <div class="mb-6">
          <h2 class="text-lg font-bold text-gray-800 mb-3">
            <i class="fas fa-list-ol mr-2" style="color: ${box.color};"></i>Debt Payoff Priority
          </h2>
          <div class="space-y-3">
            ${box.debts.map((debt, index) => `
              <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full font-bold flex items-center justify-center" 
                         style="background: ${box.bgColor}; color: ${box.color};">
                      ${index + 1}
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800">${debt.creditor}</h3>
                      <p class="text-sm text-gray-500">${debt.interestRate}% interest</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-bold text-lg text-gray-800">₦${debt.balance.toLocaleString()}</div>
                    <p class="text-xs text-gray-500">Min: ₦${debt.minimumPayment.toLocaleString()}</p>
                  </div>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                  <div class="h-2 rounded-full" style="width: ${(debt.balance / 100000 * 100)}%; background: ${box.color};"></div>
                </div>
              </div>
            `).join('')}
          </div>
          
          ${box.debtPlan ? `
            <div class="mt-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fas fa-trophy text-yellow-500"></i>
                Your Debt-Free Plan
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-white/60 rounded-xl p-3">
                  <p class="text-xs text-gray-600 mb-1">Total Debt</p>
                  <p class="font-bold text-lg">₦${box.debtPlan.totalDebt.toLocaleString()}</p>
                </div>
                <div class="bg-white/60 rounded-xl p-3">
                  <p class="text-xs text-gray-600 mb-1">Monthly Payment</p>
                  <p class="font-bold text-lg">₦${box.debtPlan.monthlyPayment.toLocaleString()}</p>
                </div>
                <div class="bg-white/60 rounded-xl p-3">
                  <p class="text-xs text-gray-600 mb-1">Debt-Free Date</p>
                  <p class="font-bold text-sm">${box.debtPlan.estimatedPayoff}</p>
                </div>
                <div class="bg-white/60 rounded-xl p-3">
                  <p class="text-xs text-gray-600 mb-1">Interest Saved</p>
                  <p class="font-bold text-sm text-green-600">₦${box.debtPlan.interestSaved.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }

    if (box.id === 'shopping' && box.deals) {
      return `
        <div class="mb-6">
          <h2 class="text-lg font-bold text-gray-800 mb-3">
            <i class="fas fa-tag mr-2" style="color: ${box.color};"></i>Today's Best Deals
          </h2>
          <div class="space-y-3">
            ${box.deals.map(deal => `
              <div class="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-pink-300 cursor-pointer"
                   onclick="aiBank.handleDealPurchase('${deal.id}')">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center">
                      <i class="fas ${deal.icon} text-xl text-pink-500"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800">${deal.product}</h3>
                      <p class="text-sm text-gray-500">${deal.provider}</p>
                    </div>
                  </div>
                  ${deal.savingsPercent > 0 ? `
                    <div class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ${deal.savingsPercent}% OFF
                    </div>
                  ` : ''}
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    ${deal.regularPrice !== deal.discountPrice ? `
                      <span class="text-gray-400 line-through text-sm">₦${deal.regularPrice.toLocaleString()}</span>
                    ` : ''}
                    <span class="font-bold text-xl ml-2" style="color: ${box.color};">₦${deal.discountPrice.toLocaleString()}</span>
                  </div>
                  ${deal.cashback > 0 ? `
                    <div class="text-green-600 text-sm font-semibold">
                      +₦${deal.cashback} cashback
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (box.id === 'rewards' && box.rewards) {
      return `
        <div class="mb-6">
          <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-5 mb-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-sm text-gray-600 mb-1">Your Points</p>
                <p class="text-4xl font-bold" style="color: ${box.color};">${box.rewards.currentPoints}</p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-600 mb-1">Tier</p>
                <p class="text-xl font-bold text-gray-800">${box.rewards.tierName}</p>
                <p class="text-xs text-gray-500">${box.rewards.nextTier - box.rewards.currentPoints} to ${box.rewards.nextTierName}</p>
              </div>
            </div>
            <div class="w-full bg-white/60 rounded-full h-3">
              <div class="h-3 rounded-full" style="width: ${(box.rewards.currentPoints / box.rewards.nextTier * 100)}%; background: ${box.color};"></div>
            </div>
          </div>

          <h2 class="text-lg font-bold text-gray-800 mb-3">
            <i class="fas fa-gift mr-2" style="color: ${box.color};"></i>Redeem Rewards
          </h2>
          <div class="space-y-3">
            ${box.rewards.redeemable.map(reward => `
              <div class="bg-white rounded-xl p-4 border-2 ${reward.available ? 'border-gray-200 cursor-pointer hover:border-yellow-300' : 'border-gray-100 opacity-50'}"
                   ${reward.available ? `onclick="aiBank.handleRewardRedeem('${reward.id}')"` : ''}>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                      <i class="fas ${reward.icon} text-xl text-yellow-600"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800">${reward.name}</h3>
                      <p class="text-sm text-gray-500">Worth ₦${reward.value.toLocaleString()}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-lg" style="color: ${box.color};">${reward.points} pts</p>
                    ${reward.available ? 
                      '<span class="text-xs text-green-600 font-semibold">Available</span>' : 
                      '<span class="text-xs text-gray-400 font-semibold">Locked</span>'
                    }
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return '';
  }

  renderSettings() {
    const { user } = this.data;
    
    return `
      <div class="app-container min-h-screen pb-24">
        <!-- Header -->
        <div class="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6 rounded-b-3xl">
          <div class="flex items-center gap-4 mb-6">
            <button onclick="aiBank.navigateToHome()" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
              <i class="fas fa-arrow-left"></i>
            </button>
            <h1 class="text-2xl font-bold">Settings</h1>
          </div>

          <!-- Profile Card -->
          <div class="bg-white/10 rounded-2xl p-4 flex items-center gap-4">
            <img src="${user.avatar}" alt="Profile" class="w-16 h-16 rounded-full">
            <div>
              <h2 class="font-bold text-lg">${user.firstName} ${user.lastName}</h2>
              <p class="text-sm text-white/70">${user.email}</p>
            </div>
          </div>
        </div>

        <!-- Settings Sections -->
        <div class="p-6 space-y-6">
          <!-- Preferences -->
          <div class="bg-white rounded-2xl p-5 shadow-sm">
            <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-sliders-h text-primary"></i>
              Preferences
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-semibold text-gray-800">Quiet Mode</p>
                  <p class="text-sm text-gray-500">Pause non-urgent notifications</p>
                </div>
                <label class="relative inline-block w-12 h-6">
                  <input type="checkbox" ${user.preferences.quietMode ? 'checked' : ''} class="sr-only peer" onchange="aiBank.toggleSetting('quietMode')">
                  <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- Linked Accounts -->
          <div class="bg-white rounded-2xl p-5 shadow-sm">
            <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-university text-primary"></i>
              Linked Accounts
            </h3>
            <div class="space-y-3">
              ${this.data.accounts.map(account => `
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p class="font-semibold text-gray-800">${account.bank}</p>
                    <p class="text-sm text-gray-500">${account.accountNumber}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                      ${account.status}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Security -->
          <div class="bg-white rounded-2xl p-5 shadow-sm">
            <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-shield-alt text-primary"></i>
              Security
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-semibold text-gray-800">Biometric Login</p>
                  <p class="text-sm text-gray-500">Use fingerprint or face ID</p>
                </div>
                <label class="relative inline-block w-12 h-6">
                  <input type="checkbox" ${user.preferences.biometrics ? 'checked' : ''} class="sr-only peer" onchange="aiBank.toggleSetting('biometrics')">
                  <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- Notifications -->
          <div class="bg-white rounded-2xl p-5 shadow-sm">
            <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-bell text-primary"></i>
              Notifications
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-semibold text-gray-800">WhatsApp Updates</p>
                  <p class="text-sm text-gray-500">Receive updates via WhatsApp</p>
                </div>
                <label class="relative inline-block w-12 h-6">
                  <input type="checkbox" ${user.preferences.notifications.whatsapp ? 'checked' : ''} class="sr-only peer" onchange="aiBank.toggleSetting('whatsapp')">
                  <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- Language (Coming Soon) -->
          <div class="bg-white rounded-2xl p-5 shadow-sm opacity-60">
            <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-language text-primary"></i>
              Language
              <span class="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">COMING SOON</span>
            </h3>
            <p class="text-sm text-gray-500">English, Pidgin, Yoruba, Hausa, Igbo</p>
          </div>
        </div>
      </div>
    `;
  }

  renderAIAssistant() {
    if (this.aiAssistantOpen) {
      const overlay = document.createElement('div');
      overlay.id = 'ai-overlay';
      overlay.className = 'bottom-sheet-overlay';
      overlay.onclick = () => this.closeAIAssistant();

      const sheet = document.createElement('div');
      sheet.id = 'ai-sheet';
      sheet.className = 'bottom-sheet';
      sheet.onclick = (e) => e.stopPropagation();
      sheet.innerHTML = `
        <div class="bottom-sheet-handle"></div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            <i class="fas fa-robot text-primary mr-2"></i>
            AI Assistant
          </h2>
          <button onclick="aiBank.closeAIAssistant()" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
            <i class="fas fa-times text-gray-600"></i>
          </button>
        </div>

        <!-- Quick Actions -->
        <div class="mb-6">
          <p class="text-sm font-semibold text-gray-600 mb-3">Quick Actions</p>
          <div class="grid grid-cols-2 gap-2">
            <button onclick="aiBank.handleAIQuery('bills')" class="btn btn-secondary text-left">
              <i class="fas fa-file-invoice-dollar text-primary"></i>
              <span>Pay Bills</span>
            </button>
            <button onclick="aiBank.handleAIQuery('debt')" class="btn btn-secondary text-left">
              <i class="fas fa-chart-line text-purple-500"></i>
              <span>Debt Plan</span>
            </button>
            <button onclick="aiBank.handleAIQuery('data')" class="btn btn-secondary text-left">
              <i class="fas fa-signal text-pink-500"></i>
              <span>Buy Data</span>
            </button>
            <button onclick="aiBank.handleAIQuery('rewards')" class="btn btn-secondary text-left">
              <i class="fas fa-gift text-yellow-500"></i>
              <span>My Rewards</span>
            </button>
          </div>
        </div>

        <!-- Chat History -->
        <div id="chat-history" class="mb-6 max-h-64 overflow-y-auto">
          ${this.renderChatHistory()}
        </div>

        <!-- Input Area -->
        <div class="chat-input-area -mx-6 -mb-6">
          <button onclick="aiBank.handleVoiceInput()" class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20">
            <i class="fas fa-microphone text-primary text-xl"></i>
          </button>
          <input type="text" id="chat-input" placeholder="Ask me anything..." class="chat-input" onkeypress="if(event.key==='Enter') aiBank.sendChatMessage()">
          <button onclick="aiBank.sendChatMessage()" class="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90">
            <i class="fas fa-paper-plane text-white"></i>
          </button>
        </div>
      `;

      document.body.appendChild(overlay);
      document.body.appendChild(sheet);
    } else {
      // Remove AI assistant UI if it exists
      const overlay = document.getElementById('ai-overlay');
      const sheet = document.getElementById('ai-sheet');
      if (overlay) overlay.remove();
      if (sheet) sheet.remove();
    }
  }

  renderChatHistory() {
    if (!this.data.chatHistory || this.data.chatHistory.length === 0) {
      return `
        <div class="text-center py-8 text-gray-400">
          <i class="fas fa-comments text-4xl mb-3"></i>
          <p>No messages yet. Ask me anything!</p>
        </div>
      `;
    }

    return this.data.chatHistory.map(msg => `
      <div class="chat-message ${msg.role}">
        <div class="chat-bubble ${msg.role}">
          ${msg.content}
        </div>
      </div>
    `).join('');
  }

  // Navigation
  navigateToHome() {
    this.currentView = 'home';
    this.currentNeedBox = null;
    this.render();
    window.scrollTo(0, 0);
  }

  navigateToNeedBox(boxId) {
    const box = this.data.needBoxes.find(b => b.id === boxId);
    if (!box || box.phase !== 'full') return;
    
    this.currentView = 'needBox';
    this.currentNeedBox = boxId;
    this.render();
    window.scrollTo(0, 0);
  }

  openSettings() {
    this.currentView = 'settings';
    this.render();
    window.scrollTo(0, 0);
  }

  openAIAssistant() {
    this.aiAssistantOpen = true;
    this.renderAIAssistant();
  }

  closeAIAssistant() {
    this.aiAssistantOpen = false;
    this.renderAIAssistant();
  }

  // Actions
  handleAction(boxId, actionId) {
    const box = this.data.needBoxes.find(b => b.id === boxId);
    const action = box?.actions.find(a => a.id === actionId);
    
    if (!action) return;

    // Simulate action completion
    this.showModal({
      title: action.title,
      message: `Starting: ${action.description}`,
      icon: 'fa-spinner fa-spin',
      iconColor: 'text-primary',
      buttons: [
        {
          text: 'Continue',
          class: 'btn-primary',
          action: () => {
            action.completed = true;
            box.progress = Math.min(100, box.progress + 15);
            this.closeModal();
            this.render();
          }
        },
        {
          text: 'Cancel',
          class: 'btn-secondary',
          action: () => this.closeModal()
        }
      ]
    });
  }

  handleDealPurchase(dealId) {
    const box = this.data.needBoxes.find(b => b.id === 'shopping');
    const deal = box?.deals.find(d => d.id === dealId);
    
    if (!deal) return;

    this.showModal({
      title: 'Confirm Purchase',
      message: `Buy ${deal.product} for ₦${deal.discountPrice.toLocaleString()}?`,
      icon: 'fa-shopping-cart',
      iconColor: 'text-pink-500',
      buttons: [
        {
          text: 'Confirm & Pay',
          class: 'btn-primary',
          action: () => {
            this.closeModal();
            setTimeout(() => {
              this.showModal({
                title: 'Success!',
                message: `${deal.product} purchased successfully! ${deal.cashback > 0 ? `You earned ₦${deal.cashback} cashback!` : ''}`,
                icon: 'fa-check-circle',
                iconColor: 'text-green-500',
                buttons: [
                  {
                    text: 'Great!',
                    class: 'btn-primary',
                    action: () => this.closeModal()
                  }
                ]
              });
            }, 500);
          }
        },
        {
          text: 'Cancel',
          class: 'btn-secondary',
          action: () => this.closeModal()
        }
      ]
    });
  }

  handleRewardRedeem(rewardId) {
    const box = this.data.needBoxes.find(b => b.id === 'rewards');
    const reward = box?.rewards.redeemable.find(r => r.id === rewardId);
    
    if (!reward || !reward.available) return;

    this.showModal({
      title: 'Redeem Reward',
      message: `Redeem ${reward.points} points for ${reward.name}?`,
      icon: 'fa-gift',
      iconColor: 'text-yellow-500',
      buttons: [
        {
          text: 'Redeem',
          class: 'btn-primary',
          action: () => {
            box.rewards.currentPoints -= reward.points;
            this.closeModal();
            setTimeout(() => {
              this.showModal({
                title: 'Redeemed!',
                message: `${reward.name} has been added to your account!`,
                icon: 'fa-check-circle',
                iconColor: 'text-green-500',
                buttons: [
                  {
                    text: 'Awesome!',
                    class: 'btn-primary',
                    action: () => {
                      this.closeModal();
                      this.render();
                    }
                  }
                ]
              });
            }, 500);
          }
        },
        {
          text: 'Cancel',
          class: 'btn-secondary',
          action: () => this.closeModal()
        }
      ]
    });
  }

  handleAIQuery(query) {
    const queries = {
      'bills': 'Show me my bills due this week',
      'debt': 'Help me become debt free',
      'data': 'Buy data for me',
      'rewards': 'Show me my rewards'
    };

    const message = queries[query] || query;
    
    // Add user message
    this.data.chatHistory.push({
      role: 'user',
      content: message
    });

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      let targetBox = null;

      if (query === 'bills') {
        response = "I see you have 3 bills due this week: AEDC (₦8,500), DStv (₦24,500), and Spectranet (₦15,000). Would you like me to help you review and set up auto-pay?";
        targetBox = 'bills';
      } else if (query === 'debt') {
        response = "I've created a personalized 6-month debt-free plan for you. You'll save ₦45,000 in interest! Let me show you the details.";
        targetBox = 'debt';
      } else if (query === 'data') {
        response = "I found a great deal for you! MTN 8GB for ₦4,200 (16% off). Would you like to purchase it now?";
        targetBox = 'shopping';
      } else if (query === 'rewards') {
        response = "You have 1,250 points! You can redeem them for 3GB data bundle (1,000 pts) or ₦2,000 airtime (800 pts). What would you like?";
        targetBox = 'rewards';
      }

      this.data.chatHistory.push({
        role: 'assistant',
        content: response
      });

      this.renderAIAssistant();

      // Auto-scroll to bottom
      const chatHistory = document.getElementById('chat-history');
      if (chatHistory) {
        chatHistory.scrollTop = chatHistory.scrollHeight;
      }

      // Navigate to relevant box after a delay
      if (targetBox) {
        setTimeout(() => {
          this.closeAIAssistant();
          this.navigateToNeedBox(targetBox);
        }, 2000);
      }
    }, 1000);

    this.renderAIAssistant();
  }

  sendChatMessage() {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;

    const message = input.value.trim();
    input.value = '';

    this.handleAIQuery(message);
  }

  handleVoiceInput() {
    this.showModal({
      title: 'Voice Input',
      message: 'Voice input is simulated in this demo. In production, this would use speech recognition.',
      icon: 'fa-microphone',
      iconColor: 'text-primary',
      buttons: [
        {
          text: 'Got it',
          class: 'btn-primary',
          action: () => this.closeModal()
        }
      ]
    });
  }

  toggleSetting(setting) {
    if (setting === 'quietMode') {
      this.data.user.preferences.quietMode = !this.data.user.preferences.quietMode;
    } else if (setting === 'biometrics') {
      this.data.user.preferences.biometrics = !this.data.user.preferences.biometrics;
    } else if (setting === 'whatsapp') {
      this.data.user.preferences.notifications.whatsapp = !this.data.user.preferences.notifications.whatsapp;
    }
  }

  showModal(config) {
    const modal = document.createElement('div');
    modal.id = 'app-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal">
        <div class="text-center">
          <i class="fas ${config.icon} ${config.iconColor} text-6xl mb-4"></i>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">${config.title}</h2>
          <p class="text-gray-600 mb-6">${config.message}</p>
          <div class="flex gap-3 justify-center">
            ${config.buttons.map((btn, i) => `
              <button onclick="aiBank.modalButtonClick(${i})" class="btn ${btn.class}">
                ${btn.text}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.modalButtons = config.buttons;
    document.body.appendChild(modal);
  }

  modalButtonClick(index) {
    if (this.modalButtons && this.modalButtons[index]) {
      this.modalButtons[index].action();
    }
  }

  closeModal() {
    const modal = document.getElementById('app-modal');
    if (modal) modal.remove();
    this.modalButtons = null;
  }

  attachEventListeners() {
    // Make aiBank globally accessible
    window.aiBank = this;
  }
}

// Initialize app
const aiBank = new AIBank();
