class Desktop {
  /* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  #icons;
  #desktopElement;

  constructor(icons, desktopElement) {
    this.#icons = [...Object.values(icons)];
    this.#desktopElement = desktopElement;
  }

  load() {
    this.#icons.map((icon) => {
      const iconElement = icon.getElement();
      const wrapper = this.makeGrid();
      wrapper.appendChild(iconElement);

      icon.moveEvent(this.#desktopElement);
      // new DragAndDropEvent(iconElement, this.#desktopElement);

      if (icon instanceof Folder) {
        icon.dblClickEvent(this.#desktopElement);
      }
    });
  }

  makeGrid() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('icon-wrapper');
    this.#desktopElement.appendChild(wrapper);
    return wrapper;
  }
}

class Icon {
  /* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  #name;
  #element;
  #width;
  #height;
  #imgSrc;

  constructor(name, imgSrc, width, height) {
    this.#name = name || 'Untitled';
    this.#imgSrc = imgSrc || 'gg-games';
    this.#width = width || '48';
    this.#height = height || '48';
    this.#element = this.initElements();
  }

  createBase() {
    const el = document.createElement('div');
    const icon = document.createElement('i');
    const title = document.createElement('h3');

    title.innerText = this.#name;
    el.classList.add('desktop-icon');
    el.appendChild(icon);
    el.appendChild(title);

    return { el, icon };
  }

  initElements() {
    const { el, icon } = this.createBase();
    icon.classList.add(this.#imgSrc);
    return el;
  }

  getElement() {
    return this.#element;
  }

  moveEvent(desktopElement) {
    dragAndDropEvent(this.#element, desktopElement);
  }
}

class Folder {
  /* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  #name;
  #element;
  #width;
  #height;
  #imgSrc;

  constructor(name, imgSrc, width, height) {
    this.#name = name || 'Untitled';
    this.#imgSrc = imgSrc || 'gg-folder';
    this.#width = width || '48';
    this.#height = height || '48';
    this.#element = this.initElements();
  }

  createBase() {
    const el = document.createElement('div');
    const icon = document.createElement('i');
    const title = document.createElement('h3');

    title.innerText = this.#name;
    el.classList.add('desktop-icon');
    el.appendChild(icon);
    el.appendChild(title);

    return { el, icon };
  }

  initElements() {
    const { el, icon } = this.createBase();
    icon.classList.add(this.#imgSrc);
    return el;
  }

  getElement() {
    return this.#element;
  }

  moveEvent(desktopElement) {
    dragAndDropEvent(this.#element, desktopElement);
  }

  dblClickEvent(desktopElement) {
    this.#element.addEventListener('dblclick', () => {
      const window = new Window({ name: this.#name, imgSrc: this.#imgSrc });
      window.open(desktopElement);
    });
  }
}

class Window {
  /* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  #element;
  #folderInfo;

  constructor(folderInfo) {
    this.#folderInfo = folderInfo;
    this.#element = this.createBase();
  }

  createBase() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('window');

    const header = document.createElement('header');
    header.classList.add('window-header');

    const folderWrapper = document.createElement('div');
    const folderIcon = document.createElement('i');
    const folderTitle = document.createElement('h3');
    folderWrapper.classList.add('window-folder-wrapper');
    folderIcon.classList.add(this.#folderInfo.imgSrc);
    folderTitle.innerText = this.#folderInfo.title;
    folderWrapper.appendChild(folderIcon);
    folderWrapper.appendChild(folderTitle);

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('window-btn--close');

    wrapper.appendChild(header);
    header.appendChild(closeBtn);
    header.appendChild(folderWrapper);
    return wrapper;
  }

  open(desktopElement) {
    desktopElement.append(this.#element);
    this.onMoveEvent(desktopElement);
    this.onCloseEvent();
  }

  onMoveEvent(desktopElement) {
    dragAndDropEvent(this.#element, desktopElement);
  }
  onCloseEvent() {
    const closeBtn = this.#element.querySelector('.window-btn--close');
    closeBtn.addEventListener('click', () => {
      this.#element.remove();
    });
  }
}

function dragAndDropEvent(currentElement, bgElement) {
  currentElement.onmousedown = (event) => {
    let shiftX = event.clientX - currentElement.getBoundingClientRect().left;
    let shiftY = event.clientY - currentElement.getBoundingClientRect().top;

    currentElement.classList.add('movable');

    const moveAt = (pageX, pageY) => {
      const left = pageX - shiftX;
      const top = pageY - shiftY;

      if (left < 10 || top < 10) {
        currentElement.style.left = '25px';
        currentElement.style.top = '25px';
        bgElement.removeEventListener('mousemove', onMouseMove);
      } else {
        currentElement.style.left = `${left}px`;
        currentElement.style.top = `${top}px`;
      }
    };

    const onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);
    };

    moveAt(event.pageX, event.pageY);

    bgElement.addEventListener('mousemove', onMouseMove);

    currentElement.onmouseup = () => {
      bgElement.removeEventListener('mousemove', onMouseMove);
      currentElement.onmouseup = null;
    };
  };

  currentElement.ondragStart = () => {
    return false;
  };
}
