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
const locationDropdown = document.querySelector('.location-dropdown');
const selectedLocation = document.querySelector('.selected-location span');
const cityList = document.querySelector('.city-list');

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
      { name: 'Delhi Central', address: '45 Main Market, Connaught Place', time: '9:00 AM - 6:00 PM' },
      { name: 'South Delhi', address: '78 Green Park Market', time: '10:00 AM - 7:00 PM' },
      { name: 'East Delhi', address: '112 Laxmi Nagar Complex', time: '9:30 AM - 6:30 PM' }
    ],
    'Mumbai': [
      { name: 'Andheri West', address: '23 Link Road', time: '9:00 AM - 6:00 PM' },
      { name: 'Bandra', address: '45 Hill Road', time: '10:00 AM - 7:00 PM' },
      { name: 'Colaba', address: '89 Colaba Causeway', time: '9:30 AM - 6:30 PM' }
    ],
    // Add more cities and their locations as needed
  };
  
  const locationResults = document.querySelector('.location-results');
  const cityLocations = locations[city] || locations['Delhi']; // Default to Delhi if city not found
  
  locationResults.innerHTML = cityLocations.map(location => `
    <div class="location-item">
      <h3>${location.name}</h3>
      <p><i class="fas fa-map-marker-alt"></i> ${location.address}</p>
      <p><i class="fas fa-clock"></i> ${location.time}</p>
      <button class="location-btn">Get Directions</button>
    </div>
  `).join('');
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
pickupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const items = document.getElementById('items').value;
  
  // In a real application, you would send this data to a server
  console.log({ name, phone, address, date, time, items });
  
  // Show success message
  alert(`Thank you, ${name}! Your pickup has been scheduled for ${date} between ${time.replace('-', '-')} hours. We'll contact you at ${phone} to confirm. The pickup fee of ₹199 will be collected at the time of pickup.`);
  
  // Reset form and close modal
  pickupForm.reset();
  closeModal(pickupModal);
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
  window.open('https://www.who.int/news-room/fact-sheets/detail/electronic-waste', '_blank');
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