const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const tabs = $$('.tab-item')


const tabsAcitve = $('.tab-item.active')
const line = $('.music--artist-nav .line')

line.style.left = tabsAcitve.offsetLeft + 'px';
line.style.width = tabsAcitve.offsetWidth + 'px';
tabs.forEach((tab , index) => {

    tab.onclick = function(){
        $('.tab-item.active').classList.remove('active')
        
        line.style.left = this.offsetLeft + 'px';
        line.style.width = this.offsetWidth + 'px';
        
        this.classList.add('active')
    
    }
   

});


// ================xu li bai hat

// ==========================
// Toast function
function toast({
    title='',
    message='',
    type = 'info',
    duration=3000
}){
    const main = document.getElementById('toast')

    if(main){
        const toast = document.createElement('div');
        // auto remove toast
        const autoRemoveId = setTimeout(function(){
            main.removeChild(toast)
        },duration +1000)

        // click remove toast

        toast.onclick = function(e){
            if(e.target.closest('.toast_close')){
                main.removeChild(toast)
                clearTimeout(autoRemoveId)
                }
        }
        
        const icons = {
            success : 'fas fa-exclamation-circle',
        }
        const icon = icons[type]
        const delay = (duration/100).toFixed(2)
        toast.classList.add('toast',`toast--${type}`);
        toast.style.animation = `slideInleft ease .3s , fadeOut ease 1s ${delay}s forwards`
        toast.innerHTML = `
                <div class=" toast_icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast_body">
                <h3 class="toast_title">${title}</h3>
                <p class="toast_msg ">${message}</p>
            </div>
            <div class="toast_close">
                <i class="fas fa-times"></i>
            </div>

        `;

        main.appendChild(toast)

    }
    
}

function showSuccessToast(){
    toast({
    title :'Tính năng đang phát triển',
    message : 'Vui lòng đợi.......',
    type:'success',
    duration:5000
})
}