const form = document.querySelector('#shirts-creator');
const nameShirt = document.querySelector('#shirt-name');
const image = document.querySelector('#shirt-image');
const price = document.querySelector('#shirt-price');
const size = document.querySelector('#shirt-size');
const list = document.querySelector('#shirts-container');
const editForm = document.querySelector('#shirts-form-edit');
const editName = document.querySelector('#shirt-name-edit');
const editImage = document.querySelector('#shirt-image-edit');
const editSize = document.querySelector('#shirt-size-edit');
const editPrice = document.querySelector('#shirt-price-edit');
const creator = document.querySelector('#shirts-creator');
const editor = document.querySelector('#shirts-editor');




form.addEventListener('submit', async e =>{
e.preventDefault();
try {
    const {data} = await axios.post('/api/shirts',{
        shirtName: nameShirt.value,
        shirtImage: image.value,
        shirtSize: size.value,
        shirtPrice: price.value
    })
    
    
    const newShirt = document.createElement('div')
    newShirt.id = data.id;
    newShirt.className = `max-w-[250px] border transition-[0.3s] m-auto p-5 rounded-[10px] border-solid border-[#666] hover:shadow-[0_0_10px_#666]`;
    newShirt.innerHTML = `
    <div class="max-w-[250px] border transition-[0.3s] m-auto p-5 rounded-[10px] border-solid border-[#666] hover:shadow-[0_0_10px_#666];">
    <span class="block font-[bold] text-center uppercase">${data.shirtName}</span>
    <img src="${data.shirtImage}" alt="" class="w-ful">
    <span class="block text-center font-[bold] text-[22px];">${data.shirtPrice}$</span>
    <span class="block text-center font-[bold] text-[22px];">${data.shirtSize}</span>
    <div class="flex flex-row">
                    <button id="edit-btn" class="block bg-blue-400 text-white cursor-pointer mx-auto my-2.5 px-[15px] py-[5px] rounded-[5px] border-[none];
                    ">Editar</button>
                    <button  id="delete-btn" class="block bg-red-600 hover:bg-red-900 text-white cursor-pointer mx-auto my-2.5 px-[15px] py-[5px] rounded-[5px] border-[none];
                    ">Eliminar</button>
                </div>
    `;
    list.appendChild(newShirt);
    
} catch (error) {
    console.log(error); 
}
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
    <div class="flex flex-row">
    <button id="edit-btn" class="block bg-blue-400 text-white cursor-pointer mx-auto my-2.5 px-[15px] py-[5px] rounded-[5px] border-[none];
    ">Editar</button>
    <button  id="delete-btn" class="block bg-red-600 hover:bg-red-900 text-white cursor-pointer mx-auto my-2.5 px-[15px] py-[5px] rounded-[5px] border-[none];
    ">Eliminar</button>
    </div>
        
    `;
    list.appendChild(newShirt);
            
        });
    } catch (error) {
        console.log(error);
    }
};

renderShirts();

list.addEventListener('click', async e =>{

if (e.target.closest('#delete-btn')) {

const div = e.target.closest('#delete-btn').parentElement.parentElement
console.log(div.id);
await axios.delete(`/api/shirts/${div.id}`);
div.remove();
console.log('si');

}

if (e.target.closest('#edit-btn')) {

creator.classList.add('hidden');
creator.classList.remove('flex');
const div = e.target.closest('#edit-btn').parentElement.parentElement
const shirtId = div.id
const {data} = await axios.get(`/api/shirts/${shirtId}`)
console.log(data.shirt.shirtName);
editName.value = data.shirt.shirtName;
editPrice.value = data.shirt.shirtPrice;
editor.classList.remove('hidden');
editor.classList.add('flex');


editForm.addEventListener('submit', async e =>{
e.preventDefault();

const {data} = await axios.patch(`/api/shirts/${shirtId}`, {
shirtName: editName.value,
shirtImage: editImage.value,
shirtSize: editSize.value,
shirtPrice: editPrice.value

})

div.innerHTML = `
<div class="max-w-[250px] border transition-[0.3s] m-auto p-5 rounded-[10px] border-solid border-[#666] hover:shadow-[0_0_10px_#666];">
<span class="block font-[bold] text-center uppercase">${data.shirtName}</span>
<img src="${data.shirtImage}" alt="" class="w-ful">
<span class="block text-center font-[bold] text-[22px];">${data.shirtPrice}$</span>
<span class="block text-center font-[bold] text-[22px];">${data.shirtSize}</span>
<div class="flex flex-row">
<button id="edit-btn" class="block bg-blue-400 text-white cursor-pointer mx-auto my-2.5 px-[15px] py-[5px] rounded-[5px] border-[none];
">Editar</button>
<button  id="delete-btn" class="block bg-red-600 hover:bg-red-900 text-white cursor-pointer mx-auto my-2.5 px-[15px] py-[5px] rounded-[5px] border-[none];
">Eliminar</button>
</div>
`;
editor.classList.add('hidden');
editor.classList.remove('flex');
creator.classList.remove('hidden');
creator.classList.add('flex');


})
}})



