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
            
            // Mock network request
            setTimeout(() => {
                formMessage.innerHTML = `Thank you, ${name}! Your message has been sent successfully.`;
                formMessage.style.color = 'green';
                contactForm.reset();
            }, 1500);
        });
    }
});

function loadProperties() {
    const propertyList = document.getElementById('property-list');
    
    // Mock data for properties
    const mockProperties = [
        {
            id: 1,
            title: "Modern Family Home",
            price: "$1,250,000",
            address: "123 Maple Street, Mississauga",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            beds: 4,
            baths: 3
        },
        {
            id: 2,
            title: "Luxury Condo",
            price: "$850,000",
            address: "456 City Center Dr, Mississauga",
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            beds: 2,
            baths: 2
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
            card.innerHTML = `
                <img src="${prop.image}" alt="${prop.title}" class="property-image">
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
