
const link = "https://api.json-generator.com/templates/ragCQ--vOI0z/data?delay=500&access_token=z01pzwm2k1wxv3ks4r28opmhq6z71und7hw8et2w"
const controller = new AbortController();
const fetchTimeout = (url, ms, { signal, ...options } = {}) => {
  const controller = new AbortController();
  const promise = fetch(url, { signal: controller.signal, ...options });
  if (signal) signal.addEventListener("abort", () => controller.abort());
  const timeout = setTimeout(() => controller.abort(), ms);
  return promise.finally(() => clearTimeout(timeout));
};

function loadData(){
  fetchTimeout(link, 5000, { signal: controller.signal })
    .then(response => response.json())
    .then((val) => {val.forEach(function (elem){
      createTarget(elem)
    })
      document.getElementById("loader").classList.add("loader_invisible")
      $(document.querySelectorAll("span.target-plate__donut")).peity("donut")
    })
    .catch(error => {
      document.getElementById("loader-error").classList.toggle("loader__error_visible")
      if (error.name !== "AbortError") {
        alert(error)
      }
    });
}
document.addEventListener('DOMContentLoaded', (event) => {
  loadData();
});


