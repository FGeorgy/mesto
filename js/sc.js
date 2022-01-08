function newElement () {
  if (!(inputPlase.value === '') && !(inputUrl.value === '')) {
    const url = inputUrl.value;
    const title = inputPlase.value;
    

    elements.prepend(element);
  };
};

function createCard (elem) {
  const element = elementTemplate.cloneNode(true);

  if (elem === )

  element.querySelector('.element__image').src = elem.link;
  element.querySelector('.element__title').textContent = elem.name;

  element.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  const deleteButton = element.querySelector('.element__delete-button')
  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.element').remove();
  });

  const image = element.querySelector('.element__image');
  image.addEventListener('click', function() {
    const elementActive = image.closest('.element');
    popupZoomImg.classList.add('popup_opened');
    zoomImg.src = elementActive.querySelector('.element__image').src;
    imgCaption.textContent = elementActive.querySelector('.element__title').textContent;
  });
};