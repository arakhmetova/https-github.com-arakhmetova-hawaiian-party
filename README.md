# 🌴 Hawaiian Party Registration - Refactored Structure

## Overview
This is the website for the dorm party. 

## Build the website
1. Run ```npm install```  
2. Run ```npm run build``` to build the website obscusfated.  


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


## 🌐 Internationalization (i18n)

Language switching is managed in `js/ui.js` with the `setLang()` function.
CSS handles display/hiding of language-specific content via:
- `.lang-en [data-lang="en"]` - Shows English
- `.lang-de [data-lang="de"]` - Shows German


## ✨ Roadmap

[ ] Write down goals here : name of who works on it :3  
[x] Write down achieved goals here : name of who works on it :3
