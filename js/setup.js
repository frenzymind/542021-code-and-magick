'use strict';
(function () {

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

  var FIRE_BALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var inventory;
  var inventorySetupOpen;
  var inventorySetupClose;
  var inventorySetupInputUserName;
  var inventorySaveButton;
  var inventoryWizardCoat;
  var inventoryWizardEye;
  var inventoryFireball;
  var dialogHandle;

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

    if (typeof inventory === 'undefined') {
      return;
    }

    inventory.classList.remove('hidden');
    document.addEventListener('keydown', onInventoryKeyDown);
  }

  function closeInventory() {

    if (typeof inventory === 'undefined') {
      return;
    }

    inventory.classList.add('hidden');
    document.removeEventListener('keydown', onInventoryKeyDown);
  }

  function setWizardCoatColor(color) {

    inventoryWizardCoat.style.fill = color;
  }

  function setWizardEyeColor(color) {

    inventoryWizardEye.style.fill = color;
  }

  function setWizardFireballColor(color) {

    inventoryFireball.style.background = color;
  }

  function onSetupOpenClick() {

    openInventory();
  }

  function onSetupCloseClick() {

    closeInventory();
  }

  function onSetupOpenKeyDown(evt) {

    if (evt.keyCode === ENTER_KEYCODE) {
      openInventory();
    }
  }

  function onSetupCloseKeyDown(evt) {

    if (evt.keyCode === ENTER_KEYCODE) {
      closeInventory();
    }
  }

  function onInventoryKeyDown(evt) {

    if (evt.target === inventorySetupInputUserName) {
      return;
    }

    if (evt.keyCode === ESC_KEYCODE) {
      closeInventory();
    }
  }

  function onInventorySaveButtonClick() {

    closeInventory();
  }

  function onInventorySaveButtonKeyDown(evt) {

    if (evt.keyCode === ENTER_KEYCODE) {
      closeInventory();
    }
  }

  function onInventoryCoatClick() {

    setWizardCoatColor(getRandomArrayElement(WIZARD_COAT_COLORS));
  }

  function onInventoryEyeClick() {

    setWizardEyeColor(getRandomArrayElement(WIZARD_EYE_COLORS));
  }

  function onInventoryFireballClick() {

    setWizardFireballColor(getRandomArrayElement(FIRE_BALL_COLORS));
  }

  function onDialogHandleMousedown(evt) {

    evt.preventDefault();

    var startCoords = {
    x: evt.clientX,
    y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      inventory.style.top = (inventory.offsetTop - shift.y) + 'px';
      inventory.style.left = (inventory.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function setListeners() {

    inventorySetupOpen.addEventListener('click', onSetupOpenClick);
    inventorySetupOpen.addEventListener('keydown', onSetupOpenKeyDown);

    inventorySetupClose.addEventListener('click', onSetupCloseClick);
    inventorySetupClose.addEventListener('keydown', onSetupCloseKeyDown);

    inventorySaveButton.addEventListener('click', onInventorySaveButtonClick);
    inventorySaveButton.addEventListener('keydown', onInventorySaveButtonKeyDown);

    inventoryWizardCoat.addEventListener('click', onInventoryCoatClick);
    inventoryWizardEye.addEventListener('click', onInventoryEyeClick);
    inventoryFireball.addEventListener('click', onInventoryFireballClick);


    dialogHandle.addEventListener('mousedown', onDialogHandleMousedown);
  }

  function setInventoryVariables() {

    inventory = document.querySelector('div.overlay.setup.hidden');
    inventorySetupOpen = document.querySelector('div.setup-open');
    inventorySetupClose = inventory.querySelector('.setup-close');
    inventorySetupInputUserName = inventory.querySelector('.setup-user-name');
    inventorySaveButton = inventory.querySelector('.setup-submit');
    inventoryWizardCoat = inventory.querySelector('.setup-wizard .wizard-coat');
    inventoryWizardEye = inventory.querySelector('.setup-wizard .wizard-eyes');
    inventoryFireball = inventory.querySelector('.setup-fireball-wrap');
    dialogHandle = inventory.querySelector('.setup-user-pic');
        dialogHandle.style.zIndex = 1000;
  }

  function showSetup() {

    var wizards = [];
    var wizardsCount = 4;

    setInventoryVariables();

    wizards = getSimilarWizards(wizardsCount);

    var similarArea = inventory.querySelector('.setup-similar');
    var similarList = similarArea.querySelector('.setup-similar-list');

    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

    var fragment = getWizardsFragment(wizards, similarWizardTemplate);

    similarList.appendChild(fragment);

    setListeners();
  }

  showSetup();
})();
