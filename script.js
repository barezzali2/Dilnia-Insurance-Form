const name = document.getElementById('cusName');
      const age = document.getElementById('cusAge');
      const phoneNumber = document.getElementById('cusPhone');
      const carNumber = document.getElementById('carNum');
      const startDate = document.getElementById('startDate');
      const endDate = document.getElementById('endDate');
      const newC = document.getElementById('new');
      const usedC = document.getElementById('used');
      const kmReached = document.getElementById('kmReached');
      const carColor = document.getElementById('carColor');
      const licNum = document.getElementById('licNum');
      const carReg = document.getElementById('carReg');


      
      const carValue = document.getElementById('value');
      // const insValue = document.getElementById('insuranceValue');
      const insPlan = document.getElementById('insurance');
      const result = document.getElementById('finalResult');
      const currType = document.getElementById("currType");   
     
      const vehicle = document.getElementById('vehicle');
      const brand = document.getElementById('brand');
      const model = document.getElementById('model');
      
      const theForm = document.getElementById('theForm');
      const submitButton = document.getElementById('submitBtn');
      
      
     
      
      const vehicles = {
        Car: [" ", "Toyota", "Nissan", "Ford"],
        
      };
      
      const brands = {
        Toyota: [" ", "Corolla", "Camry", "Rav"],
        Nissan: [" ", "Rogue", "Altima", "Sentra"],
        Ford: [" ", "Escape", "Explorer"],
        
      };
      
      
      function updateBrands() {
        brand.innerHTML = ' ';
        model.innerHTML = ' ';
        
        const selectedVehicle = vehicle.value;

        if (vehicles[selectedVehicle]) {
          vehicles[selectedVehicle].forEach((vehicleBrand) => {
            const option = document.createElement('option');
            option.value = vehicleBrand;
            option.textContent = vehicleBrand;
            brand.appendChild(option);
          });
          updateModels(); // 
        }
      }
      
      function updateModels() {
        model.innerHTML = ' ';
        const selectedBrand = brand.value;
        
        if (brands[selectedBrand]) {
          brands[selectedBrand].forEach((carModel) => {
            const option = document.createElement('option');
            option.value = carModel;
            option.textContent = carModel;
            model.appendChild(option);
          });
        }
      }
      
      function currConverter(price) {
        return price * 1500;
      }
      
      function calculate() {
        const insurancePrice = Number(insPlan.value) || 1;
        const carPrice = Number(carValue.value);
        let price = carPrice * insurancePrice;
        
        if (currType.value === "USD") {
          result.textContent = `${price}$`;
        } else if (currType.value === "IQD") {
          let currConverted = currConverter(price);
          result.textContent = `${currConverted} IQD`;
        }
      }

      async function addInfo() {

        let carCondition;
    if (newC.checked) {
        carCondition = "New";
    } else if (usedC.checked) {
        carCondition = "Used";
    }
    
        const response = await fetch('http://localhost:3000/car',
                {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({
                      "name": name.value,
                      "age": age.value,
                      "phoneNumber": phoneNumber.value,
                      "vehicle": vehicle.value,
                      "brand": brand.value,
                      "model": model.value,
                      "value": carValue.value,
                      "kmReached": kmReached.value,
                      "carNumber": carNumber.value,
                      "carColor": carColor.value,
                      "licenceNum": licNum.value,
                      "carReg": carReg.value,
                      "newCondition": newC.value,
                      "usedCondition": usedC.value,
                      "startDate": startDate.value, 
                      "endDate": endDate.value, 
                      "insurancePlan": insPlan.value, 
                      "insurancePrice": result.textContent
                    })
                }
            )

            showInfo()
      }

      async function showInfo() {

      const response = await fetch('http://localhost:3000/showcar')
      let carInformation = await response.json();
      console.log(carInformation);

      carInformation.forEach(carInfo => {

          let carReport = `
                  <h2>Vehicle Insurance Report</h2>
                  <p>Name: <span>${carInfo.name}</span></p>
                  <p>Age: <span>${carInfo.age}</span></p>
                  <p>Phone Number: <span>${carInfo.phoneNumber}</span></p>
                  <p>Vehicle: <span>${carInfo.vehicle}</span></p>
                  <p>Brand: <span>${carInfo.brand}</span></p>
                  <p>Model: <span>${carInfo.model}</span></p>
                  <p>Vehicle Value: <span>${carInfo.value}$</span></p>
                  <p>Km Reached: <span>${carInfo.kmReached}</span></p>
                  <p>Car Number: <span>${carInfo.carNumber}</span></p>
                  <p>Car Color: <span>${carInfo.carColor}</span></p>
                  <p>Car Licence Number: <span>${carInfo.licenceNum}</span></p>
                  <p>Car Registration Number: <span>${carInfo.carReg}</span></p>
                  <p>Car Condition: <span>${carInfo.newCondition ? "New" : "Used"}</span></p>
                  <p>Insurance Plan: <span id="insurance">${carInfo.insurancePlan * 100}%</span></p>
                  <p>Start Date: <span id="startDate">${carInfo.startDate}</span></p>
                  <p>End Date: <span id="endDate">${carInfo.endDate}</span></p>
                  <p>Insurance Price: <span id="insurancePrice">${carInfo.insurancePrice}</span></p>
                  <button id="download" class="no-print" style="background-color: #d1d1d1, color: black;">Download</button>
                  <button id="print" class="no-print" style="background-color: #d1d1d1, color: black;">Print</button>
                  `
      const report = document.querySelector("#report").innerHTML = carReport;

      document.getElementById('report-container').style.display = 'block';
      });
}
 

       submitButton.addEventListener('click', () => {
        if (theForm.checkValidity()) {
          addInfo();
          theForm.reset(); 
          result.textContent = ''; 
        } else {
          theForm.reportValidity(); 
        }
      });


      document.addEventListener('click', function(event) {
    if (event.target.id === 'print') {
      window.print();
    }

    if (event.target.id === 'download') {
      const reportContent = document.getElementById('report').textContent;
      
      if (!reportContent.trim()) {
        console.log("Report  is empty!");
        return;
      }
      
      console.log("Report content:", reportContent); 

      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'vehicle_insurance_report.txt';
      document.body.appendChild(a);
      a.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  });


    

        function calculateDays() {
        const sDate = startDate.value;
        const eDate = endDate.value;

        if (sDate && eDate) {
            const start = new Date(sDate);
            const end = new Date(eDate);

            const timeDifference = end - start;
            const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

            document.getElementById("dateCalc").textContent = 
                dayDifference >= 0 ? `${dayDifference} days` : "End date must be after start date.";

            document.getElementById('dateCalc').style.display = 'block';
        }
      }

      
      carValue.addEventListener('input', calculate);
      insPlan.addEventListener('change', calculate);
      currType.addEventListener('change', calculate);
      vehicle.addEventListener('change', updateBrands);
      brand.addEventListener('change', updateModels);
      
      updateBrands();