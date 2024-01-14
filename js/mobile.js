const mobileCreateBtn = document.getElementById('mobile-create-btn');
const closeDialogBtn = document.getElementById('close-dialog-btn')
const mobileDialog = document.getElementById('mobile-steps-dialog');

mobileCreateBtn.addEventListener('click', dialogHandler);
closeDialogBtn.addEventListener('click', closeDialog)

function dialogHandler() {
  mobileDialog.showModal();
}

function closeDialog() {
  mobileDialog.close();
}