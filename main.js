const form = document.getElementById("ticket-form")

const dropArea = document.getElementById("drop-area")
const fileInput = document.getElementById("file-input")
const uploadedImage = document.getElementById("uploaded-image")
const messageAction = document.getElementById("message-action")
const fileActions = document.getElementById("file-actions")
const removeImage = document.getElementById("remove-image")
const changeImage = document.getElementById("change-image")
const uploadMint = document.getElementById("upload-hint")

const textInputs =document.getElementById(".required")

const formData = {
    image: '',
    name: '',
    email: '',
    githubusername: '',
}

function validateTextInout() {
    let isValide = true

    textInputs.forEach(input => {
        const hint = input.nextElementSibling

        if(input.value.trim() === '') {
            input.classList.add('error')
            hint.classList.add('error')
            isValid = false
        } else {
            input.classList.remove('error')
            hint.classList.remove('error')
        }
    })
    return isValid
}

function validate(input, hint) {
    const file = input.files(0)
    let isValide = true

    if(!file) {
        hint.classList.add('error')
       hint.innerHTML =  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="#D1D0D5" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/><path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/><path stroke="#D1D0D5" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg> Please, upload an image.'
       isValid = false
    } else {
        const validTypes = ['image/jpeg', 'image/png']
        const maxSize = 500 * 1024

        if(!validTypes.includes(file.type)) {
            hint.classList.add('error')
            hint.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="#D1D0D5" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/><path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/><path stroke="#D1D0D5" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg> Invalid filetype, please upload a JPG or PNG photo.'
            input.value = ''
            isValid = false 
        } else if(file.size > maxsize) {
          hint.classList.add('error')
          hint.innerHTML =  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="#D1D0D5" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/><path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/><path stroke="#D1D0D5" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg> File is too large. Please upload a photo under 500kb'
          input.value = ''
          isValid = false
        } else {
            hint.classList.remove('error')
            hint.innerHTML = '<img src="./assert/images/icon-info.svg" alt =""> Upload your photo (JPG, PNG, max sizes: 500kb)'
            displayUploadedImage(file)
        }
    }

    return isValid
}

function displayUploadededImage(file) {
    const reader = new FileReader()

    reader.onload = e => {
        uploadedImage.src = e.target.result
        fileActions.classList.add('show')
        messageAction.classList.add('hide')
    }
    reader.readAsDataURL(file)
}

function resetUpload() {
    const defaultUploadicon = 'images/icon-upload.svg'

    fileInput.value = ''
    uploadedImage.src = defaultUploadicon
    messageAction.classList.remove('hide')
    fileActions.classList.remove('show')
    uploadHint.classList.remove('error')
    uploadHint.classList.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="#D1D0D5" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/><path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/><path stroke="#D1D0D5" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg> Invalid filetype, please upload a JPG or PNG photo.'
}

function storeAndDisplayformData() {
    formData.image = uploadedImage.src
    formData.name = document.getElementById('full-name').value.trim() 
    formData.email = document.getElementById('email').value.trim() 
    formData.githubUsername = document.getElementById('github').value.trim() 

    document.getElementById('header-name') .textContent = formData.name
    document.getElementById('display-name') .textContent = formData.name
    document.getElementById('display-email') .textContent = formData.name
    document.getElementById('display-github') .textContent = formData.githubUsername
    document.getElementById('display\-image') .src = formData.image
}
dropArea.addEventListener('click', () => {
    fileInput.click()
})

dropArea.addeventListener('dragover', (e) => {
    e.preventDefault()
    return
})

dropArea.addEventListener('drop', (e) => {
    e.preventDefault()

    const files = e.dataTransfer.files
    if(files.length > 0) {
          fileInput.files = files
          validateFile(fileInput, uploading)
    }
})

fileInput.addEventListener('change', () => {
    validateFile(fileInput, uploading)
})

removeImage.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    resetUpload()
})

changeImage.addEventListener('click', () => {
    e.preventDefault()
    e.stopPropagation()
    fileInput.click()
})

form.addEventListener('submit', e => {
    e.preventDefault()

    const isTextValid = validateTextInput()
    const isfileValid = validateFile(fileInput, uploadMint)

    if(isTextValid && isfileValid) {
        storeAndDisplayformData()

        document.getElementById('form-content').classList.add('hide')
        document.getElementById('display-data').style.display = 'block'
    }
})

