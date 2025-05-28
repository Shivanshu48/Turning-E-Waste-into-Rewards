// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropOffBtn = document.getElementById('dropOffBtn');
const pickupBtn = document.getElementById('pickupBtn');
const dropOffModal = document.getElementById('dropOffModal');
const pickupModal = document.getElementById('pickupModal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const pickupForm = document.getElementById('pickupForm');
const newsletterForm = document.getElementById('newsletter-form');
const counterElements = document.querySelectorAll('.counter');
const mapMarkers = document.querySelectorAll('.map-marker');
const ctaButton = document.querySelector('.cta-button');
const knowMoreBtn = document.querySelector('.know-more-btn');
let locationDropdown = document.querySelector('.location-dropdown');
let selectedLocation = document.querySelector('.selected-location span');
let cityList = document.querySelector('.city-list');

// City selection functionality
locationDropdown.addEventListener('click', (e) => {
  e.stopPropagation();
  locationDropdown.classList.toggle('active');
});

document.addEventListener('click', () => {
  locationDropdown.classList.remove('active');
});

cityList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const city = e.target.getAttribute('data-city');
    selectedLocation.textContent = city;
    locationDropdown.classList.remove('active');
    
    // Update locations in the drop-off modal based on selected city
    updateDropOffLocations(city);
  }
});

