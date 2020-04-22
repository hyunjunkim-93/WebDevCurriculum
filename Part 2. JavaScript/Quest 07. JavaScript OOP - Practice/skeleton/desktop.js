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

      new DragAndDropEvent(iconElement, this.#desktopElement);

      if (icon instanceof Folder) {
        new windowOpenBridge(
          iconElement,
          this.#desktopElement,
          icon.getElInfo(),
          'dblclick'
        );
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

  getElInfo() {
    return { name: this.#name, imgSrc: this.#imgSrc };
  }
}

class Window {
  /* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  #element;
  #folderInfo;
  #closeBtn;

  constructor(folderInfo, desktopElement) {
    this.#folderInfo = folderInfo;
    this.createBase();
    new DragAndDropEvent(this.#element, desktopElement);
    this.addCloseEvent();
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

    this.#element = wrapper;
    this.#closeBtn = closeBtn;
  }

  open(desktopElement) {
    desktopElement.append(this.#element);
  }

  addCloseEvent() {
    this.#closeBtn.addEventListener('click', () => {
      this.#element.remove();
    });
  }
}

class DragAndDropEvent {
  #draggableEl;
  #standardEl;
  #shiftX;
  #shiftY;
  #leftCoordinate;
  #topCoordinate;

  constructor(draggableEl, standardEl) {
    this.#draggableEl = draggableEl;
    this.#standardEl = standardEl;
    this.setStyle();
    this.initHandler();
    this.addEvents();
  }

  initHandler() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  addEvents() {
    this.#draggableEl.addEventListener('mousedown', this.onMouseDown);
    this.#draggableEl.addEventListener('dragstart', (e) => e.preventDefault());
    this.#draggableEl.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown(e) {
    this.setShift(e.clientX, e.clientY);
    this.moveAt(e.pageX, e.pageY);
    this.#standardEl.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove(e) {
    this.moveAt(e.pageX, e.pageY);
  }

  onMouseUp() {
    this.#standardEl.removeEventListener('mousemove', this.onMouseMove);
  }

  setShift(clientX, clientY) {
    const rect = this.#draggableEl.getBoundingClientRect();
    this.#shiftX = clientX - rect.left;
    this.#shiftY = clientY - rect.top;
  }

  moveAt(pageX, pageY) {
    this.#leftCoordinate = pageX - this.#shiftX;
    this.#topCoordinate = pageY - this.#shiftY;
    this.#draggableEl.style.left = `${this.#leftCoordinate}px`;
    this.#draggableEl.style.top = `${this.#topCoordinate}px`;
  }

  setStyle() {
    this.#draggableEl.classList.add('movable');
  }
}

class windowOpenBridge {
  #targetEl;
  #targetElInfo;
  #desktopElement;
  #clickType;

  constructor(targetEl, desktopElement, targetElInfo, clickType) {
    this.#targetEl = targetEl;
    this.#targetElInfo = targetElInfo;
    this.#desktopElement = desktopElement;
    this.#clickType = clickType;
    this.bridge();
  }

  bridge() {
    this.#targetEl.addEventListener(this.#clickType, () => {
      const window = new Window(this.#targetElInfo, this.#desktopElement);
      window.open(this.#desktopElement);
    });
  }
}
