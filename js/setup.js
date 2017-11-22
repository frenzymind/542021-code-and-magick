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

function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateWizard() {

  var wizard = {};

  var max = WIZARD_NAMES.length;
  var min = 0;

  var randomId = generateRandomInt(min, max);
  wizard.name = WIZARD_NAMES[randomId] + ' ' + WIZARD_LAST_NAMES[randomId];

  max = WIZARD_COAT_COLORS.length;
  randomId = generateRandomInt(min, max);
  wizard.coatColor = WIZARD_COAT_COLORS[randomId];

  max = WIZARD_EYE_COLORS.length;
  randomId = generateRandomInt(min, max);
  wizard.eyesColor = WIZARD_EYE_COLORS[randomId];

  return wizard;
}

function renderWizard(wizard) {

  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var wizards = [];
var wizardsCount = 4;

for (var i = 0; i < wizardsCount; i++) {

  wizards[i] = generateWizard();

}

var inventory = document.querySelector('div.overlay.setup.hidden');
var similarArea = inventory.querySelector('.setup-similar');
var similarList = similarArea.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var fragment = document.createDocumentFragment();

for (i = 0; i < wizards.length; i++) {

  fragment.appendChild(renderWizard(wizards[i]));

}

similarList.appendChild(fragment);
inventory.classList.remove('hidden');
similarArea.classList.remove('hidden');
