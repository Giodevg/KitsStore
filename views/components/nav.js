const navBar = document.querySelector('#nav-bar')



const  createNavHome = () => {
navBar.innerHTML = `
<div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
<a href="/">
<p class="font-bold text-xl text-white">KitsStore</p>
</a>
<!-- Movil -->
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" viewBox="0 0 24 24" 
  stroke-width="1.5" stroke="currentColor" 
  class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-blue-700 rounded-lg"
>
  <path stroke-linecap="round"
   stroke-linejoin="round"
   d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>

<!-- escritorio -->
  <div class="hidden md:flex flex-row gap-4 ">
    <a href="/login/" class="transition ease-in-out text-white hover:bg-blue-700 py-2 px-4 rounded-lg font-bold">Login</a>
    <a href="/signup/"class="transition ease-in-out bg-blue-500 text-white hover:bg-indigo-900 py-2 px-4 rounded-lg font-bold">Registro</a>
   
  </div>
<!-- menu-movil -->
  <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
    <a href="/login/" class="transition ease-in-out text-white hover:bg-blue-700 py-2 px-4 rounded-lg font-bold">Login</a>
    <a href="/signup/"class="transition ease-in-out bg-blue-700 text-white hover:bg-blue-9000 py-2 px-4 rounded-lg font-bold">Registro</a>
</div>

</div>
`;
};

const  createNavSignup = () => {
  navBar.innerHTML = `
  <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
  <a href="/">
<p class="font-bold text-xl text-white" >KitsStore</p>
</a>
  <!-- Movil -->
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" viewBox="0 0 24 24" 
    stroke-width="1.5" stroke="currentColor" 
    class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-blue-600 rounded-lg"
  >
    <path stroke-linecap="round"
     stroke-linejoin="round"
     d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  
  <!-- escritorio -->
    <div class="hidden md:flex flex-row gap-4 ">
      <a href="/login/" class="transition ease-in-out text-white hover:bg-blue-600 py-2 px-4 rounded-lg font-bold">Login</a>
     
    </div>
  <!-- menu-movil -->
    <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
      <a href="/login/" class="transition ease-in-out text-white hover:bg-blue-600 py-2 px-4 rounded-lg font-bold">Login</a>
     
  </div>
  
  </div>
  `;
  };

  const  createNavLogin = () => {
    navBar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
    <a href="/">
<p class="font-bold text-xl text-white" >KitsStore</p>
</a>
    <!-- Movil -->
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" viewBox="0 0 24 24" 
      stroke-width="1.5" stroke="currentColor" 
      class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-blue-600 rounded-lg"
    >
      <path stroke-linecap="round"
       stroke-linejoin="round"
       d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    
    <!-- escritorio -->
      <div class="hidden md:flex flex-row gap-4 ">
        <a href="/signup/" class="transition ease-in-out text-white hover:bg-blue-600 py-2 px-4 rounded-lg font-bold">Registro</a>
       
      </div>
    <!-- menu-movil -->
      <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
        <a href="/signup/" class="transition ease-in-out text-white hover:bg-blue-600 py-2 px-4 rounded-lg font-bold">Registro</a>
       
    </div>
    
    </div>
    `;
    };

  const  createNavAdmin = () => {
    navBar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
    <a href="/">
  <p class="font-bold text-xl text-white" >KitsStore</p>
  </a>
    <!-- Movil -->
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" viewBox="0 0 24 24" 
      stroke-width="1.5" stroke="currentColor" 
      class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg- rounded-lg"
    >
      <path stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    
      
      <!-- escritorio -->
        <div class="hidden md:flex flex-row gap-4 ">
          <button id="close-btn" class="transition ease-in-out text-white hover:bg-bl py-2 px-4 rounded-lg font-bold">Cerrar Sesion</button>
        
        </div>
      <!-- menu-movil -->
        <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
        <button id="close-btn" class="transition ease-in-out text-white hover:bg-blue-600 py-2 px-4 rounded-lg font-bold">Cerrar Sesion</button>
        
      </div>
      </div>
      `;
    };  


if (window.location.pathname === '/') {
    createNavHome();    
} else if (window.location.pathname === '/signup/'){
createNavSignup();
} else if (window.location.pathname === '/login/'){
createNavLogin();

} else if (window.location.pathname === '/admin/'){
  createNavAdmin();
}

const navBtn = navBar.children[0].children[1];

navBtn.addEventListener('click', e =>{
    const menuMobile = navBar.children[0].children[3];
if (!navBtn.classList.contains('active')) {
    navBtn.classList.add('active');
    navBtn.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />`; 
    
    menuMobile.classList.remove('hidden');
    menuMobile.classList.add('flex');
}else{
    navBtn.classList.remove('active');
    navBtn.innerHTML = `<path stroke-linecap="round"
    stroke-linejoin="round"
    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
   </svg>`;
   menuMobile.classList.add('hidden');
    menuMobile.classList.remove('flex');

}

    
})

const closeBtnDesktop = navBar.children[0].children[2].children[0];
const closeBtnMobile = navBar.children[0].children[3].children[0];
console.log(closeBtnDesktop);

closeBtnDesktop.addEventListener('click',async e =>{
 
  try {
    await axios.get('/api/logout');
    console.log('sesion cerrada');
    window.location.replace('/login');
    
  } catch (error) {
    console.log('error');
    
  }
});


closeBtnMobile.addEventListener('click',async e =>{
 
  try {
    await axios.get('/api/logout');
    console.log('sesion cerrada');
    window.location.replace('/login');
    
  } catch (error) {
    console.log('error');
    
  }
  });


