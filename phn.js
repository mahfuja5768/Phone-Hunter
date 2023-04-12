const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones , dataLimit) =>{
    const phnesContainer = document.getElementById('phnes-conatiner');
    phnesContainer.innerHTML= '';
    const showAllBtn = document.getElementById('show-all-btn');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAllBtn.classList.remove('d-none')
    }
    else{
        showAllBtn.classList.add('d-none')
    };
    const noFoundMassage = document.getElementById('no-found-massage');
    if(phones.length === 0){
        noFoundMassage.classList.remove('d-none')
    }
    else{
        noFoundMassage.classList.add('d-none')
    }
    phones.forEach(phone =>{
        // console.log(phone);
        const phnDiv = document.createElement('div');
        phnDiv.classList.add('col');
        phnDiv.innerHTML = `
                      <div class="card">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Name: ${phone.phone_name}</h5>
                          <p class="brand">Brand: ${phone.brand}</p>
                          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" id="detail-btn" type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button> 
                        </div>
                      </div>
    `;
    phnesContainer.appendChild(phnDiv)
    });
    loadSpinner(false)
}
const loadSpinner = isLodding =>{
    const loderSection = document.getElementById('spinner');
    if(isLodding){
        loderSection.classList.remove('d-none')
    }
    else{
        loderSection.classList.add('d-none')
    }
}

const searchField = document.getElementById('search-field');
const searchProcess = (dataLimit) =>{
    loadSpinner(true);
    const searchFieldText = searchField.value;
    loadPhones(searchFieldText, dataLimit);
};

document.getElementById('search-btn').addEventListener('click', function(){
    searchProcess(10);
});

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchProcess(10)
    }
});

document.getElementById('show-all-btn').addEventListener('click', function(){
    searchProcess();
    searchField.value = ''
})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
    
}
const displayPhoneDetails = (details) =>{
    console.log(details);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = details.name;
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML = `
    <h5>Memory: ${details.mainFeatures.memory}</h5>
    <h5>Release Date: ${details.releaseDate ? details.releaseDate : 'No release date available !'}</h5>
    `
  
}

loadPhones('phone')



