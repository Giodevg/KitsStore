const list = document.querySelector('#shirts-container');
const sectionCart = document.querySelector('#section-cart');
const navBtnStore = document.querySelector('#nav-btn-store');
const addBtn = document.querySelectorAll(".add-btn");
const table = document.querySelector("#table-body");
const btnClear = document.querySelector("#table-clear");
const buyButton = document.querySelector('#buy-button');
const totalPriceCart = document.querySelector('#total-price-cart');
const totalQuantityCart = document.querySelector('#total-quantity-cart');
const listPurchases = document.querySelector('#listPurchases');

let cartItems = []; // Array para mantener los productos en el carrito

const updateCartTotal = () => {
    let total = 0;
    let quantity = 0;

    cartItems.forEach(item => {
        total += item.shirtPrice * item.quantity;
        quantity += item.quantity;
    });

    totalPriceCart.textContent = total.toFixed(2);
    totalQuantityCart.textContent = quantity;
};

const cleanCartContent = () => {
  table.innerHTML= '';
};

const buyProducts = async () => {
  try {
      if (cartItems.length === 0) {
          Swal.fire("El carrito está vacío. Agrega productos antes de comprar.");
          return;
      }

      // Crear un array de productos en el formato esperado por el esquema
      const purchaseShirts = cartItems.map(item => ({
        shirt: item.shirtId,
        quantity: item.quantity
    }));

    console.log(purchaseShirts);

      // Realizar la compra con los productos en el carrito
      const {data} = await axios.post('/api/sales', {
          shirts: purchaseShirts,
          totalPrice: parseFloat(totalPriceCart.textContent)
      });
      console.log(data);
      console.log(purchaseShirts);

      // Limpiar el carrito después de realizar la compra
      cartItems = [];
      cleanCartContent();
      updateCartTotal();

      Swal.fire("Compra Realizada!!!");
  } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Error al realizar la compra');
  }
};

const addProductToCart = (btn, shirtId, shirtName, shirtPrice) => {
    btn.addEventListener('click', () => {
        // Verificar si el producto ya está en el carrito
        const existingItem = cartItems.find(item => item.shirtId === shirtId);

        if (existingItem) {
            // Incrementar la cantidad si el producto ya está en el carrito
            existingItem.quantity++;
        } else {
            // Agregar el producto al carrito si no está en él
            cartItems.push({
                shirtId,
                shirtName,
                shirtPrice,
                quantity: 1
            });
        }
        Toastify({
            text: "PRODUCTO AGREGADO",
            duration: 2000,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #3b82f6, #172554)",
              borderRadius: "0.5rem",
              font: ".75rem"
            },
            offset: {
                x: '4rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: '3rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
            onClick: function(){} // Callback after click
          }).showToast();

        // Actualizar la tabla del carrito
        renderCartItems();
        updateCartTotal();
    });
};

const renderCartItems = () => {
  table.innerHTML = '';

  cartItems.forEach(item => {
      const newCartItem = document.createElement('tr');
      newCartItem.innerHTML = `
          <td class="h-24 font-bold px-0 py-4 border-b-[rgb(107,106,106)] border-b border-solid">${item.shirtName}</td>
          <td class="h-24 font-bold px-0 py-4 border-b-[rgb(107,106,106)] border-b border-solid">${item.shirtPrice.toFixed(2)}$</td>
          <td class="h-24 font-bold px-0 py-4 border-b-[rgb(107,106,106)] border-b border-solid">${item.quantity}</td>
          <td class="h-24 font-bold px-0 py-4 border-b-[rgb(107,106,106)] border-b border-solid flex justify-center items-center ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 remove-btn bg-white cursor-pointer transition-all duration-[0.3s] ease-[ease-in] text-red-600 p-2 rounded-[50%] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in] hover:bg-red-600 hover:text-white">
          <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" /></svg>
          </td>
      `;

      table.appendChild(newCartItem);

      // Agregar event listener para el botón de eliminar
      newCartItem.querySelector('.remove-btn').addEventListener('click', () => {
          cartItems.splice(cartItems.indexOf(item), 1); // Eliminar el producto del carrito
          renderCartItems(); // Volver a renderizar la tabla del carrito
          updateCartTotal(); // Actualizar el total del carrito
          Toastify({
              text: "PRODUCTOS ELIMINADOS",
              duration: 2000,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "linear-gradient(to right, #3b82f6, #172554)",
                borderRadius: "0.5rem",
                font: ".75rem"
              },
              offset: {
                  x: '4rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                  y: '3rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
                },
              onClick: function(){} // Callback after click
            }).showToast();
      });
  });
};

