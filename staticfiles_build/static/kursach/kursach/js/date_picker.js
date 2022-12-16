// import Datepicker from '../js/vanillajs-datepicker/js/Datepicker.js'
import Datepicker from './vanillajs-datepicker/js/Datepicker.js'
import ru from './vanillajs-datepicker/js/i18n/locales/ru.js';
const elem = document.getElementById('foo');
const datepicker = new Datepicker(elem, {
  // 'format': 'yyyy-mm-dd'
    'language': ru
});
