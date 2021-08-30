window.onload=()=>{
	setTimeout(()=>{
		alert('Click on any image to start Lighbox!!!');
	},3000)
}
const images=document.querySelectorAll('.image-grid img');
const lightbox=document.querySelector('.lightbox');
const lightboxClose=document.querySelector('.lightbox-close');
const currentImage=document.querySelector('.img');
const totalImages=document.querySelector('.total');
const lightboxImage=document.querySelector('.lightbox-image img');
const lightboxItems=document.querySelector('.lightbox-items');
let imageIndex;

images.forEach((img,index)=>{
	img.addEventListener('click',()=>{
		this.imageindex=index;
		imageSource=img.getAttribute('src');
		lightboxDisplay(index+1,imageSource);
	});
});
lightboxDisplay=(imageIndex,imageSource)=>{
	lightbox.classList.add('active');
	lightboxImage.classList.add('hide');
	document.body.style.overflowY = 'hidden'
	setTimeout(()=>{
		lightboxImage.classList.remove('hide');
		lightboxImage.setAttribute("src",imageSource)
	},1000)
	currentImage.innerText=imageIndex;
	totalImages.innerText=images.length;
};
lightboxClose.addEventListener('click',()=>{
	lightbox.classList.remove('active');
	document.body.style.overflowY = 'visible'
});
function prev(){
	if(this.imageindex===0){
		this.imageindex=images.length-1;
	}else{
		this.imageindex--;
	}
	let i=this.imageindex;
	imageSource=images[i].getAttribute('src');
	lightboxDisplay(i+1,imageSource)
}
function next(){
	if(this.imageindex===images.length-1){
		this.imageindex=0;
	}else{
		this.imageindex++;
	}
	let i=this.imageindex;
	imageSource=images[i].getAttribute('src');
	lightboxDisplay(i+1,imageSource)
}
function lazyload(){
    const option = {
        root : null,
        threshold : '0.25',
        rootMargin : '0px'
    };

    function preloadImage(img){
        const source=img.getAttribute("data-src");
        if(!source){
            return ;
        }
        else{
        img.src=source;
        }
    }
    
    const callback=new IntersectionObserver( (entries, callback) => {
        entries.forEach( entry=>{
            if(entry.isIntersecting){
                preloadImage(entry.target);
                callback.unobserve(entry.target);
            }
        } )
    },option);

    const imgs = document.querySelectorAll('[data-src]');
    imgs.forEach(img => {
        callback.observe(img);
    });
}
lazyload() 