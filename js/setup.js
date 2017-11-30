'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYE_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var inventory;
var inventorySetupOpen;
var inventorySetupClose;
var inventorySetupInputUserName;
var inventorySaveButton;

function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateWizard() {

  var wizard = {};

  var randomId = generateRandomInt(0, WIZARD_NAMES.length);
  wizard.name = WIZARD_NAMES[randomId] + ' ' + WIZARD_LAST_NAMES[randomId];

  wizard.coatColor = getRandomArrayElement(WIZARD_COAT_COLORS);

  wizard.eyesColor = getRandomArrayElement(WIZARD_EYE_COLORS);

  return wizard;
}

function renderWizard(wizard, template) {

  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function getRandomArrayElement(array) {

  var min = 0;
  var max = array.length;

  var randomId = generateRandomInt(min, max);

  return array[randomId];
}

function getSimilarWizards(count) {

  var wizards = [];

  for (var i = 0; i < count; i++) {

    wizards[i] = generateWizard();

  }

  return wizards;
}

function getWizardsFragment(wizards, similarWizardTemplate) {

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {

    fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));

  }

  return fragment;
}

function openInventory() {

  if (inventory === undefined) {
    return;
  }

  inventory.classList.remove('hidden');
  document.addEventListener('keydown', onInventoryKeyDown);
}

function closeInventory() {

  if (inventory === undefined) {
    return;
  }

  inventory.classList.add('hidden');
  document.removeEventListener('keydown', onInventoryKeyDown);
  //debugger;
}

var onSetupOpenClick = function() {

  openInventory();
}

var onSetupCloseClick = function() {

  closeInventory();
}

var onSetupOpenKeyDown = function(evt) {

  if (evt.keyCode === ENTER_KEYCODE) {
    openInventory();
  }
}

var onSetupCloseKeyDown = function(evt) {

  if (evt.keyCode === ENTER_KEYCODE) {
    closeInventory();
  }
}

var onInventoryKeyDown = function(evt) {

  if (evt.target === inventorySetupInputUserName) {
    return;
  }

  if (evt.keyCode === ESC_KEYCODE) {
    closeInventory();
  }
}

var oninventorySaveButtonClick = function () {

    closeInventory();
}

var oninventorySaveButtonKeyDown = function () {

    if (evt.keyCode === ENTER_KEYCODE) {
      closeInventory();
    }
}

function setListeners() {

  inventorySetupOpen.addEventListener('click', onSetupOpenClick);
  inventorySetupOpen.addEventListener('keydown', onSetupOpenKeyDown);

  inventorySetupClose.addEventListener('click', onSetupCloseClick);
  inventorySetupClose.addEventListener('keydown', onSetupCloseKeyDown);

  inventorySaveButton.addEventListener('click', oninventorySaveButtonClick);
  inventorySaveButton.addEventListener('keydown', oninventorySaveButtonKeyDown);
}



function showSetup() {

  var wizards = [];
  var wizardsCount = 4;

  wizards = getSimilarWizards(wizardsCount);

  inventory = document.querySelector('div.overlay.setup.hidden');
  inventorySetupOpen = document.querySelector('div.setup-open');
  inventorySetupClose = inventory.querySelector('.setup-close');
  inventorySetupInputUserName = inventory.querySelector('.setup-user-name');
  inventorySaveButton = inventory.querySelector('.setup-submit');

  var similarArea = inventory.querySelector('.setup-similar');
  var similarList = similarArea.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var fragment = getWizardsFragment(wizards, similarWizardTemplate);

  similarList.appendChild(fragment);
  //inventory.classList.remove('hidden');
  //similarArea.classList.remove('hidden');

  setListeners();
}

showSetup();
