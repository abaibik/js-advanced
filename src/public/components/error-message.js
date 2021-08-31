const ErrorMessage = {
  props: ["message"],
  watch: {
    message: (newMessage, oldMessage) => {
      const toastLiveExample = document.getElementById("liveToast");
      const toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
    },
  },
  template: `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">Error</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        Error: {{ message }}
      </div>
    </div>
  </div>`,
};

export default ErrorMessage;
