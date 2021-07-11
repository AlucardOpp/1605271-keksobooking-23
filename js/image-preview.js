const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarPicker = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__avatar');
const photoHousingPicker = document.querySelector('.ad-form__input');
const photoHousingPreview = document.querySelector('.ad-form__photohousing');

const addPreview = (picker, preview) => {
  picker.addEventListener('change', () => {
    const file = picker.files[0];
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

addPreview(avatarPicker, avatarPreview);
addPreview(photoHousingPicker, photoHousingPreview);
