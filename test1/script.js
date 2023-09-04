const showImage = document.getElementById('showImages');

async function getImages () {
    try {
        const response = await fetch('https://picsum.photos/v2/list');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

async function displayImage() {
    const images = await getImages();
    console.log(images)
    images.forEach(img => {
        const imgItem = document.createElement('img');
        imgItem.src = img.download_url;
        console.log(img)
        showImage.appendChild(imgItem);
      });
  }

displayImage()