function copyTextToClipboard(str, options) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

document.getElementById('btn-copy-1').addEventListener('click', async () => {
  var textInput = document.getElementById("imei");
  if (!textInput.value) return;

  copyTextToClipboard(textInput.value);

  let btnCopy = document.getElementById('btn-copy-1');

  btnCopy.innerText = "Copied";
  let timeoutCopy = setTimeout(() => {
    btnCopy.innerHTML = `<i class="el-icon-document-copy"></i>`;
    clearTimeout(timeoutCopy);
  }, 2000);
});

document.getElementById('btn-copy-2').addEventListener('click', async () => {
  var textInput = document.getElementById("cookies");
  if (!textInput.value) return;

  copyTextToClipboard(textInput.value);

  let btnCopy = document.getElementById('btn-copy-2');

  btnCopy.innerText = "Copied";
  let timeoutCopy = setTimeout(() => {
    btnCopy.innerHTML = `<i class="el-icon-document-copy"></i>`;
    clearTimeout(timeoutCopy);
  }, 2000);
});

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("refresh-button").addEventListener("click", function() {
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			chrome.tabs.reload(tabs[0].id);
		});
	});
});
// Function để copy text từ input
function copyToClipboard(inputId, buttonId) {
  const inputElement = document.getElementById(inputId);
  const buttonElement = document.getElementById(buttonId);

  // Tạo thẻ input tạm thời để copy text
  const tempInput = document.createElement('input');
  tempInput.value = inputElement.value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  // Đổi icon hoặc text của button thành đã copy
  buttonElement.innerHTML = '<i class="el-icon-check copied"></i>';
  setTimeout(() => {
    buttonElement.innerHTML = '<i class="el-icon-document-copy"></i>';
  }, 1500);
}

// Gán sự kiện click cho nút copy
document.getElementById('btn-copy-1').addEventListener('click', function() {
  copyToClipboard('imei-input', 'btn-copy-1');
});

document.getElementById('btn-copy-2').addEventListener('click', function() {
  copyToClipboard('cookies-input', 'btn-copy-2');
});