function updateDropOffLocations(city) {
  const locations = {
    'Delhi': [
      { name: 'Global Waste Solution', address: '45 Main Market, Connaught Place', rating: '4*' , wasterecycledlastmonth: '2500kg' , contact: '9999253054' ,email: 'glblwaste12@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name: 'Swach Enviro E-waste India Pvt. Ltd.', address: '21 Ring Road, Transport Centre (Near Punjabi Bagh Flyover), New Delhi-110035', rating: '3.5*' , wasterecycledlastmonth: '1500kg' , contact: '9268568539' ,email: 'swachhenv0812@gmail.com' , time: '10:00 AM - 7:00 PM' },
      { name: 'Namo eWaste Management Ltd.', address: 'B-91, A-6, LGF, Kalkaji, South Delhi, New Delhi 110019', rating: '3*' , wasterecycledlastmonth: '1000kg' , contact: '9939274084' ,email: 'namowaste322@gmail.com' , time: '9:30 AM - 6:30 PM' },
      { name: 'BRP Infotech Pvt. Ltd.', address: 'Plot No-535, Basement, F.I.E Patparganj, East Delhi, Delhi-110092', rating: '4*' , wasterecycledlastmonth: '2000kg' , contact: '8998263155' ,email: 'brpinfo112@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name:'Muskan Technologies',address : 'B-96, Okhla Industrial Area, Phase-1, Delhi - 110020' , rating: '3.8*',wasterecycledlastmonth: '2600kg',contact: '9854321170', email: 'muskan3450@gmail.com',time: '9:00 AM - 6:00 PM'}
      
    ],
    'Mumbai': [
      { name: 'E Waste Recycling India', address: '615, Pearl Plaza Premises, Andheri West, Mumbai  400058', rating: '4.5*' , wasterecycledlastmonth: '2800kg' , contact: '9234253028' ,email: 'greenindia112@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name: 'Nicholas Recycling Pvt. Ltd.', address: 'Nicholas Compound, Sativali Road, Valiv, Vasai East  401208', rating: '3.5*' , wasterecycledlastmonth: '2750kg' , contact: '9244557619' ,email: 'nicholas000@gmail.com' , time: '10:00 AM - 7:00 PM' },
      { name: 'Just Dispose Recycling Pvt. Ltd.', address: 'Unit No: 103, 110, 119, Arvind Industrial Estate, Navghar, Vasai East, Dist. Thane', rating: '3*' , wasterecycledlastmonth: '2000kg' , contact: '8902135676' ,email: 'disposejst3228@gmail.com' , time: '9:30 AM - 6:30 PM' },
      { name: 'Kohinoor E-Waste Recycling Pvt. Ltd.', address: 'Gut No. 205/1 and 205/2, Opp. Gurudatta Washing Centre, Dhekhu, Khalapur, Dist. Raigad', rating: '4*' , wasterecycledlastmonth: '2800kg' , contact: '9874324595' ,email: 'kohi12noor2@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name:'Masstech Recycling LLP',address : 'Gala No. 56, 58, 59 & 82, M.J.K. Compound, Kherani Road, Sakinaka, Mumbai  400072' , rating: '3.8*',wasterecyclelastmonth: '2800kg',contact: '9854090758', email: 'masstech300@gmail.com',time: '9:00 AM - 6:00 PM'}
    ],
    'Bangalore':[
      { name: 'Ebox Recyclers  Electronic City', address: ' Shed #B-3, KSSIDC Industrial Estate, Veerasandra 2nd Stage, Huskur Road, Electronic City, Bangalore 560100', rating: '4.5*' , wasterecycledlastmonth: '2800kg' , contact: '9844068944' ,email: 'eboxx@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name: 'Ecofly E-Waste Recycling Pvt. Ltd.  Nelamangala', address: 'No. 63A, Dasanapur (H), NH4, Tumkur Road, Behind Hanuman Temple, Nelamangala, Bangalore 562123', rating: '3.5*' , wasterecycledlastmonth: '2750kg' , contact: '8675231456' ,email: 'ecofly72fly0@gmail.com' , time: '10:00 AM - 7:00 PM' },
      { name: 'EWOUR  Peenya Industrial Area', address: 'Plot #5C, Peenya Industrial Area, Bangalore 560058', rating: '3*' , wasterecycledlastmonth: '2000kg' , contact: '9986172763' ,email: 'ewourpeenya@gmail.com' , time: '9:30 AM - 6:30 PM' },
      { name: 'E-Parisaraa Pvt. Ltd.  Peenya', address: 'No. B-41/1, 3rd Stage, Peenya Industrial Estate, Bangalore 560058', rating: '4*' , wasterecycledlastmonth: '2800kg' , contact: '080-28360902' ,email: 'recycle@ewasteindia.com' , time: '9:00 AM - 6:00 PM' },
      { name:' Zolopik E-Waste Recycler  JP Nagar',address : 'No. 23rd A, Marenahalli Main Road, 2nd Phase, J. P. Nagar, Bangalore 560040' , rating: '3.8*',wasterecycledlastmonth: '2800kg',contact: '8884449985', email: 'recycle@zolopik.com',time: '9:00 AM - 6:00 PM'}
      

    ],
    'Chennai':[
      { name: 'Sree E-Waste Recycling', address: '14, Velachery Rd, Dhadeswaram Nagar, Velachery, Chennai, Tamil Nadu 600042', rating: '4.5*' , wasterecycledlastmonth: '2800kg' , contact: '9098654123' ,email: 'sreee2@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name: 'Ramky ARM  E-Waste Recycling, Computer Scrap Buyers and Collection Center', address: '4, Diamond Dune, 323, NH 4, Rajaram Mehta Nagar, Aminjikarai, Chennai, Tamil Nadu 600029', rating: '3.5*' , wasterecycledlastmonth: '2750kg' , contact: '9922453278' ,email: 'ramkyarm@gmail.com' , time: '10:00 AM - 7:00 PM' },
      { name: 'Global Waste Recyclers Limited', address: 'Saravana Complex, IIIrd Floor, 200, Peters Road, Royapettah, Chennai, Tamil Nadu 600014', rating: '3*' , wasterecycledlastmonth: '2000kg' , contact: '8712563429' ,email: 'globalwaste11@gmail.com' , time: '9:30 AM - 6:30 PM' },
      { name: 'Recykal Technology Pvt Ltd.', address: 'No 69,4th Main Rd, Sithalapakkam, Chennai, Tamil Nadu 600126', rating: '4*' , wasterecycledlastmonth: '2800kg' , contact: '9765416248' ,email: 'recykal3456@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name: 'Anthony Traders',address : 'Back side, No.1, Vivekanand St, near Karumari Amman Kovil, Annani Indira Nagar, Indira Nagar, Okkiyampettai, Chennai, Thoraipakkam, Tamil Nadu 600097' , rating: '3.8*',wasterecycledlastmonth: '2800kg',contact: '9854090758', email: 'anthony7878@gmail.com',time: '9:00 AM - 6:00 PM'}
      
    ],
    'Kolkata':[
      { name: 'Kolkata Municipal Corporation (KMC)  Dhapa Garage', address: 'Dhapa Garage, Tangra, Kolkata', rating: '4.5*' , wasterecycledlastmonth: '2800kg' , contact: '9804103317' ,email: 'kmc.012@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name: 'Eco Age Recycling', address: 'Kashipur, South 24 Parganas, Kolkata 700135', rating: '3.5*' , wasterecycledlastmonth: '2750kg' , contact: '8584888008' ,email: 'ecoagerecycle@gmail.com' , time: '10:00 AM - 7:00 PM' },
      { name: 'E-Waste Recyclers India (EWRI)  OM Logistics Ltd.', address: 'P-1, New C.I.T P-46 Extn., Near Brace Bridge Railway Station, Hide Road, Kolkata 700088', rating: '3*' , wasterecycledlastmonth: '2000kg' , contact: '8017307286' ,email: 'emriom99@gmail.com' , time: '9:30 AM - 6:30 PM' },
      { name: 'Ecompusell', address: 'Tirupati Apartment No. G-2, 165/1 Ashok Garh, Kolkata 700108', rating: '4*' , wasterecycledlastmonth: '2800kg' , contact: '9330988059' ,email: 'ecompusell88@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name:'Quickssell',address : '33/H/3, Mirza Ghalib Street, Kolkata 700016' , rating: '3.8*',wasterecycledlastmonth: '2800kg',contact: '8335981512', email: 'sellkaro68@gmail.com',time: '9:00 AM - 6:00 PM'}
      
    ],
    'Hyderabad':[
      { name: 'Re Sustainability (Formerly Ramky Enviro Engineers)', address: 'Hyderabad, Telangana', rating: '4.5*' , wasterecycledlastmonth: '2800kg' , contact: '8754963215' ,email: 'gliug12@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name: 'Crapbin Recycling Pvt. Ltd.', address: ' Hyderabad, Telangana', rating: '3.5*' , wasterecycledlastmonth: '2750kg' , contact: '9658478596' ,email: 'crapbin876@gmail.com' , time: '10:00 AM - 7:00 PM' },
      { name: 'Khaja Agency (Auctus E Recycling Solutions)', address: 'Behind MMR Garden, RR Nagar, Old Bowenpally, Secunderabad, Hyderabad 500011', rating: '3*' , wasterecycledlastmonth: '2000kg' , contact: '9761688731' ,email: 'khaja1khaja@gmail.com' , time: '9:30 AM - 6:30 PM' },
      { name: 'Technics Infosolutions Pvt. Ltd.', address: '5-9-58/1-15, Plot Number -702, Babu Khan Estate, Basheer Bagh, Hyderabad 500001', rating: '4*' , wasterecycledlastmonth: '2800kg' , contact: '9390821276' ,email: 'technics123@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name:'E-Waste Recycling Centers',address : 'Hyderabad, Telangana' , rating: '3.8*',wasterecycledlastmonth: '2800kg',contact: '8524639847', email: 'recyclewaste44@gmail.com',time: '9:00 AM - 6:00 PM'}
      
    ],
    'Pune':[
     { name: 'SK E-Waste Disposal', address: 'Gate No. 116, Fine Weight Bridge, Jadhavwadi, Chikhali, Tal: Haveli, Dist: Pune', rating: '4.5*' , wasterecycledlastmonth: '2800kg' , contact: '7585954612' ,email: 'shifatreaders92@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name: 'Green IT Recycling Centre Pvt. Ltd.', address: 'Gate No. 207, Plot No. 3 & 4, Near Scienunero Company, Near PMT Depot, Shindewadi, Tal. Bhor, Dist. Pune', rating: '3.5*' , wasterecycledlastmonth: '2750kg' , contact: '6394521524' ,email: 'rth_raj@hotmail.com' , time: '10:00 AM - 7:00 PM' },
      { name: 'Kuldeep E-Waste Disposals', address: 'Office No. 13, Manikmoti Complex, Near Reliance Digital, Katraj Chowk, Pune – 411046', rating: '3*' , wasterecycledlastmonth: '2000kg' , contact: '7733995555' ,email: 'info@ewastekuldeep.com' , time: '9:30 AM - 6:30 PM' },
      { name: 'Pune Greens Electronic Waste Recycler Pvt. Ltd.', address: 'Sr. No. 63/1, B-4/1, Handewadi Road, Hadapsar, Pune', rating: '4*' , wasterecycledlastmonth: '2800kg' , contact: '9922071877' ,email: 'punegreensewaste@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name:'Shankar Enterprises',address : 'Maharashtra,Pune' , rating: '3.8*',wasterecycledlastmonth: '2800kg',contact: ' 9637108189', email: 'ewastepune0@gmail.com',time: '9:00 AM - 6:00 PM'}
      
     
    ],
    'Ahmedabad':[
      { name: ' ECS Environment Pvt. Ltd.', address: ' THE FIRST, B-02, ECS Corporate House, Besides ITC Narmada Hotel, Vastrapur, Ahmedabad, Gujarat 380015', rating: '4.5*' , wasterecycledlastmonth: '2800kg' , contact: ' 89800 04000' ,email: 'ewaste@ecscorporation.com' , time: '9:00 AM - 6:00 PM' },
      { name: 'E-Coli Waste Management Pvt. Ltd.', address: '203, Trade Square, Opp. Torrent Power House, Sabarmati, Ahmedabad 380005', rating: '3.5*' , wasterecycledlastmonth: '2750kg' , contact: '70464 69000' ,email: 'info@ecoliwaste.com' , time: '10:00 AM - 7:00 PM' },
      { name: 'Madhav Pastiwala', address: ' Shop-14, Madhav Complex, Near Vasna Bus Station, Jivraj Mehta Hospital Road, Near Prajapati Garden, Vasna, Ahmedabad 380007', rating: '3*' , wasterecycledlastmonth: '2000kg' , contact: ' 88666 96614' ,email: 'madhavpastiwala@gmail.com' , time: '9:30 AM - 6:30 PM' },
      { name: 'Gulshan IBC Group', address: ' Kamod Circle - Bakrol, Ahmedabad, Gujarat', rating: '4*' , wasterecycledlastmonth: '2800kg' , contact: ' 91576 15075' ,email: 'gulshanibc@gmail.com' , time: '9:00 AM - 6:00 PM' },
      { name:'BioMax Security',address : 'Ahmedabad, Gujarat' , rating: '3.8*',wasterecycledlastmonth: '2800kg',contact: '8547965479', email: 'biomax234@gmail.com',time: '9:00 AM - 6:00 PM'}
      
      
    ]
    // Add more cities and their locations as needed
  };
  
  const container = document.querySelector('.location-results');
  container.innerHTML = '';  // Clear existing locations

  if (!locations[city]) {
    container.innerHTML = '<p>No locations found for this city.</p>';
    return;
  }

  locations[city].forEach(loc => {
    const locDiv = document.createElement('div');
    locDiv.classList.add('location-item');
    locDiv.innerHTML = `
      <h3>${loc.name}</h3>
      <p><i class="fas fa-map-marker-alt"></i> ${loc.address}</p>
      <p><i class="fas fa-clock"></i> ${loc.time}</p>
      <p>Rating: ${loc.rating}</p>
      <p>Waste Recycled Last Month: ${loc.wasterecycledlastmonth}</p>
      <p>Contact: <a href="tel:${loc.contact}">${loc.contact}</a></p>
      <p>Email: <a href="mailto:${loc.email}">${loc.email}</a></p>
      <button class="location-btn">Get Directions</button>
    `;
    container.appendChild(locDiv);
  });
}

// Navigation bar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  
  // Animate hamburger bars
  const bars = hamburger.querySelectorAll('.bar');
  if (hamburger.classList.contains('active')) {
    bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
  } else {
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    
    // Reset hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  });
});

// Modal functions
function openModal(modal) {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Modal event listeners
dropOffBtn.addEventListener('click', () => openModal(dropOffModal));
pickupBtn.addEventListener('click', () => openModal(pickupModal));

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    closeModal(dropOffModal);
    closeModal(pickupModal);
  });
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === dropOffModal) {
    closeModal(dropOffModal);
  }
  if (e.target === pickupModal) {
    closeModal(pickupModal);
  }
});

// Form submissions
pickupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    items: document.getElementById('items').value,
    email: document.getElementById('email') ? document.getElementById('email').value : '', // add email field to form
  };

  try {
   const response = await fetch('http://localhost:5000/schedule-pickup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

   if (response.ok) {
  alert(result.message);
  pickupForm.reset();
  closeModal(pickupModal);
} else {
  alert('Failed to schedule pickup: ' + (result.message || result.error || 'Unknown error'));
}
  } catch (error) {
    alert('Error scheduling pickup: ' + error.message);
  }
});

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = e.target.querySelector('input[type="email"]').value;
  
  // In a real application, you would send this email to your newsletter service
  console.log({ email });
  
  // Show success message
  alert(`Thank you for subscribing with ${email}! You'll now receive our latest updates.`);
  
  // Reset form
  e.target.reset();
});

// Counter animation
function animateCounter() {
  counterElements.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    
    // Calculate increment value based on target
    const increment = target / 100;
    
    if (count < target) {
      // Update count value and display
      counter.innerText = Math.ceil(count + increment);
      // Continue animation
      setTimeout(animateCounter, 30);
    } else {
      counter.innerText = target.toLocaleString();
    }
  });
}

// Intersection Observer for counter animation
const statsSection = document.querySelector('.stats');
const statObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounter();
    statObserver.unobserve(entries[0].target);
  }
}, { threshold: 0.5 });

