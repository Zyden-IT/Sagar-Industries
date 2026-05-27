import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const handleCloseBtn = () => {
  const closeBtn = document.getElementById('custom-swal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      MySwal.close();
    });
  }
};

const Confirm = async (title, text, saveBtnText, cancelBtnText) => {
  return MySwal.fire({
    toast: true,
    position: "top-end",
    html: `
      <div class="swal-success-wrapper flex items-start gap-5 w-full">
        <div class="w-[50px] h-[50px] p-2.5 rounded-full bg-white flex items-center justify-center shadow-xs">
          <i class="fi fi-ss-interrogation text-blue-500 !text-[25px] !h-[25px]"></i>
        </div>

        <div class="flex-1">
          <h3 class="text-[18px] font-semibold text-blue-500 m-0 mb-[5px]">${title || "Do you want to continue?"}</h3>
          <p class="text-[14px] text-gray-600 m-0 leading-snug">${text}</p>
          <div class="swal-btns flex items-center gap-3 mt-5">
  <button 
    id="custom-confirm-btn" 
    class="confirm-button px-5 py-2.5 rounded-lg font-medium
           bg-blue-600 hover:bg-blue-700
           text-white shadow-md transition-all duration-200
           focus:ring-2 focus:ring-blue-300">
    ${saveBtnText || "Yes"}
  </button>

  <button 
    id="custom-cancel-btn" 
    class="cancel-button px-5 py-2.5 rounded-lg font-medium
           bg-gray-200 hover:bg-gray-300
           text-gray-800 shadow-md transition-all duration-200
           focus:ring-2 focus:ring-gray-300">
    ${cancelBtnText || "No"}
  </button>
</div>

        </div>
      </div>
    `,
    customClass: {
      popup: 'swal-confirm-popup !bg-blue-100 !shadow-cardshadow !rounded-[20px] !p-5 !border-[3px] !border-white',
      container: 'swal-container !w-[520px]',
    },
    allowOutsideClick: false,
    allowEscapeKey: true,
    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: false,
    buttonsStyling: false,
    showClass: {
      popup: 'swal2-show confirm-show  animate__animated animate__slideInDown'
    },
    hideClass: {
      popup: 'swal2-hide confirm-hide animate__animated animate__slideInUp'
    },
    didOpen: () => {
      document.getElementById('custom-cancel-btn')?.addEventListener('click', () => {
        MySwal.clickCancel();
      });

      document.getElementById('custom-confirm-btn')?.addEventListener('click', () => {
        MySwal.clickConfirm();
      });
    }
  }).then((result) => result.isConfirmed);
};

const Alert = async (text, title) => {
  await MySwal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    showCancelButton: false,
    timer: 3000,
    timerProgressBar: true,
    html: `
      <div class="swal-success-wrapper flex items-start gap-5 w-full">
        <div class="w-[50px] h-[50px] p-2.5 rounded-full bg-white flex items-center justify-center shadow-xs">
          <i class="fi fi-ss-exclamation text-orange-400 !text-[25px] !h-[25px]"></i>
        </div>

        <div class="flex-1">
          <h3 class="text-[18px] font-semibold text-orange-400 m-0 mb-[5px]">${title || "Alert"}</h3>
          <p class="text-[14px] text-gray-600 m-0 leading-snug">${text}</p>
        </div>

        <div class="w-5 text-[20px] text-gray-400 hover:text-gray-600 cursor-pointer" id="custom-swal-close">
          <i class="fi fi-rr-cross-small !text-[20px] !leading-tight !h-[20px]"></i>
        </div>
      </div>
    `,
    customClass: {
      popup: 'swal-alert-popup !bg-orange-50 !shadow-cardshadow !rounded-[20px] !p-5 !border-[3px] !border-white',
      container: 'swal-container !w-[520px]',
      timerProgressBar: 'swal-progress !bg-orange-300 !h-[3px] !rounded-full'
    },
    allowOutsideClick: false,
    allowEscapeKey: true,
    didOpen: handleCloseBtn,
    showClass: {
      popup: 'swal2-show warn-show  animate__animated animate__slideInDown'
    },
    hideClass: {
      popup: 'swal2-hide warn-hide animate__animated animate__slideInUp'
    }
  });
};

