const downloadButton = document.querySelectorAll('.download-cv');
const socialsButton = document.querySelector('.filled');
const touchButton = document.getElementById('touch');
const inTouch = document.getElementById('touch').innerText;
const inTouchWeight = touchButton.style.fontWeight;

downloadButton.forEach(download => {
    download.addEventListener('click', () => {
        const fileUrl = './cv.pdf';
        const fileName = 'cv.pdf';
      
        fetch(fileUrl)
          .then(response => response.blob())
          .then(blob => {
            // Create a temporary anchor element
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
      
            // Programmatically trigger the download
            a.click();
      
            // Clean up
            URL.revokeObjectURL(a.href);
            a.remove();
          });
      });
});



socialsButton.addEventListener('click', () => {
  let socialMedia = document.querySelector('.social__media');
  if (socialMedia.classList.contains('hide')) {
    socialMedia.style.zIndex = '-1';
    socialMedia.classList.remove ('hide');
    socialMedia.style.animation = 'appear 1s linear';
    setTimeout(() => {
      socialMedia.style.zIndex = '1';
    }, 990);
  } else {
    socialMedia.style.zIndex = '-1';
    socialMedia.style.animation = 'dissappear 1s linear';
    setTimeout(() => {
      socialMedia.classList.add ('hide');
    }, 990);
  }
});



touchButton.addEventListener('mouseover', () => {
  touchButton.innerText = 'Whatsapp me';
  touchButton.style.fontWeight = '800';
});

touchButton.addEventListener('mouseout', () => {
  touchButton.innerText = inTouch;
  touchButton.style.fontWeight = inTouchWeight;
});
