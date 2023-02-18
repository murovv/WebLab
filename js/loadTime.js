(function () {
  const start = Date.now();
  window.addEventListener('DOMContentLoaded', (event) => {
    const end = Date.now();
    info = document.createElement('div')
    info.innerText = "Page loaded in " + (end-start)/1000 + " seconds"
    document.body.getElementsByTagName("footer")[0].appendChild(info)
  });
}())
