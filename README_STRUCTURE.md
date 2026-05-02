# 🌴 Hawaiian Party Registration - Refactored Structure

## Overview
Your project has been reorganized for better maintainability and readability. The code is now separated into logical modules with clear responsibilities.

---

## 📁 Project Structure

```
hawaiian-party/
├── index.html              # Main registration form
├── success.html            # Success confirmation page
├── styles/
│   ├── common.css         # Shared styles (base, hero, buttons, i18n)
│   ├── form.css           # Form & ticket selection styles
│   ├── modal.css          # Payment & rules modal styles
│   └── success.css        # Success page styles
├── js/
│   ├── config.js          # Constants & configuration
│   ├── state.js           # State management
│   ├── ui.js              # UI interactions (language, countdown, selection)
│   ├── form.js            # Form validation & summary building
│   ├── payment.js         # Payment modal & confirmation logic
│   ├── modal.js           # Rules modal functions
│   └── app.js             # Application initialization
└── .git/                  # Version control
```

---

## 📋 File Descriptions

### CSS Files (`styles/`)

**common.css**
- Base styles for all elements
- Hero section styling
- Language switcher
- Buttons and general components
- Internationalization (i18n) setup

**form.css**
- Progress bar and step indicators
- Ticket selection styles
- Form fields and inputs
- Checkboxes and validation states
- Summary boxes
- All form-related UI elements

**modal.css**
- Payment modal (Revolut payment flow)
- Rules modal (event rules display)
- Copy-to-clipboard button styles
- Modal animations and overlays

**success.css**
- Success page card layout
- Event info boxes
- Back button styling
- Confirmation animation

### JavaScript Files (`js/`)

**config.js**
- All constants and configuration
- Revolut payment links
- Ticket labels and prices
- Event capacity info
- Google Sheets API URL

**state.js**
- Global application state object
- State getters and setters
- State reset function
- Centralized state management

**ui.js**
- Language switching (`setLang()`)
- Ticket selection (`selectTicket()`)
- Participant type selection (`selectType()`)
- Step navigation (`goStep()`)
- Countdown timer updates (`updateCountdown()`)

**form.js**
- Form validation (`validateStep()`)
- Summary building (`buildSummary()`)
- Input validation logic for all fields

**payment.js**
- Payment modal management (`openPayModal()`, `closePayModal()`)
- Copy-to-clipboard functionality (`copyName()`)
- Payment confirmation (`confirmPayment()`)
- Google Sheets data submission

**modal.js**
- Rules modal operations (`openRules()`, `closeRules()`)
- Modal event listeners

**app.js**
- Application initialization
- DOM ready checks
- Component setup (countdown, modals)

---

## 🔄 Script Loading Order

The scripts load in this specific order in `index.html`:

1. **config.js** - Must load first (defines constants)
2. **state.js** - State management (used by all modules)
3. **ui.js** - UI interactions
4. **form.js** - Form validation (depends on state)
5. **payment.js** - Payment functions
6. **modal.js** - Modal helpers
7. **app.js** - Initialization (orchestrates everything)

---

## 🎯 Key Improvements

✅ **Better Organization** - Each file has a single, clear responsibility

✅ **Easier Maintenance** - Related code is grouped together

✅ **Reusable Modules** - Functions are organized by feature

✅ **Reduced File Size** - Each HTML file is now much cleaner

✅ **Improved Readability** - Clear separation of concerns

✅ **Scalability** - Easy to add new features or modify existing ones

✅ **CSS Organization** - Styles grouped by page/component

---

## 🔧 Making Changes

**To modify the form validation:**
→ Edit `js/form.js` (`validateStep()` function)

**To add a new ticket type:**
→ Update `js/config.js` (add to `REVOLUT_LINKS`, `TICKET_LABELS`, `TICKET_PRICES`)
→ Update form logic in `js/ui.js` and `js/form.js`

**To style buttons:**
→ Edit `styles/common.css` (`.btn-primary`, `.btn-secondary`)

**To change modal appearance:**
→ Edit `styles/modal.css`

**To adjust form fields:**
→ Edit `styles/form.css` (`.field`, `.ticket`, etc.)

---

## 📱 Responsive Design

All CSS uses mobile-first responsive design with flexible layouts. The card-based design adapts from mobile to desktop automatically.

---

## 🌐 Internationalization (i18n)

Language switching is managed in `js/ui.js` with the `setLang()` function.
CSS handles display/hiding of language-specific content via:
- `.lang-en [data-lang="en"]` - Shows English
- `.lang-de [data-lang="de"]` - Shows German

---

## ✨ Next Steps

To use this refactored code:
1. Ensure all files are in their correct directories
2. All relative paths should work correctly
3. Test the form in a browser to verify functionality
4. Check browser console for any errors

The refactored structure is now ready for production!