// Modifica el EventListener del botón de compra en el carrito
buyButton.addEventListener('click', () => {
  buyProducts();
});

btnClear.addEventListener('click', e =>{
  Swal.fire({
    title: "¿Estas Seguro?",
    icon: "question",
    html: `
      Todos tus productos en el carrito seran eliminados
    `,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `SI`,
    cancelButtonText: `NO`,
  }).then((result) => {
    if (result.isConfirmed) {
      cartItems = [];
  cleanCartContent();
  updateCartTotal(); 
    }
  });

});
const renderShirts = async () => {
    try {
        const { data } = await axios.get('/api/shirts', {
            withCredentials: true,
        });

        data.forEach(shirt => {
            const newShirt = document.createElement('div')
            const Imagen = shirt.shirtImage.split('\\').pop();
    newShirt.id = shirt.id;
    newShirt.className = `max-w-[250px] border transition-[0.3s] m-auto p-5 rounded-[10px] border-solid border-[#666] hover:shadow-[0_0_10px_#666]`;
    newShirt.innerHTML = `
    
    <span class="block font-[bold] text-center uppercase">${shirt.shirtName}</span>
    <img src="/images/${Imagen}" alt="" class="w-full">
    <span class="block text-center font-[bold] text-[22px];">${shirt.shirtPrice}$</span>
    <span class="block text-center font-[bold] text-[22px];">${shirt.shirtSize}</span>
    <button class=" add-btn block bg-blue-500 hover:bg-blue-800 text-white cursor-pointer mx-auto my-2.5 px-[15px] py-[5px] rounded-[5px] border-[none];
    ">Agregar al Carrito</button>
        
    `;
    list.appendChild(newShirt);
    addProductToCart(newShirt.querySelector('.add-btn'), shirt.id, shirt.shirtName, shirt.shirtPrice);
            
        });
    } catch (error) {
        console.log(error);
    }
};


const toggleCartSection = () => {
    navBtnStore.addEventListener('click', () => {
        sectionCart.classList.toggle('hidden');
        sectionCart.classList.toggle('flex');
    });
};

const navBar = document.querySelector('#nav-bar')
const navBtn = document.querySelector('#nav-btn')

const toggleMobileMenu = () => {
  navBtn.addEventListener('click', e =>{

    const menuMobile = navBar.children[0].children[1].children[3];
    
    if (!navBtn.classList.contains('active')) {
      navBtn.classList.add('active');
      navBtn.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />`; 
      menuMobile.classList.remove('hidden');
      menuMobile.classList.add('flex');
    } else {
      navBtn.classList.remove('active');
      navBtn.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />`;
      menuMobile.classList.add('hidden');
      menuMobile.classList.remove('flex');
    } 
  })};

  const closeBtnDesktop = navBar.children[0].children[1].children[2].children[0];
  const closeBtnMobile = navBar.children[0].children[1].children[3].children[0];
  
  closeBtnDesktop.addEventListener('click',async e =>{
    console.log(e.target);
   
  try {
    await axios.get('/api/logout');
    console.log('sesion cerrada');
    window.location.replace('/login');
    
  } catch (error) {
    console.log('error');
    
  }
  });
  
  
  closeBtnMobile.addEventListener('click',async e =>{
    console.log(e.target);
    
   
    try {
      await axios.get('/api/logout');
      window.location.replace('/login');
      
    } catch (error) {
      console.log('error');
      
    }
    });
  

renderShirts();
toggleMobileMenu();
toggleCartSection();

