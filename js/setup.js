'use strict';

window.setup = (function () {

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
  var DRAG_AVAILABLE_BORDER_STYLE_AREA = '2px dashed red';
  var ERROR_CLASS = 'error';
  var EYE_CLASS = 'wizard-eyes';
  var COAT_CLASS = 'wizard-coat';
  var DEBOUNCE_TIME_OUT = 500;

  var inventory;
  var inventorySetupOpen;
  var inventorySetupClose;
  var inventorySetupInputUserName;
  var inventorySaveButton;
  var inventoryWizardCoat;
  var inventoryWizardEye;
  var inventoryFireball;

  var shopElement;
  var artifactsElement;
  var draggedItem = null;
  var dropZone;

  var similarArea;
  var similarList;
  var similarWizardTemplate;

  var similarWizards;
  var currentEyeColor;
  var currentCoatColor;
  var lastTimeout;

  function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function renderWizard(wizard, template) {

    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  function getWizardsFragment(wizards, count) {

    var fragment = document.createDocumentFragment();

    var sortedWizards = wizards.slice().sort(function (left, right) {

      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {

        rankDiff = namesComparator(left.name, right.name);

      }
      return rankDiff;

    });

    for (var i = 0; i < count; i++) {

      fragment.appendChild(renderWizard(sortedWizards[i], similarWizardTemplate));

    }

    return fragment;
  }

  function openInventory() {

    if (typeof inventory === 'undefined') {
      return;
    }

    inventory.classList.remove('hidden');
    document.addEventListener('keydown', onInventoryKeyDown);
    window.backend.load(onLoadWizardsServer, onErrorWizardsLoadServer);
  }

  function closeInventory() {

    if (typeof inventory === 'undefined') {
      return;
    }

    inventory.classList.add('hidden');
    clearAllChilds(similarList);
    document.removeEventListener('keydown', onInventoryKeyDown);
  }

  function fillElement(elem, color) {

    if (isContain(elem, EYE_CLASS)) {
      currentEyeColor = color;
    } else if (isContain(elem, COAT_CLASS)) {
      currentCoatColor = color;
    }

    elem.style.fill = color;
  }

  function getRank(wizard) {

    var rank = 0;

    if (wizard.colorCoat === currentCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === currentEyeColor) {
      rank += 1;
    }

    return rank;
  }

  function namesComparator(left, right) {

    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }

  }

  function isContain(elem, elemClass) {

    if (elem.classList.contains(elemClass)) {
      return true;
    }

    return false;
  }

  function changeElementBackground(elem, color) {

    elem.style.backgroundColor = color;

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

  function onInventorySaveButtonClick(evt) {

    evt.preventDefault();

    var formData = new FormData(inventory.querySelector('form.setup-wizard-form'));

    window.backend.save(formData, onSaveWizardsServer, onSaveWizardsErrorServer);
  }

  function onInventorySaveButtonKeyDown(evt) {

    if (evt.keyCode === ENTER_KEYCODE) {
      closeInventory();
    }
  }

  function onInventoryCoatClick() {

    window.colorizeElement.colorizeElement(inventoryWizardCoat, WIZARD_COAT_COLORS, fillElement);
    debounceWizardsShow(showSimilarWizards);
  }

  function onInventoryEyeClick() {

    window.colorizeElement.colorizeElement(inventoryWizardEye, WIZARD_EYE_COLORS, fillElement);
    debounceWizardsShow(showSimilarWizards);
  }

  function onInventoryFireballClick() {

    window.colorizeElement.colorizeElement(inventoryFireball, FIRE_BALL_COLORS, changeElementBackground);
  }

  function onSaveWizardsServer() {

    clearError();
    closeInventory();
  }

  function onSaveWizardsErrorServer(msg) {

    showErrorMessage(msg);
  }

  function debounceWizardsShow(debounceFunc) {

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(debounceFunc, DEBOUNCE_TIME_OUT);
  }

  function showErrorMessage(errorMessage) {

    clearError();

    var node = document.createElement('div');
    node.classList.add(ERROR_CLASS);
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function clearError() {

    var errorDiv = document.body.querySelector('div:nth-of-type(1)');

    if (errorDiv.classList.contains(ERROR_CLASS)) {
      document.body.removeChild(errorDiv);
    }

  }

  function clearAllChilds(elem) {

    while (elem.hasChildNodes()) {
      elem.removeChild(elem.lastChild);
    }
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

    shopElement.addEventListener('dragstart', onArtifactDragstart);
    shopElement.addEventListener('dragend', onArtifactDragend);

    artifactsElement.addEventListener('dragstart', onArtifactDragstart);
    artifactsElement.addEventListener('dragover', onArtifactDragover);
    artifactsElement.addEventListener('drop', onArtifactDrop);
    artifactsElement.addEventListener('dragenter', onArtifactDragEnter);
    artifactsElement.addEventListener('dragleave', onArtifactDragLeave);
    artifactsElement.addEventListener('dragend', onArtifactDragend);
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

    shopElement = document.querySelector('.setup-artifacts-shop');
    artifactsElement = document.querySelector('.setup-artifacts');
    dropZone = artifactsElement.querySelectorAll('div.setup-artifacts-cell');

    similarArea = inventory.querySelector('.setup-similar');
    similarList = similarArea.querySelector('.setup-similar-list');
    similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  }

  function onArtifactDragstart(evt) {

    if (evt.target.tagName.toLowerCase() === 'img') {

      if (evt.currentTarget.classList.contains('setup-artifacts-shop')) {
        draggedItem = evt.target.cloneNode();
      } else {
        draggedItem = evt.target;
      }

      evt.dataTransfer.setData('text/plain', evt.target.alt);
      showDragZone(true);
    }
  }

  function onArtifactDrop(evt) {

    evt.target.style.backgroundColor = '';
    var neededTarget = evt.target.closest('div.setup-artifacts-cell');

    if (neededTarget.children.length === 0) {
      neededTarget.appendChild(draggedItem);
    }

    evt.preventDefault();
  }

  function onArtifactDragEnter(evt) {

    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  }

  function onArtifactDragLeave(evt) {

    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  }

  function onArtifactDragover(evt) {

    evt.preventDefault();
    return false;
  }

  function onArtifactDragend(evt) {

    evt.preventDefault();
    showDragZone(false);
    return false;
  }

  function showDragZone(isDrop) {

    for (var i = 0; i < dropZone.length; i++) {

      if (isDrop) {
        dropZone[i].style.outline = DRAG_AVAILABLE_BORDER_STYLE_AREA;
      } else {
        dropZone[i].style.outline = '';
      }
    }
  }

  function showSimilarWizards() {

    var wizardsCount = 4;
    var fragment;

    clearAllChilds(similarList);

    fragment = getWizardsFragment(similarWizards, wizardsCount);

    similarList.appendChild(fragment);

    similarArea.classList.remove('hidden');
  }

  function onLoadWizardsServer(wizards) {


    clearError();

    similarWizards = wizards;

    showSimilarWizards();

  }

  function onErrorWizardsLoadServer(msg) {

    showErrorMessage(msg);
  }

  function showSetup() {

    setInventoryVariables();

    setListeners();

  }

  showSetup();

})();
