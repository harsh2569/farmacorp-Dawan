class CartDrawerRemove extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', (event) => {
      event.preventDefault();
      this.closest('cart-notification').updateQuantity(this.dataset.index, 0);
    });
  }
}

customElements.define('cart-drawer-remove-button', CartDrawerRemove)

class CartNotification extends HTMLElement {
  constructor() {
    super();

    this.notificationWrapper = document.getElementById('cart-notification-wrapper');
    this.notification = document.getElementById('cart-notification');
    this.header = document.querySelector('sticky-header');
    this.cartBubble = document.getElementById('cart-icon-bubble');
    this.onBodyClick = this.handleBodyClick.bind(this);
    
    this.notification.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelectorAll('.cart-notification__close').forEach((closeButton) =>
      closeButton.addEventListener('click', this.close.bind(this))
    );

    this.cartBubble.addEventListener('click', function(e){
      e.preventDefault();
      document.querySelector('cart-notification').open();
    });

    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);

    this.addEventListener('change', this.debouncedOnChange.bind(this));
  }

  onChange(event) {
    this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
  }

  open() {
    this.notification.classList.add('animate', 'active');
    this.notificationWrapper.classList.add('active');

    this.notification.addEventListener('transitionend', () => {
      this.notification.focus();
      trapFocus(this.notification);
    }, { once: true });

    // document.body.addEventListener('click', this.onBodyClick);
  }

  close() {
    this.notification.classList.remove('active');
    this.notificationWrapper.classList.remove('active');

    document.body.removeEventListener('click', this.onBodyClick);

    removeTrapFocus(this.activeElement);
  }

  renderContents(parsedState) {
      this.productId = parsedState.id;
      this.getSectionsToRender().forEach((section => {
        document.getElementById(section.id).innerHTML =
          this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
      }));

      if (this.header) this.header.reveal();
      this.open();
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-notification-product',
        // selector: `#cart-notification-product-${this.productId}`,
      },
      {
        id: 'cart-notification-header'
      },
      {
        id: 'cart-icon-bubble'
      },
      {
        id: 'cart-notification-subtotal'
      }
    ];
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  updateQuantity(line, quantity, name) {
    document.getElementById('cart-notification').classList.add('cart-loading');

    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.id),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_change_url}`, {...fetchConfig(), ...{ body }})
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        this.classList.toggle('is-empty', parsedState.item_count === 0);
        // const cartFooter = document.getElementById('main-cart-footer');

        // if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);

          elementToReplace.innerHTML =
            this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
        }));

        // this.updateLiveRegions(line, parsedState.item_count);
        // const lineItem =  document.getElementById(`CartItem-${line}`);
        // if (lineItem && lineItem.querySelector(`[name="${name}"]`)) lineItem.querySelector(`[name="${name}"]`).focus();
        document.getElementById('cart-notification').classList.remove('cart-loading');
      }).catch(() => {
        // this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        // document.getElementById('cart-errors').textContent = window.cartStrings.error;
        document.getElementById('cart-notification').classList.remove('cart-loading');
      });
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if (target !== this.notification && !target.closest('cart-notification')) {
      const disclosure = target.closest('details-disclosure');
      this.activeElement = disclosure ? disclosure.querySelector('summary') : null;
      this.close();
    }
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-notification', CartNotification);
