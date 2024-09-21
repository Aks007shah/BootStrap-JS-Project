// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
const CONVIENCE_FEE = 99;
let bagItemObjects;
onLoad()

function onLoad() {
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary() {
    let bagSummaryElement = document.querySelector(".bag-summary");

    let totalItems = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
    // let finalPayment = 0;

    //to calculate MRP
    bagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.original_price

        totalDiscount += bagItem.original_price - bagItem.current_price
    });

   let finalPayment = totalMRP - totalDiscount;

   //only add convience fee if there will be items in bag
   if (totalItems > 0) {
    finalPayment += CONVIENCE_FEE;
}

    bagSummaryElement.innerHTML = `<div class="bag-details-container shadow p-3">
    <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs ${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag text-danger">Discount on MRP</span>
      <span class="price-item-value text-danger priceDetail-base-discount">-Rs ${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs 99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs ${finalPayment}</span>
    </div>
  </div>
  <button class="btn-place-order box-shadow">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
  `;
}

function loadBagItemObjects() {
    bagItemObjects = bagItems.map(itemId => {
        for (let i = 0; i < itemsAutumn.length; i++) {
            if (itemId == itemsAutumn[i].id) {
                return itemsAutumn[i];
            }
        }
    })

}

function displayBagItems() {
    let containerElement = document.querySelector('.bag-items-container');

    let innerHTML = '';

    bagItemObjects.forEach(bagItem => {
        innerHTML += generateItemHTML(bagItem);
    });

    containerElement.innerHTML = innerHTML; // Corrected this line
}


function removeFromBag(itemId) {
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId);

    localStorage.setItem('bagItems', JSON.stringify(bagItems))

    loadBagItemObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}

function generateItemHTML(item) {

    return `<div class="bag-item-container box-shadow">
    <div class="card mb-3">
        <div class="row g-0 border">
          <div class="col-md-4">
            <img id="bag-item-img" src="../${item.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body text-center">
              <h5 class="card-title text-danger price-item fs-3" id="company" >${item.company}</h5>
              <p class="card-text fs-6" id="item_name">${item.item_name}</p>
              
              <div class="price p-3">
                <span class="original_price fw-500 text-decoration-line-through">Rs ${item.original_price}</span>
                <span class="current_price fw-bold">Rs ${item.current_price}</span>
                <span class="discount_percentage text-danger">(${item.discount_percentage}% Off)</span>
              </div>
            </p>
    
            <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
            </div>
            <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
            </div>
            <button class="btn btn-outline-danger" id="removeButton" onclick="removeFromBag(${item.id})">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>`
}