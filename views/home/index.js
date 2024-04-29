const list = document.querySelector('#shirts-container');
const addBtn = document.querySelector('.add-btn');


const alertBuy = async () => {
    Swal.fire({
        title: "Epaaa!!",
        icon: "warning",
        html: `
            <p>Para comprar, primero registra o inicia sesión.</p>
            <p>¿Qué deseas hacer?</p>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Login`,
        cancelButtonText: `Signup`,
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirigir a la página de login
            window.location.href = '/login/';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Redirigir a la página de signup
            window.location.href = '/signup/';
        }
    });
};










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
    newShirt.querySelector('.add-btn').addEventListener('click', e=>{
        alertBuy()
    })
    list.appendChild(newShirt);

    
            
        });
    } catch (error) {
        console.log(error);
    }
};

renderShirts();