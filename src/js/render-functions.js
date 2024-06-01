import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const renderImages = async images => {
  if (images.length === 0) {
    return iziToast.error({
      message: `Sorry, there are no images matching your search. Please try again!`,
    });
  }

  let galleryHtml = '';
  const galleryList = document.querySelector('.gallery-list');
  console.log('galleryList', galleryList);
  if (galleryList != null) {
    galleryHtml = galleryList.innerHTML;
  }
  galleryHtml += await images
    .map(img => {
      return `
        <li class="gallery-item" id=${img.id}>
          <a class="gallery-link" href="${img.largeImageURL}"><img src="${img.webformatURL}" alt="${img.tags}"></a>
            <ul class="item-info">
              <li><h3>Likes</h3><p>${img.likes}</p></li>
              <li><h3>Views</h3><p>${img.views}</p></li> 
              <li><h3>Comments</h3><p>${img.comments}</p></li> 
              <li><h3>Downloads</h3><p>${img.downloads}</p></li> 
            </ul> 
        </li>
    `;
    })
    .join('');
  gallery.innerHTML = `<ul class="gallery gallery-list">${galleryHtml}</ul>`;

  var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 300,
  });
  lightbox.refresh();
};

export default renderImages;