statObserver.observe(statsSection);

// Map marker interaction
mapMarkers.forEach(marker => {
  marker.addEventListener('mouseover', () => {
    marker.style.transform = 'rotate(-45deg) scale(1.2)';
  });
  
  marker.addEventListener('mouseout', () => {
    marker.style.transform = 'rotate(-45deg)';
  });
  
  marker.addEventListener('click', () => {
    const location = marker.getAttribute('data-location');
    openModal(dropOffModal);
    // Scroll to the specific location in the modal
    const locationElement = Array.from(document.querySelectorAll('.location-item h3'))
      .find(el => el.textContent === location)
      ?.closest('.location-item');
    if (locationElement) {
      locationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

// CTA Button interaction
ctaButton.addEventListener('mouseover', () => {
  ctaButton.style.transform = 'translateY(-5px)';
  ctaButton.style.boxShadow = '0 15px 25px rgba(0, 0, 0, 0.3)';
});

ctaButton.addEventListener('mouseout', () => {
  ctaButton.style.transform = 'translateY(-3px)';
  ctaButton.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
});

ctaButton.addEventListener('click', () => {
  // Smooth scroll to services section
  document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
});

// Know More button functionality
knowMoreBtn.addEventListener('click', () => {
  window.open('education.html', '_blank');
});

// Initialize active navigation link based on scroll position
function setActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

// Add animation classes to elements when they come into view
const fadeElements = document.querySelectorAll('.service-card, .stat-card, .about-card');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(element);
});





// for map

let centers = [];  // Flattened array with city field

// Initialize Leaflet map centered on India
const map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markersGroup = L.layerGroup().addTo(map);

function showMarkersForCity(city) {
  markersGroup.clearLayers();

  const filteredCenters = centers.filter(center => center.city.toLowerCase() === city.toLowerCase());

  if (filteredCenters.length === 0) {
    alert(`No centers found for ${city}`);
    return;
  }

  const bounds = [];

  filteredCenters.forEach(center => {
    if (!center.latitude || !center.longitude) return;

    const lat = parseFloat(center.latitude);
    const lng = parseFloat(center.longitude);

    const marker = L.marker([lat, lng]).addTo(markersGroup);
    const popupContent = `
      <b>${center.name}</b><br/>
      ${center.address}<br/>
      Rating: ${center.rating}<br/>
      Contact: ${center.contact}<br/>
      Email: ${center.email}<br/>
      Time: ${center.time}<br/>
      Recycled: ${center.wasteRecycledLastMonth}
    `;
    marker.bindPopup(popupContent);
    bounds.push([lat, lng]);
  });

  if (bounds.length === 1) {
    map.setView(bounds[0], 12);
  } else {
    map.fitBounds(bounds, { padding: [50, 50] });
  }
}

// Load centres.json and initialize
fetch('centres.json')
  .then(res => res.json())
  .then(data => {
    // Flatten JSON into an array with city property
    for (const city in data) {
      const cityCenters = data[city];
      cityCenters.forEach(center => {
        centers.push({
          city,
          name: center.name,
          address: center.address,
          rating: center.rating,
          contact: center.contact,
          email: center.email,
          time: center.time,
          wasteRecycledLastMonth: center.wasteRecycledLastMonth,
          latitude: center.latitude || center.lat || center.LATITUDE,  // Optional if you add coordinates
          longitude: center.longitude || center.lng || center.LONGITUDE
        });
      });
    }

    showMarkersForCity('Delhi');  // Default city on load
  })
  .catch(err => console.error('Failed to load centres.json:', err));

// Dropdown selection logic
 locationDropdown = document.querySelector('.location-dropdown');
 selectedLocation = locationDropdown.querySelector('.selected-location span');
 cityList = locationDropdown.querySelector('.city-list');

// Toggle city list visibility
locationDropdown.querySelector('.selected-location').addEventListener('click', () => {
  cityList.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!locationDropdown.contains(e.target)) {
    cityList.classList.remove('show');
  }
});

// Handle city selection
cityList.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    const city = li.getAttribute('data-city');
    selectedLocation.textContent = city;
    cityList.classList.remove('show');
    showMarkersForCity(city);
  });
});

