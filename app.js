var subjectName = document.querySelector("#subjectName");
var harf = document.querySelector("#harf");
var kredi = document.querySelector("#kredi");
var add = document.querySelector(".addLecture");
var dersler = document.querySelector(".lectures");
var enteredSubjects = document.querySelector(".enteredSubjects");
var ortalama = document.querySelector(".ortalama");
var toplamKredi = 0;
var toplamCarpım = 0;
var mevcutKredi = document.querySelector("#mevcutKredi");
var mevcutOrtalama = document.querySelector("#mevcutOrtalama");
var Mort = mevcutOrtalama.value;
var Mkredi = mevcutKredi.value;
var continuee = document.querySelector(".continue");
var hesaplamaYeri = document.querySelector(".hesaplamaYeri");
var eklemeYeri = document.querySelector(".eklemeYeri");

continuee.addEventListener("click", function() {
  var mevcutKrediValue = parseFloat(mevcutKredi.value);
  var mevcutOrtalamaValue = parseFloat(mevcutOrtalama.value);

  if (isNaN(mevcutKrediValue) || isNaN(mevcutOrtalamaValue)) {
    alert("Geçersiz Değer !");
  } else if (mevcutOrtalama.value > 4) {
    alert("Geçersiz Ortalama !");
  } else {
    toplamKredi += parseFloat(mevcutKredi.value);
    toplamCarpım += parseFloat(mevcutKredi.value) * parseFloat(mevcutOrtalama.value);
    ortalama.textContent = parseFloat(mevcutOrtalama.value);
    hesaplamaYeri.style.display = "block";
    eklemeYeri.style.display = "none";
  }
});

add.addEventListener("click", function() {
  var dersAdı = subjectName.value;
  var dersHarfi = harf.value;
  var dersKredi = kredi.value;

  var existingLectures = document.querySelectorAll(".lectureName");
  for (var i = 0; i < existingLectures.length; i++) {
    if (existingLectures[i].textContent === dersAdı) {
      alert("Bu ders adı zaten girilmiş !");
      return;
    }
  }

  toplamKredi += parseFloat(kredi.value);
  var notDegeri;
  var ortNot;
  if (dersHarfi == "AA") {
    notDegeri = "4.0";
  } if (dersHarfi == "BA") {
    notDegeri = "3.5";
  } if (dersHarfi == "BB") {
    notDegeri = "3.0";
  } if (dersHarfi == "CB") {
    notDegeri = "2.5";
  } if (dersHarfi == "CC") {
    notDegeri = "2.0";
  } if (dersHarfi == "DC") {
    notDegeri = "1.5";
  } if (dersHarfi == "DD") {
    notDegeri = "1.0";
  } if (dersHarfi == "FF") {
    notDegeri = "1.0";
  }

  var carpım = dersKredi * notDegeri;
  toplamCarpım += carpım;

  var newLecture = `
    <div class="col-2">
        <h5 class="carpım">
            ${carpım}
        </h5>
    </div>
    <div class="col-8">
        <div class="row">
            <h3 class="lectureName">${dersAdı}</h3>
        </div>
        <div class="row">
            <div class="col-3" style="padding: 0;">
                <h4 class="lectureKredi">
                    ${dersKredi}.0 kredi ,
                </h4>  
            </div>
            <div class="col-5" style="padding: 0;">
                <h4 class="lectureNot">
                    Not Değeri ${notDegeri}
                </h4>
            </div>
        </div>
    </div>
    <div class="col-2">
        <div class="delete">
            <i class="fa-sharp fa-regular fa-circle-xmark"></i>
        </div>
    </div>
  `;

  var yeniDiv = document.createElement("div");
  yeniDiv.className = "row lecture animate__animated animate__fadeInLeft";
  yeniDiv.innerHTML = newLecture;
  dersler.appendChild(yeniDiv);

  ortNot = toplamCarpım / toplamKredi;
  var dersSayısı = document.querySelectorAll(".lecture");
  enteredSubjects.textContent = dersSayısı.length + " Ders Girildi";
  ortalama.textContent = ortNot.toFixed(2);
  ortalama.classList.add("animate__animated", "animate__flipInX");
  setTimeout(function() {
    ortalama.classList.remove("animate__animated", "animate__flipInX");
  }, 1000);

  var deleteButtons = yeniDiv.querySelectorAll(".delete");
  deleteButtons.forEach(function(deleteButton) {
    deleteButton.addEventListener("click", function(event) {
      var selectedLecture = event.target.closest(".lecture");
      if (selectedLecture) {

        toplamKredi -= parseFloat(selectedLecture.querySelector(".lectureKredi").textContent);
        toplamCarpım -= parseFloat(selectedLecture.querySelector(".lectureKredi").textContent) * notDegeri;

        console.log(toplamCarpım);
        console.log(toplamKredi);
        ortNot = parseFloat(toplamCarpım) / parseFloat(toplamKredi);
        console.log(ortNot);
        selectedLecture.remove();
        var dersSayısı = document.querySelectorAll(".lecture");
        enteredSubjects.textContent = dersSayısı.length + " Ders Girildi";
        ortalama.textContent = ortNot.toFixed(2);
        ortalama.classList.add("animate__animated", "animate__flipInX");
        setTimeout(function() {
          ortalama.classList.remove("animate__animated", "animate__flipInX");
        }, 1000);
      }
    });
  });

  subjectName.value = "";
});
