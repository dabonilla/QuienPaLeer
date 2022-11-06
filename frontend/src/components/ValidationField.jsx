
const regexNumber = /^\d+$/;
const regexNumber10 = /^[\d+]{0,10}$/;
const regexNumber4 = /^[\d+]{0,4}$/;
const regexAlphanumeric = /^[\wñ*\s*\w*]+$/
const regexMaximum = /^[\w\s*\w*]{0,60}$/

const regexMaximum60 = /^[\s\S]{0,60}$/
const regexMaximum200 = /^[\s\S]{0,200}$/
const regexMaximum400 = /^[\s\S]{0,400}$/

function validateBookSale(name, title, author, file, editorial, year, price) {
  let newErrors = {}
  newErrors = validateDonation(name, title, author, file, editorial)

  if (!regexNumber4.test(year)) newErrors.year = 'Solo se permiten un máximo 4 de números.'
  if (!(regexNumber.test(year))) newErrors.year = 'Ingresa un número.'
  if (!year || year === '') newErrors.year = 'Ingresa el año de publicación.'

  if (!regexNumber10.test(price)) newErrors.price = 'Solo se permiten un máximo 10 de números.'
  if (!(regexNumber.test(price))) newErrors.price = 'Ingresa un número.'
  if (!price || price === '') newErrors.price = 'Ingresa un precio.'
  return newErrors
}
function validateDonation(name, title, author, file, editorial) {
  let newErrors = validateNameFileAuthorTitle(name, file, author, title)
  if (!regexMaximum60.test(editorial)) newErrors.editorial = 'Solo se permiten un máximo 60 de caracteres.'
  if (!regexAlphanumeric.test(editorial)) newErrors.editorial = 'Solo se permiten caracteres alfanuméricos.'
  if (!editorial || editorial === '') newErrors.editorial = 'Ingresa una editorial.'
  return newErrors
}
function validateRecommendation(name, title, author, file, recommendation, summary) {
  let newErrors = validateNameFileAuthorTitle(name, file, author, title)
  if (!regexMaximum400.test(recommendation)) newErrors.recommendation = 'Solo se permiten un máximo 400 de caracteres.'
  if (!recommendation || recommendation === '') newErrors.recommendation = 'Ingresa la razón del porqué recomiendas este libro.'
  if (!regexMaximum400.test(summary)) newErrors.summary = 'Solo se permiten un máximo 400 de caracteres.'
  if (!summary || summary === '') newErrors.summary = 'Ingresa un resumen sobre el libro.'
  return newErrors
}
function validateSwap(name, author, file, description, interest) {
  let newErrors = validateNameFileAuthor(name, file, author)
  if (!regexMaximum200.test(description)) newErrors.description = 'Solo se permiten un máximo 200 de caracteres.'
  if (!description || description === '') newErrors.description = 'Ingresa una descripción.'
  if (!regexMaximum200.test(interest)) newErrors.interest = 'Solo se permiten un máximo 200 de caracteres.'
  if (!interest || interest === '') newErrors.interest = 'Ingresa tus intereses.'
  return newErrors
}
function validateEvent(name, file, description, startDate, endDate, hour, place) {
  let newErrors = validateNameFile(name, file)
  if (!regexMaximum200.test(description)) newErrors.description = 'Solo se permiten un máximo 200 de caracteres.'
  if (!description || description === '') newErrors.description = 'Ingresa una descripción.'
  if (!startDate || startDate === '') newErrors.startDate = 'Fecha inválida.'
  if (!endDate || endDate === '') newErrors.endDate = 'Fecha inválida.'
  if (!hour || hour === '') newErrors.hour = 'Hora inválida.'
  if (!regexMaximum60.test(place)) newErrors.place = 'Solo se permiten un máximo 60 de caracteres.'
  if (!place || place === '') newErrors.place = 'Ingresa un lugar.'
  return newErrors
}

function validateNameFile(name, file) {
  const newErrors = {}
  if (!regexMaximum60.test(name)) newErrors.name = 'Solo se permiten un máximo 60 de caracteres.'
  if (!name || name === '') newErrors.name = 'Ingresa un nombre.'
  if (!file || file === '') newErrors.image = 'Sube una imagen.'
  return newErrors
}
function validateNameFileAuthor(name, file, author) {
  let newErrors = {}
  newErrors = validateNameFile(name, file)
  if (!regexMaximum.test(author)) newErrors.author = 'Solo se permiten un máximo 60 de caracteres.'
  if (!regexAlphanumeric.test(author)) newErrors.author = 'Solo se permiten caracteres alfanuméricos.'
  if (!author || author === '') newErrors.author = 'Ingresa un autor.'
  return newErrors
}
function validateNameFileAuthorTitle(name, file, author, title) {
  let newErrors = {}
  newErrors = validateNameFileAuthor(name, file, author)
  if (!regexMaximum.test(title)) newErrors.title = 'Solo se permiten un máximo 60 de caracteres.'
  if (!regexAlphanumeric.test(title)) newErrors.title = 'Solo se permiten caracteres alfanuméricos.'
  if (!title || title === '') newErrors.title = 'Ingresa un título.'
  return newErrors
}
export {validateBookSale,validateDonation,validateEvent,validateRecommendation,validateSwap}