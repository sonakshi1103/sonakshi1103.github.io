
// ============================================================
// TUTORIAL 4: JAVASCRIPT FUNDAMENTALS
// RSVP card — wire up the behavior
// ============================================================

// ── 1. DATA ─────────────────────────────────────────────────

let isGoing = false;
let isNotGoing = false;

// ── 2. ELEMENTS ─────────────────────────────────────────────

const nameInput = document.querySelector('#name-input');
const guestInput = document.querySelector('#guest-input');
const guestField = document.querySelector('#guest-field');

const btnYes = document.querySelector('#btn-yes');
const btnNo = document.querySelector('#btn-no');
const confirmation = document.querySelector('#confirmation');
const regret = document.querySelector('#regret');

// Disable both buttons until a name is entered.
btnYes.disabled = true;
btnNo.disabled = true;

// ── 3. HELPERS ──────────────────────────────────────────────

const getName = () => {
  const raw = nameInput.value.trim();
  return raw || 'Someone';
};

const getGuests = () => Number(guestInput.value);

// ── 4. TASK 1 & 2: RSVP BUTTONS ─────────────────────────────

// Going button
btnYes.addEventListener('click', () => {

  isGoing = true;
  isNotGoing = false;

  btnYes.classList.add('active');
  btnNo.classList.remove('active');

  guestField.classList.remove('hidden');

  confirmation.classList.remove('hidden');
  regret.classList.add('hidden');

  updateConfirmation();

});

// Can't make it button
btnNo.addEventListener('click', () => {

  isGoing = false;
  isNotGoing = true;

  btnNo.classList.add('active');
  btnYes.classList.remove('active');

  guestField.classList.add('hidden');

  confirmation.classList.add('hidden');
  regret.classList.remove('hidden');

  regret.textContent = `${getName()} can't make it.`;

});

// ── 5. TASK 3 & 4: CONFIRMATION MESSAGE ─────────────────────

const updateConfirmation = () => {
  const guests = getGuests();

  let guestLine;

  if (guests === 0) {
    guestLine = 'flying solo.';
  } else if (guests === 1) {
    guestLine = 'bringing 1 guest.';
  } else {
    guestLine = `bringing ${guests} guests.`;
  }

  confirmation.textContent = `${getName()} is coming — ${guestLine}`;
};

// ── 6. TASK 5: LIVE UPDATES ─────────────────────────────────

nameInput.addEventListener('input', () => {

  const isNameEmpty = nameInput.value.trim() === '';

  // Both buttons require a name.
  btnYes.disabled = isNameEmpty;
  btnNo.disabled = isNameEmpty;

  if (isGoing) {
    updateConfirmation();
  }

  if (isNotGoing) {
    regret.textContent = `${getName()} can't make it.`;
  }

});

guestInput.addEventListener('input', () => {

  if (isGoing) {
    updateConfirmation();
  }

});

// ── DEBUGGING ───────────────────────────────────────────────

const checkStatus = () => {
  console.log('=== current state ===');
  console.log('isGoing:    ', isGoing);
  console.log('isNotGoing: ', isNotGoing);
  console.log('name:       ', nameInput.value);
  console.log('guests:     ', getGuests(), '(type:', typeof getGuests(), ')');
  console.log('raw value:  ', guestInput.value, '(type:', typeof guestInput.value, ')');
  console.log('====================');
};

const resetCard = () => {
  isGoing = false;
  isNotGoing = false;

  nameInput.value = '';
  guestInput.value = '0';

  // Reset both buttons.
  btnYes.disabled = true;
  btnNo.disabled = true;

  btnYes.classList.remove('active');
  btnNo.classList.remove('active');

  guestField.classList.add('hidden');
  confirmation.classList.add('hidden');
  regret.classList.add('hidden');

  confirmation.textContent = '';
  regret.textContent = '';

  console.log('Card reset.');
};
