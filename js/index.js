(function (){
  Array.prototype.select = function(expr){
    var arr = this;
    return arr.map(expr);
  };
}())
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("target-plate-form").addEventListener("submit", function(e) {
    e.preventDefault();
    var data = getFormData();
    createTarget(data, true);
    document.getElementById("target-plate-form").classList.toggle("target-plate_form-hidden")
  });

  document.querySelector(".toggle > input").addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      alert('checked');
    } else {
      alert('not checked');
    }
  });
  setInterval(function (){
    Array.from(document.getElementsByClassName("target-plate__donut")).select(elem=>{
      var fraction = elem.innerHTML.split('/')
      fraction[0] = parseInt(fraction[0])+1
      elem.innerHTML = fraction[0]+"/"+fraction[1]
      $(elem).change()
    })
  }, 1000)

});


function createTarget(data, playAnimation){
  var targetPlate = document.getElementById("target-plate-template").content.cloneNode(true)
  var subtargetList = data.subtargets.select(function (el){
      var listItem = document.getElementById("subtarget-template").content.cloneNode(true)
      listItem.querySelector(".target-plate__iteration-description").innerHTML = el
      return listItem
    }
  )
  targetPlate.querySelector(".target-plate__charity-name").innerHTML = data.organizationName
  targetPlate.querySelector(".target-plate__description-header").innerHTML = data.targetName
  subtargetList.forEach(function(elem) {
    targetPlate.querySelector(".target-plate__description-iterations-list").appendChild(elem)
  })
  //TODO добавить время
  /*if(!!playAnimation){
    targetPlate.classList.add("target-plate_new")
  }*/
  document.getElementById("target-plates").insertBefore(targetPlate, document.getElementById("target-plates").firstChild)
  var numerator = Math.round((Date.now()-new Date(data.startDate))/1000)
  var denom = Math.round((new Date(data.date) - new Date(data.startDate))/1000)
  document.querySelector(".target-plate__donut").innerHTML = numerator+ "/" + denom
  $(document.querySelector(".target-plate__donut")).peity("donut")
}

function getFormData(){
  var subtargets = document.getElementById("target-plate-form").getElementsByClassName("target-plate__iteration-description")
  subtargets = Array.from(subtargets).select(function (el){
    return el.innerHTML
  })
  document.getElementById("target-plate-form").getElementsByClassName("target-plate__description-iterations-list")[0].innerHTML = ""
  var date = document.getElementById("target-time").value
  document.getElementById("target-time").value = ""
  var organisationName = document.getElementById("organization-name-input").value
  document.getElementById("organization-name-input").value = ""
  var targetName = document.getElementById("target-name-input").value
  document.getElementById("target-name-input").value = ""
  var data = {}
  data["date"] = date
  data["startDate"] = Date.now()
  data["organizationName"] = organisationName
  data["subtargets"] = subtargets
  data["targetName"] = targetName
  return data
}

function displayTargetForm(){
    document.getElementById("target-plate-form").classList.toggle("target-plate_form-hidden")

}

function addSubtarget(){
    var name = document.getElementById("target-plate-form__new-subtarget-name").value
    document.getElementById("target-plate-form__new-subtarget-name").value = ""
    var listItem = document.getElementById("subtarget-template").content.cloneNode(true)
    listItem.querySelector(".target-plate__iteration-state").disabled = true
    listItem.querySelector(".target-plate__iteration-description").innerHTML = name
    document.getElementById("target-plate-form__subtarget-list").appendChild(listItem)
    document.getElementById("target-plate-form__new-subtarget-name").focus()
}


function onSubtargetSubmit(){
  if(event.keyCode == 13) {
    addSubtarget();
    return false;
  }
  return true;
}
