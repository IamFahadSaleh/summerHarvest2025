const sheetId = "1LDcinpxGhxth9nj3Ag-JaW5zAIz0psUHTlseG4I1Umo";
const sheetName = "points";
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
const output = document.getElementById('getData');
const myform = document.getElementById('myform');
const search = document.getElementById('search');


document.addEventListener('DOMContentLoaded', () => {
	//output.innerHTML = "<p>تحميل الحصاد ....</p>" 
	fetch(sheetURL)
	.then(result=>result.text())
	.then(function(csvText) {
	return csv().fromString(csvText);
	}).then(function(csv) {
		//output.innerHTML = "<code>" + JSON.stringify(csv) + "</code>"
		 myform.addEventListener('submit', function(event) {
			  event.preventDefault(); 
			  console.log(search.value)
			  studentData = csv.filter(function(row) {
				if(row['رقم الطالب'] == search.value) {
				 return row;
				} else {
				  return
				}
			  });
			  console.log(studentData)
			  if(studentData.length != []) {
				output.innerHTML = "";
				studentData.forEach(function(row) {
				  output.innerHTML += `<p>اسم الطالب: <span>${row['اسم الطالب']}</span></p>`
				  output.innerHTML += `<p>مجموع النقاط: <span>${row['مجموع النقاط']}</span></p>`
				  output.innerHTML += `<p>الترتيب العام: <span>${row['الترتيب العام']}</span></p>`
				  output.innerHTML += `<p>المستوى: <span>${row['المستوى']}</span></p>`
				});
			  } else {
				output.innerHTML = `<p>تأكد من إدخال الرقم الصحيح للطالب</p>`
			  }
			  search.value = "";
		});
	});
});
