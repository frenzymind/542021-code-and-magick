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

  wizard.name = getRandomArrayElement(WIZARD_NAMES, true);

  wizard.coatColor = getRandomArrayElement(WIZARD_COAT_COLORS);

  wizard.eyesColor = getRandomArrayElement(WIZARD_EYE_COLORS);

  return wizard;
}

function renderWizard(wizard) {

  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function getRandomArrayElement(array, isName = false) {

  var min = 0;
  var max = array.length;

  var randomId = generateRandomInt(min, max);

  if (isName === true) {
    return array[randomId] + ' ' + WIZARD_LAST_NAMES[randomId];
  }

  return array[randomId];
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
