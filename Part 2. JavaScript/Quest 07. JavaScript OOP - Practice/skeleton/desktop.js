class Desktop {
  /* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  #icons;
  #desktopElement;

  constructor(icons, desktopElement) {
    this.#icons = [...Object.values(icons)];
    this.#desktopElement = desktopElement;
  }

  render() {
    this.#icons.map((icon) => {
      const iconElement = icon.getElement();
      this.#desktopElement.appendChild(iconElement);
    });
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
    this.#element = this.createBase();
    this.addEvents();
  }

  createBase() {
    return CreateMethods.createFolderBase(this.#imgSrc, this.#name);
  }

  getElement() {
    return this.#element;
  }

  addEvents() {
    new DragAndDropEvent(this.#element.children[0]);
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
    this.#element = this.createBase();
    this.addEvents();
  }

  createBase() {
    return CreateMethods.createFolderBase(this.#imgSrc, this.#name);
  }

  getElement() {
    return this.#element;
  }

  getElInfo() {
    return { name: this.#name, imgSrc: this.#imgSrc };
  }

  addEvents() {
    new DragAndDropEvent(this.#element.children[0]);
    this.#element.addEventListener('dblclick', () => {
      new WindowOpenBridge(this.#element, this.getElInfo());
    })
  }
}

class Window {
  /* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  #element;
  #folderInfo;
  #closeBtn;

  constructor(folderEl, folderInfo) {
    this.#folderInfo = folderInfo;
    this.createBase();
    this.addEvents();
    this.open(folderEl);
  }

  createBase() {
    const templateWindow = document.querySelector('#template-window-wrapper').content.cloneNode(true);
    const folderWrapper = templateWindow.querySelector('.window-folder-wrapper').children;
    folderWrapper[0].classList.add(this.#folderInfo.imgSrc);
    folderWrapper[1].innerText = this.#folderInfo.title;

    this.#element = templateWindow.querySelector('.window');
    this.#closeBtn = templateWindow.querySelector('.window-btn--close');
  }

  open(folderEl) {
    folderEl.append(this.#element);
  }

  addEvents() {
    this.#closeBtn.addEventListener('click', () => {
      this.#element.remove();
    });
    new DragAndDropEvent(this.#element);
  }
}

class DragAndDropEvent {
  #draggableEl;
  #shiftX;
  #shiftY;
  #leftCoordinate;
  #topCoordinate;

  constructor(draggableEl) {
    this.#draggableEl = draggableEl;
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
    document.body.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove(e) {
    this.moveAt(e.pageX, e.pageY);
  }

  onMouseUp() {
    document.body.removeEventListener('mousemove', this.onMouseMove);
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

class WindowOpenBridge {
  constructor(targetEl, targetElInfo) {
    this.bridge(targetEl, targetElInfo);
  }

  bridge(targetEl, targetElInfo) {
    new Window(targetEl, targetElInfo);
  }
}

class CreateMethods {
  static createFolderBase(imgSrc, title) {
    const templateFolder = document.querySelector('#template-folder').content.cloneNode(true);
    const iconWrapper = templateFolder.querySelector('.icon-wrapper');
    const icon = templateFolder.querySelector('.desktop-icon');
    icon.children[0].classList.add(imgSrc);
    icon.children[1].innerText = title;
    return iconWrapper;
  }
}
