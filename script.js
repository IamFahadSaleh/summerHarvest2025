
		const sheetId = "1pDWWDShH4wvdb1Snma7_pvqJ_7CwsPayZEaswDGa7VE";
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
          studentData = csv.filter(function(row) {
            if(row['رقم الطالب'] == search.value) {
             return row;
            } else {
              return
            }
          });
          if(studentData != []) {
            output.innerHTML = "";
            studentData.forEach(function(row) {
              output.innerHTML += `<li>اسم الطالب: <span>${row['اسم الطالب']}</span></li>`
              output.innerHTML += `<li>مجموع النقاط: <span>${row['مجموع النقاط']}</span></li>`
              output.innerHTML += `<li>الترتيب على الحلقة: <span>${row['الترتيب في الحلقة']}</span></li>`
              output.innerHTML += `<li>الترتيب على المرحلة: <span>${row['الترتيب في المرحلة']}</span></li>`
              output.innerHTML += `<li>الترتيب على الدورة: <span>${row['الترتيب العام']}</span></li>`
            });
          } else {
            output.innerHTML = "<li>تأكد من إدخال الرقم الصحيح للطالب</li>"
          }

          search.value = "";

       });
      });
		});