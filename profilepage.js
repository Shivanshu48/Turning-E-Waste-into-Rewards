document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const profileImage = document.getElementById('profile-image');
  const changeImageBtn = document.getElementById('change-image-btn');
  const removeImageBtn = document.getElementById('remove-image-btn');
  const imageUpload = document.getElementById('image-upload');
  const saveProfileBtn = document.getElementById('save-profile-btn');
  const deleteAccountBtn = document.getElementById('delete-account-btn');
  const deleteModal = document.getElementById('delete-modal');
  const closeModal = document.getElementById('close-modal');
  const confirmDelete = document.getElementById('confirm-delete');
  const cancelDelete = document.getElementById('cancel-delete');
  const userName = document.getElementById('user-name');
  const userNameInput = document.getElementById('name');

  // Profile Data (would normally come from a backend API)
  let userData = {
    name: 'Suhani Tiwari',
    email: 'tiwarisuhani@gmail.com',
    mobile: '+91 9838394848',
    address: '123 Green Street, Eco City, EC 12345',
    ecoPoints: 1250,
    stats: {
      ewasteRecycled: 75,
      pickupsCompleted: 12,
      co2Saved: 35
    },
    profileImage: null
  };

  // Initialize profile image
  function initProfileImage() {
    if (userData.profileImage) {
      // If user has a profile image
      profileImage.innerHTML = `<img src="${userData.profileImage}" alt="${userData.name}'s profile">`;
      removeImageBtn.style.display = 'block';
    } else {
      // Display initials if no image
      const initials = getInitials(userData.name);
      profileImage.innerHTML = `<span class="profile-initials">${initials}</span>`;
      removeImageBtn.style.display = 'none';
    }
  }

  // Get initials from name
  function getInitials(name) {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  // Update profile data display
  function updateProfileDisplay() {
    userName.textContent = userData.name;
    document.getElementById('eco-points-value').textContent = userData.ecoPoints.toLocaleString();
    document.getElementById('total-ewaste').textContent = userData.stats.ewasteRecycled;
    document.getElementById('pickups-completed').textContent = userData.stats.pickupsCompleted;
    document.getElementById('co2-saved').textContent = userData.stats.co2Saved;
    
    // Update form inputs
    userNameInput.value = userData.name;
    document.getElementById('email').value = userData.email;
    document.getElementById('mobile').value = userData.mobile;
    document.getElementById('address').value = userData.address;
    
    // Update profile image
    initProfileImage();
  }

  // Handle profile image change
  changeImageBtn.addEventListener('click', function() {
    imageUpload.click();
  });

  // Handle profile image upload
  imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        showNotification('Please select an image file', 'error');
        return;
      }
      
      // Size validation (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification('Image size should be less than 5MB', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function(event) {
        userData.profileImage = event.target.result;
        initProfileImage();
        showNotification('Profile image updated', 'success');
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle profile image removal
  removeImageBtn.addEventListener('click', function() {
    userData.profileImage = null;
    initProfileImage();
    showNotification('Profile image removed', 'success');
  });

  // Handle clicking on profile image
  profileImage.addEventListener('click', function() {
    imageUpload.click();
  });

  // Handle save profile changes
  saveProfileBtn.addEventListener('click', function() {
    // Get values from form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const address = document.getElementById('address').value.trim();
    
    // Basic validation
    if (!name || !email || !mobile || !address) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Update user data
    userData.name = name;
    userData.email = email;
    userData.mobile = mobile;
    userData.address = address;
    
    // Update UI
    updateProfileDisplay();
    showNotification('Profile updated successfully', 'success');
    
    // In a real app, you would send this data to your backend
    console.log('Profile updated:', userData);
  });

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Handle delete account button
  deleteAccountBtn.addEventListener('click', function() {
    deleteModal.style.display = 'flex';
  });

  // Handle close modal button
  closeModal.addEventListener('click', function() {
    deleteModal.style.display = 'none';
  });

  // Handle cancel delete button
  cancelDelete.addEventListener('click', function() {
    deleteModal.style.display = 'none';
  });

  // Handle confirm delete button
  confirmDelete.addEventListener('click', function() {
    // In a real app, you would send a delete request to your backend
    showNotification('Account deleted successfully', 'success');
    
    // Redirect to homepage or login page
    setTimeout(() => {
      alert('In a real application, you would be redirected to the homepage or login page.');
      deleteModal.style.display = 'none';
    }, 2000);
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === deleteModal) {
      deleteModal.style.display = 'none';
    }
  });

  // Notification system
  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification to the DOM
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 16px';
    notification.style.borderRadius = '4px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.3s forwards';
    
    // Set background color based on type
    if (type === 'success') {
      notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
      notification.style.backgroundColor = '#F44336';
    } else {
      notification.style.backgroundColor = '#2196F3';
    }
    
    // Create keyframes for animations
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      </style>
    `);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Animation for stats
  function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
      const finalValue = parseInt(stat.textContent);
      let startValue = 0;
      const duration = 1500;
      const startTime = performance.now();
      
      function updateCount(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          const easedProgress = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2; // Ease in-out quad
          
          const currentValue = Math.floor(easedProgress * finalValue);
          stat.textContent = currentValue;
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = finalValue;
        }
      }
      
      requestAnimationFrame(updateCount);
    });
  }

  // Initialize the profile data display
  updateProfileDisplay();
  
  // Animate stats when page loads
  setTimeout(animateStats, 500);
  
  // Demo buttons for scheduled pickups
  document.querySelectorAll('.pickup-actions button').forEach(button => {
    button.addEventListener('click', function() {
      const action = this.textContent;
      const pickupItem = this.closest('.pickup-item');
      const pickupTitle = pickupItem.querySelector('.pickup-title').textContent;
      
      showNotification(`${action} pickup: ${pickupTitle}`, 'info');
    });
  });
  
  // Other account option buttons
  document.querySelectorAll('.account-option:not(.danger) button').forEach(button => {
    button.addEventListener('click', function() {
      const option = this.previousElementSibling.querySelector('h4').textContent;
      showNotification(`${option} option selected`, 'info');
    });
  });
  
  // Schedule new pickup button
  document.querySelector('.pickups-actions .btn-primary').addEventListener('click', function() {
    showNotification('New pickup scheduling feature would open here', 'info');
  });
  
  // View pickup history button
  document.querySelector('.pickups-actions .btn-outline').addEventListener('click', function() {
    showNotification('Pickup history would display here', 'info');
  });
});