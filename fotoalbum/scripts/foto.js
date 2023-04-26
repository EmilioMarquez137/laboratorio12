class Album {
    constructor() {
        this.modalView = document.querySelector('#modal-view');
        this.albumView = document.querySelector('#album-view');
        this.modalView.addEventListener('click', this.onModalClick.bind(this));
        for (let i = 0; i < PHOTO_LIST.length; i++) {
            const photoSrc = PHOTO_LIST[i];
            const image = this.createImage(photoSrc);
            image.addEventListener('click', this.onThumbnailClick.bind(this));
            this.albumView.appendChild(image);
        }
    }

    createImage(src) {
        const image = document.createElement('img');
        image.src = src;
        return image;
    }

    onThumbnailClick(event) {
        const image = this.createImage(event.currentTarget.src);
        document.body.classList.add('no-scroll');
        this.modalView.style.top = window.pageYOffset + 'px';
        this.modalView.appendChild(image);
        this.modalView.classList.remove('hidden');
    }

    onModalClick() {
        document.body.classList.remove('no-scroll');
        this.modalView.classList.add('hidden');
        this.modalView.innerHTML = '';
    }
}

const album = new Album();

class ModalView {
    constructor() {
        this.modalView = document.querySelector('#modal-view');
        this.modalImage = document.createElement('img');
        this.modalView.addEventListener('click', this.close.bind(this));
    }

    open(imageSrc) {
        this.modalImage.src = imageSrc;
        this.modalView.appendChild(this.modalImage);
        this.modalView.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    }

    close() {
        this.modalView.innerHTML = '';
        this.modalView.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }
}
