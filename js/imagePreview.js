const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__avatar');
const photoHousingChooser = document.querySelector('.ad-form__input');
const photoHousingPreviews = document.querySelector('.ad-form__photohousing');

const addPreview = (chooser, preview) => {
  chooser.addEventListener('change', () => {
    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

addPreview(avatarChooser, avatarPreview);
addPreview(photoHousingChooser, photoHousingPreviews);