const Success = async (text, title) => {
  await MySwal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    html: `
      <div class="swal-success-wrapper flex items-start gap-5 w-full">
        <div class="w-[50px] h-[50px] p-2.5 rounded-full bg-white flex items-center justify-center shadow-xs">
          <i class="fi fi-ss-check-circle text-green-600 !text-[25px] !h-[25px]"></i>
        </div>

        <div class="flex-1">
          <h3 class="text-[18px] font-semibold text-green-600 m-0 mb-[5px]">${title || "Success"}</h3>
          <p class="text-[14px] text-gray-600 m-0 leading-snug">${text || ''}</p>
        </div>

        <div class="w-5 text-[20px] text-gray-400 hover:text-gray-600 cursor-pointer" id="custom-swal-close">
          <i class="fi fi-rr-cross-small !text-[20px] !leading-tight !h-[20px]"></i>
        </div>
      </div>
    `,
    customClass: {
      popup: 'swal-success-popup !bg-green-100 !shadow-cardshadow !rounded-[20px] !p-5 !border-[3px] !border-white',
      container: 'swal-container !w-[520px]',
      timerProgressBar: 'swal-progress !bg-green-500 !h-[3px] !rounded-full'
    },
    allowOutsideClick: false,
    allowEscapeKey: true,
    didOpen: handleCloseBtn,
    showClass: {
      popup: 'swal2-show success-show animate__animated animate__slideInDown'
    },
    hideClass: {
      popup: 'swal2-hide success-hide animate__animated animate__slideInUp'
    }
  });
};


const Error = async (title, text) => {
  await MySwal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: true,
    html: `
      <div class="swal-success-wrapper flex items-start gap-5 w-full">
        <div class="w-[50px] h-[50px] p-2.5 rounded-full bg-white flex items-center justify-center shadow-xs">
          <i class="fi fi-ss-cross-circle text-red-500 !text-[25px] !h-[25px]"></i>
        </div>

        <div class="flex-1">
          <h3 class="text-[18px] font-semibold text-red-500 m-0 mb-[5px]">${title || "Error"}</h3>
          <p class="text-[14px] text-gray-600 m-0 leading-snug">${text}</p>
        </div>

        <div class="w-5 text-[20px] text-gray-400 hover:text-gray-600 cursor-pointer" id="custom-swal-close">
          <i class="fi fi-rr-cross-small !text-[20px] !leading-tight !h-[20px]"></i>
        </div>
      </div>
    `,
    customClass: {
      popup: 'swal-error-popup !bg-red-100 !shadow-cardshadow !rounded-[20px] !p-5 !border-[3px] !border-white',
      container: 'swal-container !w-[520px]',
      timerProgressBar: 'swal-progress !bg-red-500 !h-[3px] !rounded-full'
    },
    allowOutsideClick: false,
    allowEscapeKey: true,
    didOpen: handleCloseBtn,
    showClass: {
      popup: 'swal2-show error-show  animate__animated animate__slideInDown'
    },
    hideClass: {
      popup: 'swal2-hide error-hide animate__animated animate__slideInUp'
    }
  });
};

