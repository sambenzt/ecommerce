const items = document.getElementById('items')

if(items){
    items.addEventListener('click', (event) => {
        if(event.target.tagName == 'BUTTON') {
            const id = event.target.getAttribute('data')
            addProduct(id)
        }
    })
    
    
    function addProduct(id) {
        const url = 'https://ecommerce-v172.onrender.com/add-product';
    
        const data = {
            id: id
        }
    
        const options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data) 
        };
    
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta: ' + response.statusText);
                }
                return response.json(); // Convierte la respuesta a un objeto JSON
            })
            .then(data => {
                const span = document.getElementById('cart-count');
                span.innerText = data.total
                console.log('Respuesta del servidor:', data);
            })
            .catch(error => {
                console.error('Error en la petición:', error);
            });
    
    }
}

const paymentForm = document.getElementById('payment-form')

if(paymentForm) {
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const url = 'https://ecommerce-v172.onrender.com/payment';
        const data = {}       
    
        const options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data) 
        };
    
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta: ' + response.statusText);
                }
                return response.json(); // Convierte la respuesta a un objeto JSON
            })
            .then(data => {
                const span = document.getElementById('payment-success');
                span.style.display = 'block';
                span.innerText = data.message
                console.log('Respuesta del servidor:', data);
            })
            .catch(error => {
                console.error('Error en la petición:', error);
            });
            
    })
}