//get direction 
document.addEventListener("DOMContentLoaded", () => {
    fetch("centres.json")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data); // 1️⃣ Debugging: Log fetched JSON

            // Flatten all city-based arrays into a single list of locations
            const allLocations = Object.values(data).flat();

            if (!Array.isArray(allLocations) || allLocations.length === 0) {
                console.error("No valid location data found:", allLocations);
                return;
            }

            attachClickListeners(allLocations);
        })
        .catch(error => console.error("Error fetching location data:", error));
});

function attachClickListeners(locations) {
    document.addEventListener("click", event => {
        if (event.target.classList.contains("location-btn")) {
            const locationName = event.target.parentElement.querySelector("h3").textContent.trim();
            console.log("Extracted Location Name:", locationName); // 1️⃣ Debugging: Log extracted name

            // 2️⃣ Ensure case-insensitive matching and allow partial matches
            const locationData = locations.find(location => 
                locationName.toLowerCase().includes(location.name.toLowerCase())
            );

            if (locationData) {
                const { latitude, longitude } = locationData;
                console.log(`Opening Google Maps for: ${locationName} (${latitude}, ${longitude})`); // 3️⃣ Debugging: Log match success
                window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank");
            } else {
                console.error(`Location data not found for: "${locationName}".`);
                alert(`No location found for "${locationName}". Please check if the name exactly matches the entries in JSON.`);
            }
        }
    });
}
