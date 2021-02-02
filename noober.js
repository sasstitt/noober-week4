async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)
  
  // 🔥 start here: write code to loop through the rides

  for(let j = 0; j < json.length; j++){
      let ride = json[j]

    if (ride.length > 1) {
      borderColor = 'border-gray-900'
      levelOfService = 'Noober Pool'
    } else if (ride[0].purpleRequested == true) {
      borderColor = 'border-purple-500'
      levelOfService = 'Noober Purple'
    } else if (ride[0].numberOfPassengers > 3) {
      levelOfService = 'Noober XL'
    } else {levelOfService = 'Noober X'}
  
    let outputElement = document.querySelector('.rides')
    outputElement.insertAdjacentHTML('beforeend',`
    <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
    <i class="fas fa-car-side"></i>
    <span>${levelOfService}</span>
    </h1>`) 

    for(let i = 0; i < ride.length; i++){
      passengerName = ride[i].passengerDetails.first + ' ' + ride[i].passengerDetails.last
      passengerPhone = ride[i].passengerDetails.phoneNumber
      passengerPickupAddressLine1 = ride[i].pickupLocation.address
      passengerPickupAddressLine2 = ride[i].pickupLocation.city + ', ' + ride[i].pickupLocation.state + ' ' + ride[i].pickupLocation.zip
      passengerDropoffAddressLine1 = ride[i].dropoffLocation.address
      passengerDropoffAddressLine2 = ride[i].dropoffLocation.city + ', ' + ride[i].dropoffLocation.state + ' ' + ride[i].dropoffLocation.zip
      numberOfPassengers = ride[i].numberOfPassengers + ' passengers'

    outputElement.insertAdjacentHTML('beforeend', ` 
    <div class="border-4 ${borderColor} p-4 my-4 text-left">
    <div class="flex">
      <div class="w-1/2">
        <h2 class="text-2xl py-1">${passengerName}</h2>
        <p class="font-bold text-gray-600">${passengerPhone}</p>
      </div>
      <div class="w-1/2 text-right">
        <span class="rounded-xl bg-purple-600 text-white p-2">
        ${numberOfPassengers}
        </span>
      </div>
    </div>
    <div class="mt-4 flex">
      <div class="w-1/2">
        <div class="text-sm font-bold text-gray-600">PICKUP</div>
        <p>${passengerPickupAddressLine1}</p>
        <p>${passengerPickupAddressLine2}</p>
      </div>
      <div class="w-1/2">
        <div class="text-sm font-bold text-gray-600">DROPOFF</div>
        <p>${passengerDropoffAddressLine1}</p>
        <p>${passengerDropoffAddressLine2}</p>
      </div>
    </div>
    </div>`)
    }   
  }
  }

window.addEventListener('DOMContentLoaded', pageLoaded)