const Toaster = async (text) => {
  await MySwal.fire({
    text,
    toast: true,
    icon: 'success',
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
};

const SuccessWithAction = async (title, text, saveBtnText) => {
  const result = await MySwal.fire({
    toast: true,
    position: "top-end",
    html: `
      <div class="swal-success-wrapper flex items-start gap-5 w-full">
        <div class="w-[50px] h-[50px] p-2.5 rounded-full bg-white flex items-center justify-center shadow-xs">
          <i class="fi fi-ss-check-circle text-green-600 !text-[25px] !h-[25px]"></i>
        </div>

        <div class="flex-1">
          <h3 class="text-[18px] font-semibold text-green-600 m-0 mb-[5px]">${title || "Do you want to continue?"}</h3>
          <p class="text-[14px] text-gray-600 m-0 leading-snug">${text}</p>
          <div class="swal-btns flex items-center gap-3 mt-5">
            <button 
              id="custom-successAction-btn" 
              class="successAction-button px-4 py-2 rounded-lg font-medium
                    bg-green-600 hover:bg-green-700
                    text-white shadow-md transition-all duration-200
                    focus:ring-2 focus:ring-green-300"
            >
              ${saveBtnText || "Okay"}
            </button>
          </div>
        </div>
      </div>
    `,
    customClass: {
      popup: 'swal-successAction-popup !bg-green-100 !shadow-cardshadow !rounded-[20px] !p-5 !border-[3px] !border-white',
      container: 'swal-container !w-[520px]',
    },
    allowOutsideClick: false,
    allowEscapeKey: true,
    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: false,
    buttonsStyling: false,
    showClass: {
      popup: 'swal2-show successAction-show  animate__animated animate__slideInDown'
    },
    hideClass: {
      popup: 'swal2-hide successAction-hide animate__animated animate__slideInUp'
    },
    didOpen: () => {
      document.getElementById('custom-confirm-btn')?.addEventListener('click', () => {
        MySwal.clickConfirm();
      });
    }
  });
  return result.isConfirmed;
};

const ErrorWithAction = async (title, text, saveBtnText) => {
  const result = await MySwal.fire({
    toast: true,
    position: "top-end",
    html: `
      <div class="swal-error-wrapper flex items-start gap-5 w-full">
        <div class="w-[50px] h-[50px] p-2.5 rounded-full bg-white flex items-center justify-center shadow-xs">
          <i class="fi fi-ss-cross-circle text-red-500 !text-[25px] !h-[25px]"></i>
        </div>

        <div class="flex-1">
          <h3 class="text-[18px] font-semibold text-red-500 m-0 mb-[5px]">${title || "Do you want to continue?"}</h3>
          <p class="text-[14px] text-gray-600 m-0 leading-snug">${text}</p>
          <div class="swal-btns flex items-center gap-3 mt-5">
            <button 
              id="custom-errorAction-btn" 
              class="errorAction-button px-4 py-2 rounded-lg font-medium
                    bg-red-500 hover:bg-red-700
                    text-white shadow-md transition-all duration-200
                    focus:ring-2 focus:ring-red-300"
            >
              ${saveBtnText || "Okay"}
            </button>
          </div>
        </div>
      </div>
    `,
    customClass: {
      popup: 'swal-errorAction-popup !bg-red-100 !shadow-cardshadow !rounded-[20px] !p-5 !border-[3px] !border-white',
      container: 'swal-container !w-[520px]',
    },
    allowOutsideClick: false,
    allowEscapeKey: true,
    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: false,
    buttonsStyling: false,
    showClass: {
      popup: 'swal2-show errorAction-show  animate__animated animate__slideInDown'
    },
    hideClass: {
      popup: 'swal2-hide errorAction-hide animate__animated animate__slideInUp'
    },
    didOpen: () => {
      document.getElementById('custom-confirm-btn')?.addEventListener('click', () => {
        MySwal.clickConfirm();
      });
    }
  });
  return result.isConfirmed;
};

const ThankYou = async (title, text) => {
  await MySwal.fire({
    title,
    text,
    icon: 'info',
    allowOutsideClick: false,
    allowEscapeKey: true
  });
};

const showLoginAlert = async (text) => {
  const result = await MySwal.fire({
    text,
    icon: 'warning',
    confirmButtonText: 'Login',
    allowOutsideClick: false,
    allowEscapeKey: false
  });

  if (result.isConfirmed) {
    window.location = '/#/login' + '?redirect=' + window.location.hash;
  }
};

export const SwalService = {
  Confirm,
  Alert,
  Success,
  Error,
  Toaster,
  SuccessWithAction,
  ErrorWithAction,
  ThankYou,
  showLoginAlert
};
