document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fetch properties on page load
    loadProperties();

    // Form submission handling (AJAX)
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulating AJAX request
            const formData = new FormData(this);
            const name = formData.get('name');
            
            formMessage.innerHTML = 'Sending...';
            formMessage.style.color = '#333';
            
            // Real network request using Formsubmit
            fetch("https://formsubmit.co/ajax/mumtazcontact@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message')
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === "false" || data.success === false) {
                    // Formsubmit API returned an error (like needing activation)
                    formMessage.innerHTML = "Error: " + (data.message || "Please activate your email via a standard form submission first.");
                    formMessage.style.color = 'red';
                } else {
                    formMessage.innerHTML = 'someone will contact you in 24 hours, you message has been received';
                    formMessage.style.color = 'green';
                    contactForm.reset();
                }
            })
            .catch(error => {
                formMessage.innerHTML = 'Oops! There was a problem submitting your form. Please try again.';
                formMessage.style.color = 'red';
            });
        });
    }
});

function loadProperties() {
    const propertyList = document.getElementById('property-list');
    
    // Mock data for properties
    const mockProperties = [
        {
            id: 1,
            title: "Beautiful Home in Oshawa",
            price: "$1,099,900",
            address: "1178 Salmers Drive, Oshawa, ON",
            image: "images/1178-salmers-drive.jpg",
            beds: 4,
            baths: 5,
            link: "https://www.realtor.ca/real-estate/29933933/1178-salmers-drive-oshawa-taunton"
        },
        {
            id: 2,
            title: "Spacious Home for Lease",
            price: "$3,200 / Month",
            address: "104 Shepherd Drive, Barrie, ON",
            image: "images/104-shepherd-drive.jpg",
            beds: 4,
            baths: 3,
            link: "https://www.realtor.ca/real-estate/30176779/104-shepherd-drive-barrie-rural-barrie-southeast"
        },
        {
            id: 3,
            title: "Spacious Suburban Villa",
            price: "$2,100,000",
            address: "789 Pine Avenue, Mississauga",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            beds: 5,
            baths: 4
        }
    ];

    // Simulate network delay for AJAX loading
    setTimeout(() => {
        if (!propertyList) return;
        propertyList.innerHTML = ''; // clear loading text
        
        mockProperties.forEach(prop => {
            const card = document.createElement('div');
            card.className = 'property-card';
            
            let imageHtml = `<img src="${prop.image}" alt="${prop.title}" class="property-image">`;
            if (prop.link) {
                imageHtml = `<a href="${prop.link}" target="_blank" rel="noopener noreferrer">${imageHtml}</a>`;
            }
            
            card.innerHTML = `
                ${imageHtml}
                <div class="property-details">
                    <div class="property-price">${prop.price}</div>
                    <h3>${prop.title}</h3>
                    <p>${prop.address}</p>
                    <p><strong>${prop.beds} Beds | ${prop.baths} Baths</strong></p>
                </div>
            `;
            propertyList.appendChild(card);
        });
    }, 1000);
}
