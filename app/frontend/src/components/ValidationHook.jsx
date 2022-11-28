
import React, { useState } from 'react';
import { publicRequest } from '../requestMethods'
import { uploadFile } from '../../../backend/config/firebase/storage';
import Swal from 'sweetalert2'
import { validateBookSale, validateDonation, validateEvent, validateRecommendation, validateSwap } from './ValidationField';

const useValidationHook = (formName, url, url2, reloadPage, closeModal, bookSended) => {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({ file: null })
  const [publication, setPublication] = useState({})

  function handleChangeFile(event) {
    setFile(event.target.files[0]);
    if (!!errors[event.target.name])
      setErrors({
        ...errors,
        [event.target.name]: null
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPublication({ ...publication, [name]: value })
    setInputs(prevInput => {
      return {
        ...prevInput, [e.target.name]: e.target.value
      }
    })

    if (!!errors[e.target.name])
      setErrors({
        ...errors,
        [e.target.name]: null
      })

  }

  function handleChangeFile(event) {
    setFile(event.target.files[0]);
    if (!!errors[event.target.name])
      setErrors({
        ...errors,
        [event.target.name]: null
      })
  }

  const saveData = (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      closeModal();
      if (file == null) {
        const image = "https://firebasestorage.googleapis.com/v0/b/quienpaleer-c0891.appspot.com/o/1668972294675recommendation3.jpg?alt=media&token=c34d0221-8337-4636-bca0-a0a05652ab87"
        async function publicationPost() {
          const newPublication = { ...inputs, image: image };

          await publicRequest.post(url, newPublication, { withCredentials: true })

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Publicación agregada.'
          })
          document.getElementById('publicationForm').reset()
          reloadPage();
          setPublication({})
          setInputs({})
          setErrors({ file: null })
          setFile(null)
        }
        publicationPost()
      }
      else {
        uploadFile(file).then(async (downloadURL) => {
          const newPublication = { ...inputs, image: downloadURL };
          //console.log('nuevo libro: ', newBook)
          if (bookSended) {
            //console.log("Editando libro")
            const bookEdit = { ...newPublication, _id: bookSended._id }
            console.log('Libro a editar', bookEdit)
            await publicRequest.put(url2, bookEdit, { withCredentials: true })

          } else {
            await publicRequest.post(url, newPublication, { withCredentials: true })
          }
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Publicación agregada.'
          })
          document.getElementById('publicationForm').reset()
          reloadPage();
          setPublication({})
          setInputs({})
          setErrors({ file: null })
          setFile(null)
        }).catch((error) => {
          console.log(error);
        })
      }
    }
  }

  const validateForm = () => {
    const { name, title, author, editorial, year, price, recommendation, summary, description, interest, startDate, endDate, hour, place } = inputs
    if (formName == "donation") return validateDonation(name, title, author, file, editorial)
    if (formName == "booksale") return validateBookSale(name, title, author, file, editorial, year, price)
    if (formName == "recommendation") return validateRecommendation(name, title, author, "file", recommendation, summary)
    if (formName == "swap") return validateSwap(name, author, file, description, interest)
    if (formName == "event") return validateEvent(name, file, description, startDate, endDate, hour, place)
  }

  return {
    saveData,
    handleChange,
    handleChangeFile,
    errors,
    inputs,
    file
  }
}
export default useValidationHook