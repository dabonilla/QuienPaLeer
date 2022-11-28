// the local dict example is below.
const localeFunc = (number, index, totalSec) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // totalSec: total seconds between date to be formatted and today's date;
    return [
      ['justo ahora', 'recientemente'],
      ['Hace %s segundos', 'en %s segundos'],
      ['Hace 1 minuto', 'En 1 minuto'],
      ['%s minutos ago', 'En %s minutos'],
      ['Hace 1 hora', 'En 1 hora'],
      ['Hace %s horas', 'En %s horas'],
      ['Hace 1 día', 'En 1 día'],
      ['Hace %s días', 'En %s días'],
      ['Hace 1 semana', 'En 1 semana'],
      ['Hace %s semanas', 'En %s semanas'],
      ['Hace 1 mes', 'En 1 mes'],
      ['Hace %s meses', 'En %s meses'],
      ['Hace 1 año', 'En 1 año'],
      ['Hace %s años', 'En %s años']
    ][index];
  };

export default localeFunc;